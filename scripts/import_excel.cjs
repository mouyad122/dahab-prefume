const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const excelPath = path.join(__dirname, '..', 'dahab_perfumes_import_template.xlsx');
const sourceImagesPath = path.join(__dirname, '..', 'products');
const destImagesPath = path.join(__dirname, '..', 'public', 'uploads', 'products');

async function importData() {
  console.log('Starting import process...');

  if (!fs.existsSync(destImagesPath)) {
    fs.mkdirSync(destImagesPath, { recursive: true });
  }

  const wb = xlsx.readFile(excelPath);
  const sheetName = wb.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

  console.log(`Found ${data.length} rows in Excel file.`);

  // Get global pricing
  const globalPricing = await prisma.globalPricingSettings.findFirst({
    where: { active: true },
    orderBy: { created_at: 'desc' }
  });

  const defaultPrices = {
    '50': globalPricing?.price_50ml_fils || 15000,
    '100': globalPricing?.price_100ml_fils || 25000,
    '200': globalPricing?.price_200ml_fils || 40000,
  };

  let importedCount = 0;
  let skippedCount = 0;

  for (const row of data) {
    const sku = row['SKU']?.toString().trim();
    if (!sku) {
      console.log('Skipping row without SKU');
      continue;
    }

    try {
      const name_ar = row['اسم العطر']?.toString().trim() || 'عطر مجهول';
      const inspired_by = row['Inspired By']?.toString().trim() || null;
      const main_category = row['التصنيف الرئيسي']?.toString().trim() || 'general';
      const gender = row['الجنس']?.toString().trim() || 'unisex';
      const season = row['الموسم']?.toString().trim() || 'all';
      const fragrance_family_raw = row['العائلة العطرية']?.toString().trim() || '';
      
      const keywords_ar = row['الكلمات المفتاحية']?.toString().trim() || '';
      const totalStock = parseInt(row['المخزون الكلي']) || 0;
      const lowStockThreshold = parseInt(row['حد تنبيه المخزون']) || 5;
      
      const isVisible = row['ظاهر بالموقع؟'] === 'نعم';
      const isFeatured = row['مميز بالواجهة؟'] === 'نعم';
      
      const shortDesc = row['وصف قصير']?.toString().trim() || '';
      const notesDesc = row['ملاحظات']?.toString().trim() || '';
      
      const useGlobal = row['يستخدم الأسعار العامة؟'] !== 'لا';
      const price50 = useGlobal ? defaultPrices['50'] : (parseInt(row['سعر 50ml خاص']) * 1000 || defaultPrices['50']);
      const price100 = useGlobal ? defaultPrices['100'] : (parseInt(row['سعر 100ml خاص']) * 1000 || defaultPrices['100']);
      const price200 = useGlobal ? defaultPrices['200'] : (parseInt(row['سعر 200ml خاص']) * 1000 || defaultPrices['200']);

      const imageName = row['اسم الصورة']?.toString().trim();
      let image_filename = '';

      if (imageName) {
        const sourceImg = path.join(sourceImagesPath, imageName);
        const destImg = path.join(destImagesPath, imageName);
        
        if (fs.existsSync(sourceImg)) {
          fs.copyFileSync(sourceImg, destImg);
          image_filename = `products/${imageName}`;
        } else {
          console.log(`Image not found for SKU ${sku}: ${imageName}`);
        }
      }

      // Prepare Accords
      const accords = [];
      for (let i = 1; i <= 5; i++) {
        const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
        const accordStrength = parseInt(row[`قوة البصمة ${i}`]);
        if (accordName && !isNaN(accordStrength)) {
          accords.push({
            position: i,
            name_ar: accordName,
            strength: accordStrength
          });
        }
      }

      // Find if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { sku: sku }
      });

      let product;
      if (existingProduct) {
        // Update product
        product = await prisma.product.update({
          where: { sku: sku },
          data: {
            name_ar,
            inspired_by,
            main_category,
            gender,
            season,
            fragrance_family_raw,
            short_description_ar: shortDesc,
            long_description_ar: notesDesc,
            keywords_ar,
            image_filename: image_filename || undefined, // don't override if not provided again
            visible_on_website: isVisible,
            featured_on_frontend: isFeatured,
            low_stock_threshold: lowStockThreshold,
          }
        });
        
        // Delete existing variants and accords to recreate them cleanly
        await prisma.productVariant.deleteMany({ where: { productId: product.id } });
        await prisma.productAccord.deleteMany({ where: { productId: product.id } });
      } else {
        // Create new
        const slug = name_ar.toLowerCase().replace(/\s+/g, '-') + '-' + sku.toLowerCase() + '-' + Math.floor(Math.random()*1000);
        product = await prisma.product.create({
          data: {
            sku,
            slug,
            name_ar,
            inspired_by,
            main_category,
            gender,
            season,
            fragrance_family_raw,
            short_description_ar: shortDesc,
            long_description_ar: notesDesc,
            keywords_ar,
            image_filename,
            visible_on_website: isVisible,
            featured_on_frontend: isFeatured,
            low_stock_threshold: lowStockThreshold,
          }
        });
      }

      // Create Variants
      await prisma.productVariant.createMany({
        data: [
          { productId: product.id, volume: '50', price: price50, stock: totalStock },
          { productId: product.id, volume: '100', price: price100, stock: 0 },
          { productId: product.id, volume: '200', price: price200, stock: 0 },
        ]
      });

      // Create Accords
      if (accords.length > 0) {
        await prisma.productAccord.createMany({
          data: accords.map(a => ({ ...a, productId: product.id }))
        });
      }

      // Family tags from keywords
      const tags = keywords_ar.split('،').map(t => t.trim()).filter(t => t);
      if (tags.length > 0) {
        await prisma.productFamilyTag.deleteMany({ where: { productId: product.id } });
        
        const uniqueTags = [...new Set(tags)];
        for (const tag of uniqueTags) {
          try {
            await prisma.productFamilyTag.create({
              data: {
                productId: product.id,
                tag_ar: tag
              }
            });
          } catch(e) {
            // Ignore duplicate tag insertion errors
          }
        }
      }

      importedCount++;
      if (importedCount % 50 === 0) {
        console.log(`Imported ${importedCount} products...`);
      }
    } catch (error) {
      console.error(`Error importing SKU ${sku}:`, error.message);
      skippedCount++;
    }
  }

  console.log(`\nImport complete!`);
  console.log(`Successfully imported/updated: ${importedCount}`);
  console.log(`Skipped/Errors: ${skippedCount}`);
}

importData()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
