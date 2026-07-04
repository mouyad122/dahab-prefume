const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('--- DAHAB PERFUMES PRODUCT IMPORT ---');
  console.log(`Working directory: ${process.cwd()}`);

  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isForceVisible = args.includes('--force-visible');

  // Extract --images argument
  const imagesArg = args.find(a => a.startsWith('--images='));
  const sourceImagesPath = imagesArg ? imagesArg.split('=')[1] : null;

  if (isDryRun) console.log('Mode: DRY-RUN (No database writes will occur)');
  if (isForceVisible) console.log('Mode: FORCE-VISIBLE');

  const excelPath = path.join(process.cwd(), 'import', 'dahab_perfumes_import_template_season_ready.xlsx');
  console.log(`Excel path: ${excelPath}`);

  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found at ${excelPath}`);
  }
  console.log('Excel exists: YES');

  const wb = xlsx.readFile(excelPath);
  if (!wb.SheetNames.includes('Products')) {
    throw new Error(`Products sheet not found. Available sheets: ${wb.SheetNames.join(', ')}`);
  }
  console.log('Sheet found: Products');

  const data = xlsx.utils.sheet_to_json(wb.Sheets['Products'], { defval: '' });
  console.log(`Rows detected: ${data.length}`);

  const publicImagesDir = path.join(process.cwd(), 'public', 'products');
  console.log(`Images directory: ${publicImagesDir}`);

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  let imagesFound = fs.readdirSync(publicImagesDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')).length;
  console.log(`Images found: ${imagesFound}`);

  console.log('Database connection: OK');

  const globalPricing = await prisma.globalPricingSettings.findFirst({
    where: { active: true },
    orderBy: { created_at: 'desc' }
  });

  const price50 = globalPricing?.price_50ml_fils;
  const price100 = globalPricing?.price_100ml_fils;
  const price200 = globalPricing?.price_200ml_fils;

  console.log('Global prices:');
  console.log(`50ml: ${(price50 || 0) / 1000} JOD`);
  console.log(`100ml: ${(price100 || 0) / 1000} JOD`);
  console.log(`200ml: ${(price200 || 0) / 1000} JOD`);

  if (!price50 || price50 <= 0 || !price100 || price100 <= 0 || !price200 || price200 <= 0) {
    throw new Error('IMPORT FAILED:\nGlobal prices are missing or invalid.\nPlease configure 50ml, 100ml, and 200ml prices in Admin Settings before importing.');
  }

  const report = {
    totalRows: data.length,
    importedProducts: 0,
    updatedProducts: 0,
    skippedRows: 0,
    createdCategories: [],
    updatedCategories: [],
    missingImages: [],
    invalidRows: [],
    hiddenBecauseMissingImage: [],
    hiddenBecauseVisibilityNo: [],
    visibleProducts: 0,
    hiddenProducts: 0,
    createdVariants: 0,
    createdAccords: 0,
    globalPrices: {
      "50ml": price50,
      "100ml": price100,
      "200ml": price200
    },
    databaseCounts: {}
  };

  const existingCategories = await prisma.category.findMany();
  const categorySlugMap = new Map(existingCategories.map(c => [c.slug, c.id]));

  const existingProducts = await prisma.product.findMany({ select: { id: true, sku: true } });
  const existingSkuMap = new Map(existingProducts.map(p => [p.sku, p.id]));

  for (const row of data) {
    const sku = row['SKU']?.toString().trim();
    if (!sku) {
      report.skippedRows++;
      continue;
    }

    try {
      const name_ar = row['اسم العطر']?.toString().trim() || 'عطر مجهول';
      if (name_ar === 'عطر مجهول') report.invalidRows.push(sku);

      const inspired_by = row['Inspired By']?.toString().trim() || null;
      const gender = row['الجنس']?.toString().trim() || 'unisex';
      const seasonRaw = row['الموسم']?.toString().trim() || 'all'; // Legacy
      const seasonAr = row['فصل العطر']?.toString().trim() || seasonRaw;
      const season_slug = row['season_slug']?.toString().trim() || 'both';
      const fragrance_family = row['العائلة العطرية']?.toString().trim() || '';
      const keywords = row['الكلمات المفتاحية']?.toString().trim() || '';
      const short_description = row['وصف قصير']?.toString().trim() || '';
      const isFeatured = row['مميز بالواجهة؟'] === 'نعم';
      
      const totalStock = parseInt(row['المخزون الكلي']) || 0;
      const lowStockThreshold = parseInt(row['حد تنبيه المخزون']) || 5;

      const categoryName = row['تصنيف المتجر']?.toString().trim() || 'عطور';
      const categorySlug = row['category_slug']?.toString().trim() || 'perfumes';

      let categoryId = categorySlugMap.get(categorySlug);
      if (!categoryId) {
        if (!isDryRun) {
          const newCat = await prisma.category.create({
            data: {
              slug: categorySlug,
              name_ar: categoryName,
              name_en: categoryName,
              is_active: true
            }
          });
          categoryId = newCat.id;
          categorySlugMap.set(categorySlug, categoryId);
          report.createdCategories.push(categorySlug);
        } else {
          categoryId = 'mock-cat-id';
          if (!report.createdCategories.includes(categorySlug)) {
            report.createdCategories.push(categorySlug);
          }
        }
      }

      let readyForStorefront = row['جاهز للظهور؟'] === 'نعم';
      let isVisible = row['ظاهر بالموقع؟'] === 'نعم';
      
      const imageName = row['اسم الصورة']?.toString().trim();
      let image_url = null;
      let has_image = false;

      if (imageName) {
        const publicImgPath = path.join(publicImagesDir, imageName);
        
        if (fs.existsSync(publicImgPath)) {
          image_url = `/products/${imageName}`;
          has_image = true;
        } else if (sourceImagesPath) {
          const sourceImgPath = path.join(sourceImagesPath, imageName);
          if (fs.existsSync(sourceImgPath)) {
            if (!isDryRun) {
              fs.copyFileSync(sourceImgPath, publicImgPath);
            }
            image_url = `/products/${imageName}`;
            has_image = true;
          }
        }
      }

      if (isForceVisible && has_image) {
        isVisible = true;
        readyForStorefront = true;
      }

      if (!has_image) {
        report.missingImages.push(sku);
        has_image = false;
        image_url = '/products/placeholder-dahab.webp';
        if (isVisible || readyForStorefront) {
          report.hiddenBecauseMissingImage.push(sku);
          isVisible = false;
        }
      } else if ((!isVisible || !readyForStorefront) && !isForceVisible) {
        report.hiddenBecauseVisibilityNo.push(sku);
      }

      if (isVisible && readyForStorefront) {
        report.visibleProducts++;
      } else {
        report.hiddenProducts++;
      }

      const productData = {
        name_ar,
        inspired_by,
        categoryId,
        category_slug: categorySlug,
        gender,
        season: seasonAr,
        season_slug,
        fragrance_family,
        keywords,
        short_description,
        image_name: imageName || '',
        image_url,
        has_image,
        visible: isVisible,
        ready_for_storefront: readyForStorefront,
        featured: isFeatured,
        low_stock_threshold: lowStockThreshold
      };

      const existingProductId = existingSkuMap.get(sku);

      if (!isDryRun) {
        let productId;

        if (existingProductId) {
          await prisma.product.update({ where: { sku }, data: productData });
          productId = existingProductId;
          
          await prisma.$transaction([
            prisma.productVariant.deleteMany({ where: { productId } }),
            prisma.productAccord.deleteMany({ where: { productId } }),
            prisma.productFamilyTag.deleteMany({ where: { productId } }),
          ]);
          report.updatedProducts++;
        } else {
          productData.sku = sku;
          productData.slug = name_ar.toLowerCase().replace(/\s+/g, '-') + '-' + sku.toLowerCase() + '-' + crypto.randomBytes(3).toString('hex');
          const newProduct = await prisma.product.create({ data: productData });
          productId = newProduct.id;
          report.importedProducts++;
        }

        const accordsData = [];
        const defaultStrengths = [100, 85, 70, 55, 40];
        let accordSortOrder = 1;

        for (let i = 1; i <= 5; i++) {
          const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
          let accordStrength = parseInt(row[`قوة البصمة ${i}`]);
          
          if (accordName) {
            if (isNaN(accordStrength) || accordStrength <= 0) {
               accordStrength = defaultStrengths[i-1] || 40;
            }
            accordsData.push({ 
              productId, 
              position: accordSortOrder++, 
              name_ar: accordName, 
              strength: accordStrength 
            });
          }
        }
        report.createdAccords += accordsData.length;

        const variantsData = [
          { productId, volume: '50ml', price: price50, stock: totalStock },
          { productId, volume: '100ml', price: price100, stock: totalStock },
          { productId, volume: '200ml', price: price200, stock: totalStock },
        ];
        report.createdVariants += variantsData.length;

        await prisma.$transaction([
          prisma.productVariant.createMany({ data: variantsData, skipDuplicates: true }),
          prisma.productAccord.createMany({ data: accordsData, skipDuplicates: true })
        ]);

      } else {
        // DRY RUN Counting
        if (existingProductId) {
          report.updatedProducts++;
        } else {
          report.importedProducts++;
        }
        for (let i = 1; i <= 5; i++) {
          if (row[`البصمة العطرية ${i}`]?.toString().trim()) {
            report.createdAccords++;
          }
        }
        report.createdVariants += 3;
      }
    } catch (error) {
      console.error(`[Error] Failed on SKU ${sku}:`, error.message);
      report.invalidRows.push(sku);
    }
  }

  const reportPath = path.join(process.cwd(), 'import-report.json');

  if (!isDryRun) {
    const totalProducts = await prisma.product.count();
    const totalVariants = await prisma.productVariant.count();
    const totalAccords = await prisma.productAccord.count();
    const visibleCount = await prisma.product.count({ where: { visible: true, ready_for_storefront: true } });
    const hiddenCount = await prisma.product.count({ where: { OR: [{ visible: false }, { ready_for_storefront: false }] } });
    const totalCategories = await prisma.category.count();
    const missingImgCount = await prisma.product.count({ where: { has_image: false } });

    report.databaseCounts = {
      products: totalProducts,
      categories: totalCategories,
      variants: totalVariants,
      accords: totalAccords,
      visibleStorefrontProducts: visibleCount,
      hiddenProducts: hiddenCount,
      missingImageProducts: missingImgCount
    };

    console.log('\nDatabase verification:');
    console.log(`Products count: ${totalProducts}`);
    console.log(`Categories count: ${totalCategories}`);
    console.log(`Variants count: ${totalVariants}`);
    console.log(`Accords count: ${totalAccords}`);
    console.log(`Visible storefront products: ${visibleCount}`);
    console.log(`Hidden products: ${hiddenCount}`);
    console.log(`Missing image products: ${missingImgCount}`);
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

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
  });
