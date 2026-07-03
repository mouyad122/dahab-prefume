import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/session';

// ─── GET /api/categories/[id] — Public ──────────────────────────────────────
// Returns category with its visible products.
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { visible_on_website: true },
          orderBy: { name_ar: 'asc' },
          select: {
            id: true,
            sku: true,
            slug: true,
            name_ar: true,
            name_en: true,
            image_filename: true,
            gender: true,
            featured_on_frontend: true,
            variants: {
              select: {
                id: true,
                volume: true,
                price: true,
                stock: true
              }
            },
            discounts: {
              where: {
                is_active: true,
                OR: [
                  { starts_at: null },
                  { starts_at: { lte: new Date() } },
                ],
                AND: [
                  {
                    OR: [
                      { ends_at: null },
                      { ends_at: { gte: new Date() } },
                    ],
                  },
                ],
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!category) {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }

    return Response.json({ category }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/categories/[id]]', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── PUT /api/categories/[id] — Admin only ──────────────────────────────────
// Update any fields of a category.
export async function PUT(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify category exists ────────────────────────────────────────────────
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      slug,
      name_ar,
      name_en,
      description_ar,
      description_en,
      image,
      display_order,
      is_active,
    } = body;

    // ── Build update data (only provided fields) ──────────────────────────────
    const data = {};

    if (slug !== undefined) {
      const normalizedSlug = String(slug).trim().toLowerCase().replace(/\s+/g, '-');
      if (normalizedSlug === '') {
        return Response.json({ error: 'slug cannot be empty' }, { status: 400 });
      }
      // Check uniqueness (exclude current record)
      const slugConflict = await prisma.category.findFirst({
        where: { slug: normalizedSlug, NOT: { id } },
      });
      if (slugConflict) {
        return Response.json(
          { error: `A category with slug "${normalizedSlug}" already exists` },
          { status: 409 },
        );
      }
      data.slug = normalizedSlug;
    }

    if (name_ar !== undefined) {
      if (typeof name_ar !== 'string' || name_ar.trim() === '') {
        return Response.json({ error: 'name_ar cannot be empty' }, { status: 400 });
      }
      data.name_ar = name_ar.trim();
    }

    if (name_en !== undefined) {
      if (typeof name_en !== 'string' || name_en.trim() === '') {
        return Response.json({ error: 'name_en cannot be empty' }, { status: 400 });
      }
      data.name_en = name_en.trim();
    }

    if (description_ar !== undefined) data.description_ar = description_ar ? String(description_ar).trim() : null;
    if (description_en !== undefined) data.description_en = description_en ? String(description_en).trim() : null;
    if (image !== undefined) data.image = image ? String(image).trim() : null;

    if (display_order !== undefined) {
      const parsedOrder = parseInt(display_order, 10);
      if (!Number.isFinite(parsedOrder)) {
        return Response.json({ error: 'display_order must be an integer' }, { status: 400 });
      }
      data.display_order = parsedOrder;
    }

    if (is_active !== undefined) {
      if (typeof is_active !== 'boolean') {
        return Response.json({ error: 'is_active must be a boolean' }, { status: 400 });
      }
      data.is_active = is_active;
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: 'No fields provided to update' }, { status: 400 });
    }

    // ── Update ────────────────────────────────────────────────────────────────
    const updated = await prisma.category.update({ where: { id }, data });

    return Response.json({ category: updated }, { status: 200 });
  } catch (error) {
    console.error('[PUT /api/categories/[id]]', error);
    if (error.code === 'P2002') {
      return Response.json({ error: 'Slug already in use' }, { status: 409 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── DELETE /api/categories/[id] — Admin only ───────────────────────────────
// Body: { deleteProducts: boolean }
// deleteProducts=true  → hard-delete all products, then category
// deleteProducts=false → unlink products (set categoryId=null), then delete category
export async function DELETE(request, { params }) {
  try {
    // ── Auth ─────────────────────────────────────────────────────────────────
    const session = await verifyAdminSession();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // ── Verify category exists ────────────────────────────────────────────────
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }

    // ── Parse body ───────────────────────────────────────────────────────────
    let deleteProducts = false;
    try {
      const body = await request.json();
      if (typeof body.deleteProducts === 'boolean') {
        deleteProducts = body.deleteProducts;
      }
    } catch {
      // Body is optional; default to unlinking
    }

    // ── Transactional delete ──────────────────────────────────────────────────
    await prisma.$transaction(async (tx) => {
      if (deleteProducts) {
        // Hard-delete all products in category (cascades accords, tags, discounts, sale_items)
        await tx.product.deleteMany({ where: { categoryId: id } });
      } else {
        // Unlink products — set categoryId to null
        await tx.product.updateMany({
          where: { categoryId: id },
          data: { categoryId: null },
        });
      }

      // Delete the category
      await tx.category.delete({ where: { id } });
    });

    return Response.json(
      { message: 'Category deleted successfully', deleteProducts },
      { status: 200 },
    );
  } catch (error) {
    console.error('[DELETE /api/categories/[id]]', error);
    if (error.code === 'P2025') {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
