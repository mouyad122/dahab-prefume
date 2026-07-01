import { PrismaClient } from '@prisma/client';
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFilePath = path.join(__dirname, '../dahab_perfumes_import_template.xlsx');

function getCellValue(sheet, rowIdx, colIdx) {
  const cellAddress = XLSX.utils.encode_cell({ r: rowIdx - 1, c: colIdx - 1 });
  const cell = sheet[cellAddress];
  if (!cell) return null;
  return cell.v;
}

function cleanSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\s\t\n\.\,\:\;\!\?\@\#\$\%\^\&\*\(\)\_\\\/\+\=\[\]\{\}،]+/g, '-') // Replace spaces, punctuation and Arabic comma
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]/g, '') // Remove non-Arabic, non-alphanumeric except hyphens
    .replace(/-+/g, '-') // Normalize multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

async function main() {
  console.log(`Loading Excel file from: ${excelFilePath}`);
  const workbook = XLSX.readFile(excelFilePath);

  const productsSheet = workbook.Sheets['Products'];
  const logSheet = workbook.Sheets['Research_Log'];

  if (!productsSheet || !logSheet) {
    console.error('ERROR: Could not find required sheets (Products or Research_Log)');
    process.exit(1);
  }

  // Set up Global Pricing Settings if they don't exist
  // By default, general prices: 50ml = 10 JOD (10000 fils), 100ml = 15 JOD (15000 fils), 200ml = 25 JOD (25000 fils)
  let globalPricing = await prisma.globalPricingSettings.findFirst({ where: { active: true } });
  if (!globalPricing) {
    globalPricing = await prisma.globalPricingSettings.create({
      data: {
        price_50ml_fils: 10000,
        price_100ml_fils: 15000,
        price_200ml_fils: 25000,
        currency: 'JOD',
        active: true
      }
    });
    console.log('Created default Global Pricing Settings:', globalPricing);
  }

  const slugRegistry = new Map(); // Map to track slugs and their row numbers
  let totalRowsRead = 0;
  let totalImported = 0;
  let totalUpdated = 0;
  let skippedRows = 0;
  let duplicateSlugsCount = 0;
  let missingImagesCount = 0;
  let needsReviewCount = 0;
  let generalPricingCount = 0;
  let customPricingCount = 0;

  // We read rows 2 to 332
  for (let r = 2; r <= 332; r++) {
    // Cell extraction (using 1-based index)
    const raw_name = getCellValue(productsSheet, r, 2);
    const name_ar = raw_name ? raw_name.toString().trim() : null;
    
    const raw_inspired = getCellValue(productsSheet, r, 3);
    const inspired_by = raw_inspired ? raw_inspired.toString().trim() : null;

    const raw_main_cat = getCellValue(productsSheet, r, 4);
    const main_category = raw_main_cat ? raw_main_cat.toString().trim() : null;

    const raw_gender = getCellValue(productsSheet, r, 5);
    const gender = raw_gender ? raw_gender.toString().trim() : null;

    const raw_season = getCellValue(productsSheet, r, 6);
    const season = raw_season ? raw_season.toString().trim() : null;

    const raw_family = getCellValue(productsSheet, r, 7);
    const fragrance_family_raw = raw_family ? raw_family.toString().trim() : null;
    
    const raw_keywords = getCellValue(productsSheet, r, 18);
    const keywords_ar = raw_keywords ? raw_keywords.toString().trim() : '';

    const raw_uses_pub = getCellValue(productsSheet, r, 21);
    const uses_public_str = raw_uses_pub ? raw_uses_pub.toString().trim() : 'نعم';

    const price_50_val = getCellValue(productsSheet, r, 22);
    const price_100_val = getCellValue(productsSheet, r, 23);
    const price_200_val = getCellValue(productsSheet, r, 24);

    const raw_image = getCellValue(productsSheet, r, 25);
    const image_filename = raw_image ? raw_image.toString().trim() : 'missing';

    const raw_visible = getCellValue(productsSheet, r, 26);
    const visible_on_website = raw_visible ? raw_visible.toString().trim() === 'نعم' : false;

    const raw_featured = getCellValue(productsSheet, r, 27);
    const featured_on_frontend = raw_featured ? raw_featured.toString().trim() === 'نعم' : false;

    const raw_short_desc = getCellValue(productsSheet, r, 28);
    const short_description_ar = raw_short_desc ? raw_short_desc.toString().trim() : null;

    const raw_notes = getCellValue(productsSheet, r, 29);
    const notes = raw_notes ? raw_notes.toString().trim() : '';

    if (!name_ar) {
      skippedRows++;
      continue;
    }
    totalRowsRead++;

    // Generate SKU: DHB-0002 to DHB-0332
    const sku = `DHB-${r.toString().padStart(4, '0')}`;

    // Generate Unique Slug
    let baseSlug = cleanSlug(name_ar);
    if (!baseSlug) {
      baseSlug = `product-${r}`;
    }
    let slug = baseSlug;

    if (slugRegistry.has(baseSlug)) {
      duplicateSlugsCount++;
      slug = `${baseSlug}-${r}`; // Append row number
    }
    slugRegistry.set(baseSlug, r);

    // Parse pricing (convert JOD to fils)
    const uses_general_pricing = uses_public_str === 'نعم';
    let price_50ml_fils = null;
    let price_100ml_fils = null;
    let price_200ml_fils = null;

    if (uses_general_pricing) {
      generalPricingCount++;
    } else {
      customPricingCount++;
      if (price_50_val !== null && price_50_val !== undefined) {
        price_50ml_fils = Math.round(parseFloat(price_50_val) * 1000);
      }
      if (price_100_val !== null && price_100_val !== undefined) {
        price_100ml_fils = Math.round(parseFloat(price_100_val) * 1000);
      }
      if (price_200_val !== null && price_200_val !== undefined) {
        price_200ml_fils = Math.round(parseFloat(price_200_val) * 1000);
      }
    }

    // Image missing handling
    const needs_image = image_filename === 'missing';
    if (needs_image) {
      missingImagesCount++;
    }

    // Research_Log alignment & Needs Review
    const raw_confidence = getCellValue(logSheet, r, 5);
    const research_confidence = raw_confidence ? raw_confidence.toString().trim() : 'High';

    const raw_log_notes = getCellValue(logSheet, r, 6);
    const log_notes = raw_log_notes ? raw_log_notes.toString().trim() : '';

    const needs_review = [157, 269, 285].includes(r) || research_confidence === 'Needs Review';
    if (needs_review) {
      needsReviewCount++;
    }

    // Parse accords (Columns 8 to 17)
    const accords = [];
    for (let i = 0; i < 5; i++) {
      const nameCol = 8 + (i * 2);
      const strengthCol = nameCol + 1;
      const acc_name = getCellValue(productsSheet, r, nameCol);
      const acc_strength = getCellValue(productsSheet, r, strengthCol);
      if (acc_name) {
        accords.push({
          position: i + 1,
          name_ar: acc_name.toString().trim(),
          strength: acc_strength ? parseInt(acc_strength) : 0
        });
      }
    }

    // Parse family tags (Split fragrance_family_raw by Arabic comma "،" and English comma ",")
    const familyTags = [];
    if (fragrance_family_raw) {
      const tags = fragrance_family_raw.split(/[\s,،]+/);
      for (let tag of tags) {
        tag = tag.trim();
        if (tag && !familyTags.includes(tag)) {
          familyTags.push(tag);
        }
      }
    }

    // Check if product already exists by SKU or source_excel_row
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { sku },
          { source_excel_row: r }
        ]
      }
    });

    const productPayload = {
      sku,
      slug,
      name_ar,
      inspired_by: inspired_by || '',
      main_category: main_category || '',
      gender: gender || '',
      season: season || '',
      fragrance_family_raw: fragrance_family_raw || '',
      short_description_ar: short_description_ar || '',
      keywords_ar: keywords_ar,
      image_filename,
      needs_image,
      visible_on_website,
      featured_on_frontend,
      uses_general_pricing,
      price_50ml_fils,
      price_100ml_fils,
      price_200ml_fils,
      notes: notes || log_notes || null,
      research_confidence,
      needs_review,
    };

    let upsertedProduct;
    if (existing) {
      upsertedProduct = await prisma.product.update({
        where: { id: existing.id },
        data: productPayload
      });
      totalUpdated++;
    } else {
      upsertedProduct = await prisma.product.create({
        data: {
          ...productPayload,
          source_excel_row: r
        }
      });
      totalImported++;
    }

    // Delete existing related accords and family tags
    await prisma.productAccord.deleteMany({ where: { productId: upsertedProduct.id } });
    await prisma.productFamilyTag.deleteMany({ where: { productId: upsertedProduct.id } });

    // Insert new accords
    if (accords.length > 0) {
      await prisma.productAccord.createMany({
        data: accords.map(acc => ({
          productId: upsertedProduct.id,
          position: acc.position,
          name_ar: acc.name_ar,
          strength: acc.strength
        }))
      });
    }

    // Insert new family tags
    if (familyTags.length > 0) {
      await prisma.productFamilyTag.createMany({
        data: familyTags.map(tag => ({
          productId: upsertedProduct.id,
          tag_ar: tag
        }))
      });
    }
  }

  // Print final statistics report
  console.log('\n====================================================');
  console.log('IMPORT VALIDATION REPORT:');
  console.log(`Total Rows Read:             ${totalRowsRead}`);
  console.log(`Total Products Imported:     ${totalImported}`);
  console.log(`Total Products Updated:      ${totalUpdated}`);
  console.log(`Skipped Rows:                ${skippedRows}`);
  console.log(`Duplicate Slugs Resolved:    ${duplicateSlugsCount}`);
  console.log(`Missing Images Count:        ${missingImagesCount}`);
  console.log(`Needs Review Count:          ${needsReviewCount}`);
  console.log(`Products with General Price: ${generalPricingCount}`);
  console.log(`Products with Custom Price:  ${customPricingCount}`);
  
  // Verify Row 4 custom prices
  const row4Prod = await prisma.product.findFirst({ where: { source_excel_row: 4 } });
  if (row4Prod) {
    console.log('\nRow 4 Custom Pricing Verification (عود ملكي):');
    console.log(`  Uses General Pricing:      ${row4Prod.uses_general_pricing}`);
    console.log(`  Price 50ml (fils):         ${row4Prod.price_50ml_fils}`);
    console.log(`  Price 100ml (fils):        ${row4Prod.price_100ml_fils}`);
    console.log(`  Price 200ml (fils):        ${row4Prod.price_200ml_fils}`);
  }

  // Verify Needs Review products
  const needsReviewList = await prisma.product.findMany({ where: { needs_review: true } });
  console.log(`\nNeeds Review Products Flagged (${needsReviewList.length}):`);
  needsReviewList.forEach(p => {
    console.log(`  Row ${p.source_excel_row.toString().padStart(3, ' ')} | SKU: ${p.sku} | Name: ${p.name_ar} | Confidence: ${p.research_confidence}`);
  });
  console.log('====================================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
