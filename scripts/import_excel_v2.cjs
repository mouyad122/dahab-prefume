const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('--- DAHAB PERFUMES STRICT IMPORT SYSTEM V2 ---');

  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isForceVisible = args.includes('--force-visible');

  console.log(`Working directory: ${process.cwd()}`);
  if (isDryRun) console.log('Mode: DRY-RUN (No database writes will occur)');
  if (isForceVisible) console.log('Mode: FORCE-VISIBLE (Visible if image and price are valid)');

  const excelPath = path.join(process.cwd(), 'import', 'dahab_perfumes_import_template.xlsx');
  console.log(`Excel path: ${excelPath}`);

  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found at ${excelPath}`);
  }
  console.log('Excel exists: YES');

  const wb = xlsx.readFile(excelPath);
  if (!wb.SheetNames.includes('Products')) {
    throw new Error(`Products sheet not found. Available sheets: ${wb.SheetNames.join(', ')}`);
  }
  console.log('Products sheet found: YES');

  const data = xlsx.utils.sheet_to_json(wb.Sheets['Products'], { defval: '' });
  console.log(`Rows detected: ${data.length}`);

  console.log('Connecting to database: OK');

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
    throw new Error('Global prices are missing or invalid.\nPlease configure 50ml, 100ml, and 200ml prices in /admin/settings before importing.');
  }

  const sourceImagesDir = path.join(process.cwd(), 'products');
  const publicImagesDir = path.join(process.cwd(), 'public', 'products');
  console.log(`Images directory: public/products`);

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  let imagesFound = 0;
  if (fs.existsSync(publicImagesDir)) {
    imagesFound = fs.readdirSync(publicImagesDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')).length;
  }
  console.log(`Images found: ${imagesFound}`);

  console.log('Importing products...');

  const report = {
    totalRows: data.length,
    importedProducts: 0,
    updatedProducts: 0,
    skippedRows: 0,
    missingImages: [],
    hiddenBecauseExcelVisibilityNo: [],
    hiddenBecauseMissingImage: [],
    missingPrices: [], 
    createdVariants: 0,
    createdAccords: 0,
    visibleProducts: 0,
    hiddenProducts: 0,
    invalidData: 0
  };

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
      if (name_ar === 'عطر مجهول') report.invalidData++;

      const inspired_by = row['Inspired By']?.toString().trim() || null;
      const main_category = row['التصنيف الرئيسي']?.toString().trim() || 'general';
      const gender = row['الجنس']?.toString().trim() || 'unisex';
      const season = row['الموسم']?.toString().trim() || 'all';
      const fragrance_family_raw = row['العائلة العطرية']?.toString().trim() || '';
      const keywords_ar = row['الكلمات المفتاحية']?.toString().trim() || '';
      const totalStock = parseInt(row['المخزون الكلي']) || 0;
      const lowStockThreshold = parseInt(row['حد تنبيه المخزون']) || 5;
      const shortDesc = row['وصف قصير']?.toString().trim() || '';
      const notesDesc = row['ملاحظات']?.toString().trim() || '';
      const isFeatured = row['مميز بالواجهة؟'] === 'نعم';

      let isVisible = row['ظاهر بالموقع؟'] === 'نعم';
      
      const imageName = row['اسم الصورة']?.toString().trim();
      let image_filename = null;
      let hasImage = false;

      if (imageName) {
        const publicImgPath = path.join(publicImagesDir, imageName);
        const sourceImgPath = path.join(sourceImagesDir, imageName);
        
        if (fs.existsSync(publicImgPath)) {
          image_filename = `/products/${imageName}`;
          hasImage = true;
        } else if (fs.existsSync(sourceImgPath)) {
          if (!isDryRun) {
            fs.copyFileSync(sourceImgPath, publicImgPath);
          }
          image_filename = `/products/${imageName}`;
          hasImage = true;
        }
      }

      if (isForceVisible && hasImage) {
        isVisible = true;
      }

      if (!hasImage) {
        report.missingImages.push(sku);
        if (isVisible) {
          report.hiddenBecauseMissingImage.push(sku);
          isVisible = false;
        }
      } else if (!isVisible && !isForceVisible) {
        report.hiddenBecauseExcelVisibilityNo.push(sku);
      }

      if (isVisible) {
        report.visibleProducts++;
      } else {
        report.hiddenProducts++;
      }

      const productData = {
        sku,
        name_ar,
        inspired_by,
        main_category,
        gender,
        season,
        fragrance_family_raw,
        short_description_ar: shortDesc,
        long_description_ar: notesDesc,
        keywords_ar,
        visible_on_website: isVisible,
        featured_on_frontend: isFeatured,
        low_stock_threshold: lowStockThreshold,
        slug: name_ar.toLowerCase().replace(/\s+/g, '-') + '-' + sku.toLowerCase() + '-' + crypto.randomBytes(3).toString('hex')
      };

      if (hasImage) {
        productData.image_filename = image_filename;
      }

      const existingId = existingSkuMap.get(sku);
      let productId = existingId;

      if (!isDryRun) {
        if (existingId) {
          delete productData.slug;
          await prisma.product.update({ where: { id: existingId }, data: productData });
          
          await prisma.$transaction([
            prisma.productVariant.deleteMany({ where: { productId: existingId } }),
            prisma.productAccord.deleteMany({ where: { productId: existingId } }),
            prisma.productFamilyTag.deleteMany({ where: { productId: existingId } }),
          ]);
          report.updatedProducts++;
        } else {
          const newProduct = await prisma.product.create({ data: productData });
          productId = newProduct.id;
          report.importedProducts++;
        }

        const accordsData = [];
        for (let i = 1; i <= 5; i++) {
          const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
          const accordStrength = parseInt(row[`قوة البصمة ${i}`]);
          if (accordName && !isNaN(accordStrength)) {
            accordsData.push({ productId, position: i, name_ar: accordName, strength: accordStrength });
          }
        }
        report.createdAccords += accordsData.length;

        const tagsRaw = keywords_ar.split('،').map(t => t.trim()).filter(t => t);
        const uniqueTags = [...new Set(tagsRaw)].map(tag => ({ productId, tag_ar: tag }));

        const variantsData = [
          { productId, volume: '50', price: price50, stock: totalStock },
          { productId, volume: '100', price: price100, stock: totalStock },
          { productId, volume: '200', price: price200, stock: totalStock },
        ];
        report.createdVariants += variantsData.length;

        await prisma.$transaction([
          prisma.productVariant.createMany({ data: variantsData, skipDuplicates: true }),
          prisma.productAccord.createMany({ data: accordsData, skipDuplicates: true }),
          prisma.productFamilyTag.createMany({ data: uniqueTags, skipDuplicates: true })
        ]);
      } else {
        // Dry run counting
        if (existingId) {
          report.updatedProducts++;
        } else {
          report.importedProducts++;
        }
        for (let i = 1; i <= 5; i++) {
          const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
          const accordStrength = parseInt(row[`قوة البصمة ${i}`]);
          if (accordName && !isNaN(accordStrength)) report.createdAccords++;
        }
        report.createdVariants += 3;
      }
    } catch (error) {
      console.error(`[Error] Failed on SKU ${sku}:`, error.message);
      report.invalidData++;
    }
  }

  console.log(`Imported: ${report.importedProducts}`);
  console.log(`Updated: ${report.updatedProducts}`);
  console.log(`Missing images: ${report.missingImages.length}`);
  console.log(`Visible products: ${report.visibleProducts}`);
  console.log(`Hidden products: ${report.hiddenProducts}`);

  const reportPath = path.join(process.cwd(), 'scripts', 'import-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Report saved: import-report.json`);

  if (!isDryRun) {
    const totalProducts = await prisma.product.count();
    const totalVariants = await prisma.productVariant.count();
    const totalAccords = await prisma.productAccord.count();
    const visibleCount = await prisma.product.count({ where: { visible_on_website: true } });
    const hiddenCount = await prisma.product.count({ where: { visible_on_website: false } });

    console.log('\nDatabase verification:');
    console.log(`Products count: ${totalProducts}`);
    console.log(`Variants count: ${totalVariants}`);
    console.log(`Accords count: ${totalAccords}`);
    console.log(`Visible storefront products: ${visibleCount}`);
    console.log(`Hidden products: ${hiddenCount}`);
  }
}

main()
  .then(() => {
    console.log('DONE');
    process.exit(0);
  })
  .catch((error) => {
    console.error('IMPORT FAILED:');
    console.error(error.message);
    process.exit(1);
  });
