const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

const excelPath = path.join(__dirname, '..', 'dahab_perfumes_import_template.xlsx');
const sourceImagesPath = path.join(__dirname, '..', 'products');
const destImagesPath = path.join(__dirname, '..', 'public', 'uploads', 'products');

async function importData() {
  console.log('--- DAHAB PERFUMES STRICT IMPORT SYSTEM V2 ---');

  if (!fs.existsSync(destImagesPath)) {
    fs.mkdirSync(destImagesPath, { recursive: true });
  }

  // 1. Enforce Global Pricing
  const globalPricing = await prisma.globalPricingSettings.findFirst({
    where: { active: true },
    orderBy: { created_at: 'desc' }
  });

  const price50 = globalPricing?.price_50ml_fils;
  const price100 = globalPricing?.price_100ml_fils;
  const price200 = globalPricing?.price_200ml_fils;

  if (!price50 || price50 <= 0 || !price100 || price100 <= 0 || !price200 || price200 <= 0) {
    console.error('\n[ERROR] Global prices are missing, invalid, or zero.');
    console.error('Please configure 50ml, 100ml, and 200ml prices in Admin Settings before importing.');
    process.exit(1);
  }

  const wb = xlsx.readFile(excelPath);
  const sheetName = wb.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

  const report = {
    totalRows: data.length,
    importedProducts: 0,
    updatedProducts: 0,
    skippedRows: 0,
    missingImages: 0,
    missingPrices: 0, // Should be 0 since global prices are enforced
    hiddenProducts: 0,
    visibleProducts: 0,
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
      if (name_ar === 'عطر مجهول') {
        report.invalidData++;
      }

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

      // 2. Process Image
      const imageName = row['اسم الصورة']?.toString().trim();
      let image_filename = null;
      let hasImage = false;

      if (imageName) {
        const sourceImg = path.join(sourceImagesPath, imageName);
        const destImg = path.join(destImagesPath, imageName);
        
        if (fs.existsSync(sourceImg)) {
          fs.copyFileSync(sourceImg, destImg);
          image_filename = `products/${imageName}`;
          hasImage = true;
        }
      }

      // 3. Strict Visibility Logic: Must have image to be visible
      if (!hasImage) {
        report.missingImages++;
        isVisible = false; // Force hide if no image
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

      if (existingId) {
        // Remove slug from update data so we don't keep changing the URL for existing products
        delete productData.slug;
        await prisma.product.update({ where: { id: existingId }, data: productData });
        
        // Clean up relations for recreation
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

      // 4. Create Accords
      const accordsData = [];
      for (let i = 1; i <= 5; i++) {
        const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
        const accordStrength = parseInt(row[`قوة البصمة ${i}`]);
        if (accordName && !isNaN(accordStrength)) {
          accordsData.push({ productId, position: i, name_ar: accordName, strength: accordStrength });
        }
      }

      // 5. Create Tags
      const tagsRaw = keywords_ar.split('،').map(t => t.trim()).filter(t => t);
      const uniqueTags = [...new Set(tagsRaw)].map(tag => ({ productId, tag_ar: tag }));

      // 6. Strict Global Pricing Variants Creation
      // Ignores Excel specific price columns completely
      const variantsData = [
        { productId, volume: '50', price: price50, stock: totalStock }, // Assign stock to 50ml, or distribute
        { productId, volume: '100', price: price100, stock: totalStock },
        { productId, volume: '200', price: price200, stock: totalStock },
      ];

      await prisma.$transaction([
        prisma.productVariant.createMany({ data: variantsData, skipDuplicates: true }),
        prisma.productAccord.createMany({ data: accordsData, skipDuplicates: true }),
        prisma.productFamilyTag.createMany({ data: uniqueTags, skipDuplicates: true })
      ]);

    } catch (error) {
      console.error(`[Error] Failed on SKU ${sku}:`, error.message);
      report.invalidData++;
    }
  }

  // 7. Generate Terminal Report
  console.log('\n--- Import Process Completed ---');
  console.log(`Total rows scanned: ${report.totalRows}`);
  console.log(`Imported products: ${report.importedProducts}`);
  console.log(`Updated products: ${report.updatedProducts}`);
  console.log(`Skipped rows (empty): ${report.skippedRows}`);
  console.log(`Missing images: ${report.missingImages}`);
  console.log(`Products with missing prices: ${report.missingPrices}`); // Will be 0 due to strict abort
  console.log(`Hidden products: ${report.hiddenProducts}`);
  console.log(`Visible products: ${report.visibleProducts}`);
  console.log(`Products with invalid data/errors: ${report.invalidData}`);
  
  fs.writeFileSync(path.join(__dirname, 'import-report.json'), JSON.stringify(report, null, 2));
}

importData()
  .catch(e => {
    console.error('\n[FATAL ERROR]', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
