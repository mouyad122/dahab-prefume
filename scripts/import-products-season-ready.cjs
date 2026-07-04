const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

const CATEGORY_OPTIONS = [
  { slug: 'men', name_ar: 'رجالي', name_en: 'Men' },
  { slug: 'women', name_ar: 'نسائي', name_en: 'Women' },
  { slug: 'oud', name_ar: 'عود', name_en: 'Oud' },
];

const SEASON_OPTIONS = [
  { slug: 'summer', name_ar: 'صيفي', name_en: 'Summer' },
  { slug: 'winter', name_ar: 'شتوي', name_en: 'Winter' },
  { slug: 'both', name_ar: 'كلا الفصلين', name_en: 'Both seasons' },
];

const CATEGORY_LOOKUP = new Map([
  ...CATEGORY_OPTIONS.map((option) => [option.slug, option]),
  ...CATEGORY_OPTIONS.map((option) => [option.name_ar, option]),
]);

const SEASON_LOOKUP = new Map([
  ...SEASON_OPTIONS.map((option) => [option.slug, option]),
  ...SEASON_OPTIONS.map((option) => [option.name_ar, option]),
]);

function key(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeCategory(value) {
  return CATEGORY_LOOKUP.get(key(value)) || null;
}

function normalizeSeason(value) {
  return SEASON_LOOKUP.get(key(value)) || null;
}

function firstValue(row, keys, fallback = '') {
  for (const k of keys) {
    const value = row[k];
    if (value !== undefined && value !== null && String(value).trim() !== '') return value;
  }
  return fallback;
}

function isYes(value) {
  return ['نعم', 'yes', 'true', '1'].includes(key(value));
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

function resolveImagePath(imageName, publicImagesDir, sourceImagesPath) {
  if (!imageName || imageName === 'missing') return null;
  const candidates = [
    path.join(publicImagesDir, imageName),
    path.join(process.cwd(), 'public', 'uploads', 'products', imageName),
    path.join(process.cwd(), 'products', imageName),
    sourceImagesPath ? path.join(sourceImagesPath, imageName) : null,
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function addSku(list, sku, reason) {
  list.push(reason ? { sku, reason } : sku);
}

async function ensureRequiredCategories(isDryRun) {
  const existing = await prisma.category.findMany();
  const map = new Map(existing.map((category) => [category.slug, category]));

  for (let i = 0; i < CATEGORY_OPTIONS.length; i++) {
    const option = CATEGORY_OPTIONS[i];
    if (!map.has(option.slug) && !isDryRun) {
      const created = await prisma.category.create({
        data: {
          slug: option.slug,
          name_ar: option.name_ar,
          name_en: option.name_en,
          is_active: true,
          display_order: i + 1,
        },
      });
      map.set(option.slug, created);
    }
  }

  return map;
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const imagesArg = args.find((arg) => arg.startsWith('--images='));
  const sourceImagesPath = imagesArg ? imagesArg.split('=').slice(1).join('=') : null;
  const excelPath = path.join(process.cwd(), 'import', 'dahab_perfumes_import_template_season_ready.xlsx');

  if (!fs.existsSync(excelPath)) throw new Error(`Excel file not found at ${excelPath}`);

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

  const price50 = Number(globalPricing?.price_50ml_fils || 0);
  const price100 = Number(globalPricing?.price_100ml_fils || 0);
  const price200 = Number(globalPricing?.price_200ml_fils || 0);
  const hasGlobalPrices = price50 > 0 && price100 > 0 && price200 > 0;
  if (!hasGlobalPrices) {
    throw new Error('Global prices are missing. Configure 50ml, 100ml, and 200ml prices first.');
  }

  const categoryMap = await ensureRequiredCategories(isDryRun);
  const existingProducts = await prisma.product.findMany({ select: { id: true, sku: true } });
  const existingSkuMap = new Map(existingProducts.map((product) => [product.sku, product]));

  const report = {
    totalRows: rows.length,
    importedProducts: 0,
    updatedProducts: 0,
    skippedRows: 0,
    visibleProducts: 0,
    hiddenProducts: 0,
    missingImages: [],
    missingCategory: [],
    invalidCategory: [],
    missingSeason: [],
    invalidSeason: [],
    invalidRows: [],
    createdCategories: [],
    productsReadyForStorefront: 0,
    productsNotReadyForStorefront: 0,
    createdVariants: 0,
    createdAccords: 0,
    databaseCounts: {},
  };

  const validation = {
    category: { valid: 0, missing: 0, invalid: 0 },
    season: { valid: 0, missing: 0, invalid: 0 },
  };

  async function processRow(row) {
    const sku = String(firstValue(row, ['SKU'], '')).trim();
    if (!sku) {
      report.skippedRows++;
      return;
    }

    try {
      const name_ar = String(firstValue(row, ['اسم العطر'], '')).trim();
      if (!name_ar) {
        addSku(report.invalidRows, sku, 'missing name');
        report.hiddenProducts++;
        report.productsNotReadyForStorefront++;
        return;
      }

      const categoryRaw = firstValue(row, ['category_slug', 'تصنيف المتجر', 'التصنيف الرئيسي'], '');
      const seasonRaw = firstValue(row, ['season_slug', 'فصل العطر', 'الموسم'], '');
      const category = normalizeCategory(categoryRaw);
      const season = normalizeSeason(seasonRaw);

      if (!String(categoryRaw || '').trim()) {
        validation.category.missing++;
        addSku(report.missingCategory, sku);
      } else if (!category) {
        validation.category.invalid++;
        addSku(report.invalidCategory, sku, String(categoryRaw));
      } else {
        validation.category.valid++;
      }

      if (!String(seasonRaw || '').trim()) {
        validation.season.missing++;
        addSku(report.missingSeason, sku);
      } else if (!season) {
        validation.season.invalid++;
        addSku(report.invalidSeason, sku, String(seasonRaw));
      } else {
        validation.season.valid++;
      }

      let imageName = normalizeImageName(firstValue(row, ['اسم الصورة'], ''));
      const resolvedImagePath = resolveImagePath(imageName, publicImagesDir, sourceImagesPath);
      let image_url = null;
      let has_image = false;

      if (resolvedImagePath) {
        const publicImagePath = path.join(publicImagesDir, imageName);
        if (!isDryRun && resolvedImagePath !== publicImagePath && !fs.existsSync(publicImagePath)) {
          fs.copyFileSync(resolvedImagePath, publicImagePath);
        }
        image_url = `/products/${imageName}`;
        has_image = true;
      }

      if (!has_image) {
        addSku(report.missingImages, sku);
        imageName = imageName || 'missing';
      }

      const requestedVisible = isYes(firstValue(row, ['ظاهر بالموقع؟'], ''));
      const requestedReady = isYes(firstValue(row, ['جاهز للظهور؟'], ''));
      const isPublic = Boolean(category && season && hasGlobalPrices && has_image && requestedVisible && requestedReady);

      if (isPublic) {
        report.visibleProducts++;
        report.productsReadyForStorefront++;
      } else {
        report.hiddenProducts++;
        report.productsNotReadyForStorefront++;
      }

      const categoryRecord = category ? categoryMap.get(category.slug) : null;
      const totalStock = parseInt(firstValue(row, ['المخزون الكلي'], 0), 10) || 0;
      const lowStockThreshold = parseInt(firstValue(row, ['حد تنبيه المخزون'], 5), 10) || 5;
      const fragrance_family = String(firstValue(row, ['العائلة العطرية'], '')).trim();

      const productData = {
        name_ar,
        inspired_by: String(firstValue(row, ['Inspired By'], '')).trim() || null,
        main_category: category?.name_ar || null,
        categoryId: categoryRecord?.id || null,
        category_slug: category?.slug || null,
        gender: String(firstValue(row, ['الجنس'], 'unisex')).trim() || 'unisex',
        season: season?.name_ar || '',
        season_slug: season?.slug || null,
        fragrance_family,
        keywords: String(firstValue(row, ['الكلمات المفتاحية'], '')).trim(),
        short_description: String(firstValue(row, ['وصف قصير'], '')).trim(),
        notes: String(firstValue(row, ['ملاحظات'], '')).trim() || null,
        image_name: imageName,
        image_url,
        has_image,
        visible: isPublic,
        ready_for_storefront: isPublic,
        featured: isYes(firstValue(row, ['مميز بالواجهة؟'], '')),
        low_stock_threshold: lowStockThreshold,
        needs_image: !has_image,
      };

      const existingProduct = existingSkuMap.get(sku);
      if (isDryRun) {
        if (existingProduct) report.updatedProducts++;
        else report.importedProducts++;
        return;
      }

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
    } catch (error) {
      console.error(`[Error] Failed on SKU ${sku}:`, error.message);
      addSku(report.invalidRows, sku, error.message);
    }
  }

  const batchSize = 10;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    await Promise.all(batch.map((row) => processRow(row)));
  }

  if (!isDryRun) {
    report.databaseCounts = {
      products: await prisma.product.count(),
      categories: await prisma.category.count({ where: { slug: { in: CATEGORY_OPTIONS.map((c) => c.slug) } } }),
      variants: await prisma.productVariant.count(),
      accords: await prisma.productAccord.count(),
      visibleStorefrontProducts: await prisma.product.count({
        where: {
          visible: true,
          ready_for_storefront: true,
          category_slug: { in: CATEGORY_OPTIONS.map((c) => c.slug) },
          season_slug: { in: SEASON_OPTIONS.map((s) => s.slug) },
        },
      }),
      missingImageProducts: await prisma.product.count({ where: { has_image: false } }),
      categoryBreakdown: await prisma.category.findMany({
        where: { slug: { in: CATEGORY_OPTIONS.map((c) => c.slug) } },
        select: {
          slug: true,
          name_ar: true,
          _count: { select: { products: true } },
        },
        orderBy: { display_order: 'asc' },
      }),
    };
  }

  fs.writeFileSync(path.join(process.cwd(), 'import-report.json'), JSON.stringify(report, null, 2));

  console.log('Category validation:');
  console.log(`valid: ${validation.category.valid}`);
  console.log(`missing: ${validation.category.missing}`);
  console.log(`invalid: ${validation.category.invalid}`);
  console.log('');
  console.log('Season validation:');
  console.log(`valid: ${validation.season.valid}`);
  console.log(`missing: ${validation.season.missing}`);
  console.log(`invalid: ${validation.season.invalid}`);
  console.log('');
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
