const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function backfill() {
  console.log('--- STARTING BACKFILL ---');
  try {
    const products = await prisma.product.findMany();
    for (const p of products) {
      await prisma.product.update({
        where: { id: p.id },
        data: {
          visible: p.visible_on_website,
          featured: p.featured_on_frontend,
          fragrance_family: p.fragrance_family_raw,
          keywords: p.keywords_ar,
          short_description: p.short_description_ar,
          image_name: p.image_filename,
          // category_slug, season, season_slug are left null/default since we don't have old mappings
          // has_image, image_url, ready_for_storefront will be updated by the import script
        }
      });
    }
    console.log('Backfill complete.');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
backfill();
