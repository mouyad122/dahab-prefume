const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

const excelPath = path.join(__dirname, '..', 'dahab_perfumes_import_template.xlsx');
const sourceImagesPath = path.join(__dirname, '..', 'products');
const destImagesPath = path.join(__dirname, '..', 'public', 'uploads', 'products');

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

async function importData() {
  console.log('--- Starting Highly Efficient Import Process ---');
  console.time('ImportDuration');

  if (!fs.existsSync(destImagesPath)) {
    await fsp.mkdir(destImagesPath, { recursive: true });
  }

  const wb = xlsx.readFile(excelPath);
  const sheetName = wb.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });

  console.log(`Found ${data.length} rows in Excel file.`);

  // Cache global pricing
  const globalPricing = await prisma.globalPricingSettings.findFirst({
    where: { active: true },
    orderBy: { created_at: 'desc' }
  });

  const defaultPrices = {
    '50': globalPricing?.price_50ml_fils || 15000,
    '100': globalPricing?.price_100ml_fils || 25000,
    '200': globalPricing?.price_200ml_fils || 40000,
  };

  // Pre-fetch existing SKUs to avoid findUnique on every iteration
  const existingProducts = await prisma.product.findMany({ select: { id: true, sku: true } });
  const existingSkuMap = new Map(existingProducts.map(p => [p.sku, p.id]));

  let importedCount = 0;
  let skippedCount = 0;

  // Process in chunks of 50
  const chunks = chunkArray(data, 50);
  
  for (let cIndex = 0; cIndex < chunks.length; cIndex++) {
    const chunk = chunks[cIndex];
    const chunkPromises = chunk.map(async (row) => {
      const sku = row['SKU']?.toString().trim();
      if (!sku) {
        return { status: 'skipped', reason: 'No SKU' };
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
        let image_filename = undefined;

        if (imageName) {
          const sourceImg = path.join(sourceImagesPath, imageName);
          const destImg = path.join(destImagesPath, imageName);
          
          if (fs.existsSync(sourceImg)) {
            // async file copy
            await fsp.copyFile(sourceImg, destImg);
            image_filename = `products/${imageName}`;
          } else {
            // Uncomment to debug missing images
            // console.log(`Missing image for ${sku}: ${imageName}`);
          }
        }

        const existingId = existingSkuMap.get(sku);
        
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
        };
        if (image_filename) productData.image_filename = image_filename;

        // Ensure slug is generated correctly
        productData.slug = name_ar.toLowerCase().replace(/\s+/g, '-') + '-' + sku.toLowerCase() + '-' + crypto.randomBytes(3).toString('hex');

        let productId = existingId;

        if (existingId) {
          await prisma.product.update({ where: { id: existingId }, data: productData });
          // delete nested relations to recreate
          await prisma.$transaction([
            prisma.productVariant.deleteMany({ where: { productId: existingId } }),
            prisma.productAccord.deleteMany({ where: { productId: existingId } }),
            prisma.productFamilyTag.deleteMany({ where: { productId: existingId } }),
          ]);
        } else {
          const newProduct = await prisma.product.create({ data: productData });
          productId = newProduct.id;
          existingSkuMap.set(sku, productId);
        }

        // Accords
        const accordsData = [];
        for (let i = 1; i <= 5; i++) {
          const accordName = row[`البصمة العطرية ${i}`]?.toString().trim();
          const accordStrength = parseInt(row[`قوة البصمة ${i}`]);
          if (accordName && !isNaN(accordStrength)) {
            accordsData.push({ productId, position: i, name_ar: accordName, strength: accordStrength });
          }
        }

        // Tags
        const tagsRaw = keywords_ar.split('،').map(t => t.trim()).filter(t => t);
        const uniqueTags = [...new Set(tagsRaw)].map(tag => ({ productId, tag_ar: tag }));

        // Variants
        const variantsData = [
          { productId, volume: '50', price: price50, stock: totalStock },
          { productId, volume: '100', price: price100, stock: 0 },
          { productId, volume: '200', price: price200, stock: 0 },
        ];

        // Bulk insert nested relations
        await prisma.$transaction([
          prisma.productVariant.createMany({ data: variantsData, skipDuplicates: true }),
          prisma.productAccord.createMany({ data: accordsData, skipDuplicates: true }),
          prisma.productFamilyTag.createMany({ data: uniqueTags, skipDuplicates: true })
        ]);

        return { status: 'success', sku };
      } catch (error) {
        return { status: 'error', sku, error: error.message };
      }
    });

    const results = await Promise.all(chunkPromises);
    
    for (const res of results) {
      if (res.status === 'success') importedCount++;
      else skippedCount++;
      // Uncomment to trace individual errors:
      // if (res.status === 'error') console.error(`Error [${res.sku}]: ${res.error}`);
    }

    console.log(`[Progress] Processed chunk ${cIndex + 1}/${chunks.length} | Imported so far: ${importedCount} | Skipped: ${skippedCount}`);
  }

  console.log(`\n--- Import Process Completed ---`);
  console.log(`Successfully imported/updated: ${importedCount}`);
  console.log(`Skipped/Errors: ${skippedCount}`);
  console.timeEnd('ImportDuration');
}

importData()
  .catch(e => {
    console.error('Fatal Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
