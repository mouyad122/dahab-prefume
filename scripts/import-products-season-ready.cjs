const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

function firstValue(row, keys, fallback = '') {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return value;
    }
  }
  return fallback;
}

function isYes(value) {
  return ['نعم', 'yes', 'true', '1'].includes(String(value || '').trim().toLowerCase());
}

function slugify(value, fallback) {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || fallback;
}

function normalizeImageName(value) {
  const raw = String(value || '').trim().replace(/\\/g, '/').replace(/^\/+/, '');
  if (!raw || raw === 'missing') return raw;
  if (raw.startsWith('products/')) return raw.slice('products/'.length);
  if (raw.startsWith('uploads/products/')) return raw.slice('uploads/products/'.length);
  return path.basename(raw);
}

function resolveImagePath(imageName, publicImagesDir) {
  if (!imageName || imageName === 'missing') return null;

  const candidates = [
    path.join(publicImagesDir, imageName),
    path.join(process.cwd(), 'public', 'uploads', 'products', imageName),
    path.join(process.cwd(), 'products', imageName),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isForceVisible = args.includes('--force-visible');
  const shouldPruneCategories = args.includes('--prune-categories');
  const imagesArg = args.find((arg) => arg.startsWith('--images='));
  const sourceImagesPath = imagesArg ? imagesArg.split('=').slice(1).join('=') : null;

  const excelPath = path.join(process.cwd(), 'import', 'dahab_perfumes_import_template_season_ready.xlsx');
  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found at ${excelPath}`);
  }

  const workbook = xlsx.readFile(excelPath);
  if (!workbook.SheetNames.includes('Products')) {
    throw new Error(`Products sheet not found. Available sheets: ${workbook.SheetNames.join(', ')}`);
  }

  const rows = xlsx.utils.sheet_to_json(workbook.Sheets.Products, { defval: '' });
  const publicImagesDir = path.join(process.cwd(), 'public', 'products');
  fs.mkdirSync(publicImagesDir, { recursive: true });

  const globalPricing = await prisma.globalPricingSettings.findFirst({
    where: { active: true },
    orderBy: { created_at: 'desc' },
  });

  const price50 = globalPricing?.price_50ml_fils;
  const price100 = globalPricing?.price_100ml_fils;
  const price200 = globalPricing?.price_200ml_fils;
  if (!price50 || !price100 || !price200) {
    throw new Error('Global prices are missing. Configure 50ml, 100ml, and 200ml prices first.');
  }

  const report = {
    totalRows: rows.length,
    importedProducts: 0,
    updatedProducts: 0,
    skippedRows: 0,
    createdCategories: [],
    prunedCategories: [],
    missingImages: [],
    invalidRows: [],
    visibleProducts: 0,
    hiddenProducts: 0,
    createdVariants: 0,
    createdAccords: 0,
    databaseCounts: {},
  };

  const categories = await prisma.category.findMany();
  const categorySlugMap = new Map(categories.map((category) => [category.slug, category.id]));
  const existingProducts = await prisma.product.findMany({ select: { id: true, sku: true, slug: true } });
  const existingSkuMap = new Map(existingProducts.map((product) => [product.sku, product]));
  const excelCategorySlugs = new Set();

  for (const row of rows) {
    const sku = String(firstValue(row, ['SKU'], '')).trim();
    if (!sku) {
      report.skippedRows++;
      continue;
    }

    try {
      const name_ar = String(firstValue(row, ['اسم العطر'], 'عطر مجهول')).trim();
      const inspired_by = String(firstValue(row, ['Inspired By'], '')).trim() || null;
      const main_category = String(firstValue(row, ['تصنيف المتجر', 'التصنيف الرئيسي'], 'عطور')).trim();
      const categorySlug = String(firstValue(row, ['category_slug'], 'perfumes')).trim().toLowerCase();
      const categoryName = main_category || categorySlug;
      const gender = String(firstValue(row, ['الجنس'], 'unisex')).trim();
      const season = String(firstValue(row, ['فصل العطر', 'الموسم'], 'all')).trim();
      const season_slug = String(firstValue(row, ['season_slug'], 'both')).trim();
      const fragrance_family = String(firstValue(row, ['العائلة العطرية'], '')).trim();
      const keywords = String(firstValue(row, ['الكلمات المفتاحية'], '')).trim();
      const short_description = String(firstValue(row, ['وصف قصير'], '')).trim();
      const notes = String(firstValue(row, ['ملاحظات'], '')).trim() || null;
      const isFeatured = isYes(firstValue(row, ['مميز بالواجهة؟'], ''));
      const totalStock = parseInt(firstValue(row, ['المخزون الكلي'], 0), 10) || 0;
      const lowStockThreshold = parseInt(firstValue(row, ['حد تنبيه المخزون'], 5), 10) || 5;

      excelCategorySlugs.add(categorySlug);

      let categoryId = categorySlugMap.get(categorySlug);
      if (!categoryId && !isDryRun) {
        const created = await prisma.category.create({
          data: {
            slug: categorySlug,
            name_ar: categoryName,
            name_en: categorySlug,
            is_active: true,
            display_order: categorySlugMap.size + 1,
          },
        });
        categoryId = created.id;
        categorySlugMap.set(categorySlug, categoryId);
        report.createdCategories.push(categorySlug);
      }

      let imageName = normalizeImageName(firstValue(row, ['اسم الصورة'], ''));
      let image_url = null;
      let has_image = false;
      const resolvedImagePath = resolveImagePath(imageName, publicImagesDir);

      if (resolvedImagePath) {
        const publicImagePath = path.join(publicImagesDir, imageName);
        if (!isDryRun && resolvedImagePath !== publicImagePath && !fs.existsSync(publicImagePath)) {
          fs.copyFileSync(resolvedImagePath, publicImagePath);
        }
        image_url = `/products/${imageName}`;
        has_image = true;
      } else if (sourceImagesPath && imageName && imageName !== 'missing') {
        const sourceImagePath = path.join(sourceImagesPath, imageName);
        const publicImagePath = path.join(publicImagesDir, imageName);
        if (fs.existsSync(sourceImagePath)) {
          if (!isDryRun) fs.copyFileSync(sourceImagePath, publicImagePath);
          image_url = `/products/${imageName}`;
          has_image = true;
        }
      }

      if (!has_image) {
        report.missingImages.push(sku);
        imageName = imageName || 'missing';
      }

      const requestedVisible = isYes(firstValue(row, ['ظاهر بالموقع؟'], ''));
      const requestedReady = isYes(firstValue(row, ['جاهز للظهور؟'], ''));
      const isVisible = isForceVisible ? true : requestedVisible && has_image;
      const readyForStorefront = isForceVisible ? true : requestedReady && has_image;

      if (isVisible) report.visibleProducts++;
      else report.hiddenProducts++;

      const productData = {
        name_ar,
        inspired_by,
        main_category,
        categoryId,
        category_slug: categorySlug,
        gender,
        season,
        season_slug,
        fragrance_family,
        keywords,
        short_description,
        notes,
        image_name: imageName,
        image_url,
        has_image,
        visible: isVisible,
        ready_for_storefront: readyForStorefront,
        featured: isFeatured,
        low_stock_threshold: lowStockThreshold,
        needs_image: !has_image,
      };

      const existingProduct = existingSkuMap.get(sku);
      if (isDryRun) {
        if (existingProduct) report.updatedProducts++;
        else report.importedProducts++;
      } else {
        let productId;
        if (existingProduct) {
          await prisma.product.update({ where: { sku }, data: productData });
          productId = existingProduct.id;
          report.updatedProducts++;
        } else {
          const product = await prisma.product.create({
            data: {
              ...productData,
              sku,
              slug: `${slugify(name_ar, sku.toLowerCase())}-${sku.toLowerCase()}-${crypto.randomBytes(3).toString('hex')}`,
            },
          });
          productId = product.id;
          report.importedProducts++;
        }

        await prisma.$transaction([
          prisma.productVariant.deleteMany({ where: { productId } }),
          prisma.productAccord.deleteMany({ where: { productId } }),
          prisma.productFamilyTag.deleteMany({ where: { productId } }),
        ]);

        const accordsData = [];
        const defaultStrengths = [100, 85, 70, 55, 40];
        for (let i = 1; i <= 5; i++) {
          const accordName = String(firstValue(row, [`البصمة العطرية ${i}`], '')).trim();
          if (!accordName) continue;

          const parsedStrength = parseInt(firstValue(row, [`قوة البصمة ${i}`], ''), 10);
          accordsData.push({
            productId,
            position: accordsData.length + 1,
            name_ar: accordName,
            strength: Number.isFinite(parsedStrength) && parsedStrength > 0 ? parsedStrength : defaultStrengths[i - 1],
          });
        }

        const variantsData = [
          { productId, volume: '50ml', price: price50, stock: totalStock },
          { productId, volume: '100ml', price: price100, stock: totalStock },
          { productId, volume: '200ml', price: price200, stock: totalStock },
        ];

        report.createdAccords += accordsData.length;
        report.createdVariants += variantsData.length;

        await prisma.$transaction([
          prisma.productVariant.createMany({ data: variantsData, skipDuplicates: true }),
          prisma.productAccord.createMany({ data: accordsData, skipDuplicates: true }),
        ]);
      }
    } catch (error) {
      console.error(`[Error] Failed on SKU ${sku}:`, error.message);
      report.invalidRows.push(sku);
    }
  }

  if (shouldPruneCategories && !isDryRun) {
    const extras = await prisma.category.findMany({
      where: { slug: { notIn: [...excelCategorySlugs] } },
      select: { id: true, slug: true },
    });

    for (const category of extras) {
      const productCount = await prisma.product.count({ where: { categoryId: category.id } });
      if (productCount === 0) {
        await prisma.category.delete({ where: { id: category.id } });
        report.prunedCategories.push(category.slug);
      }
    }
  }

  if (!isDryRun) {
    report.databaseCounts = {
      products: await prisma.product.count(),
      categories: await prisma.category.count(),
      variants: await prisma.productVariant.count(),
      accords: await prisma.productAccord.count(),
      visibleStorefrontProducts: await prisma.product.count({ where: { visible: true } }),
      missingImageProducts: await prisma.product.count({ where: { has_image: false } }),
    };
  }

  fs.writeFileSync(path.join(process.cwd(), 'import-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main()
  .then(() => {
    console.log('DONE');
    process.exit(0);
  })
  .catch((error) => {
    console.error('IMPORT FAILED:');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
