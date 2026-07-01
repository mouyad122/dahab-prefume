import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function verify() {
  const total = await p.product.count();
  const totalAccords = await p.productAccord.count();
  const totalTags = await p.productFamilyTag.count();
  const visible = await p.product.count({ where: { visible_on_website: true } });
  const featured = await p.product.count({ where: { featured_on_frontend: true } });
  const needsReview = await p.product.count({ where: { needs_review: true } });
  const needsImage = await p.product.count({ where: { needs_image: true } });
  const genPricing = await p.product.count({ where: { uses_general_pricing: true } });
  const custPricing = await p.product.count({ where: { uses_general_pricing: false } });
  const globalPricing = await p.globalPricingSettings.findFirst({ where: { active: true } });

  const row4 = await p.product.findFirst({ where: { source_excel_row: 4 } });
  const reviewProducts = await p.product.findMany({
    where: { needs_review: true },
    select: { sku: true, name_ar: true, source_excel_row: true, research_confidence: true }
  });

  // Check for duplicate slugs
  const allSlugs = await p.product.findMany({ select: { slug: true } });
  const slugSet = new Set();
  let dupSlugs = 0;
  for (const s of allSlugs) {
    if (slugSet.has(s.slug)) dupSlugs++;
    slugSet.add(s.slug);
  }

  // Check min/max source_excel_row
  const minRow = await p.product.findFirst({ orderBy: { source_excel_row: 'asc' }, select: { source_excel_row: true } });
  const maxRow = await p.product.findFirst({ orderBy: { source_excel_row: 'desc' }, select: { source_excel_row: true } });

  console.log('====================================================');
  console.log('DATABASE VERIFICATION REPORT');
  console.log('====================================================');
  console.log(`Total Products in DB:        ${total}`);
  console.log(`Total ProductAccords:        ${totalAccords}`);
  console.log(`Total ProductFamilyTags:     ${totalTags}`);
  console.log(`Visible on Website:          ${visible}`);
  console.log(`Featured on Frontend:        ${featured}`);
  console.log(`Needs Review:                ${needsReview}`);
  console.log(`Needs Image:                 ${needsImage}`);
  console.log(`General Pricing:             ${genPricing}`);
  console.log(`Custom Pricing:              ${custPricing}`);
  console.log(`Duplicate Slugs in DB:       ${dupSlugs}`);
  console.log(`Min source_excel_row:        ${minRow?.source_excel_row}`);
  console.log(`Max source_excel_row:        ${maxRow?.source_excel_row}`);
  console.log('');
  console.log('Global Pricing Settings:');
  console.log(`  50ml:  ${globalPricing?.price_50ml_fils} fils (${globalPricing?.price_50ml_fils / 1000} JOD)`);
  console.log(`  100ml: ${globalPricing?.price_100ml_fils} fils (${globalPricing?.price_100ml_fils / 1000} JOD)`);
  console.log(`  200ml: ${globalPricing?.price_200ml_fils} fils (${globalPricing?.price_200ml_fils / 1000} JOD)`);
  console.log(`  Currency: ${globalPricing?.currency}`);
  console.log('');
  console.log('Row 4 Custom Pricing (عود ملكي):');
  console.log(`  SKU: ${row4?.sku}`);
  console.log(`  Name: ${row4?.name_ar}`);
  console.log(`  Uses General Pricing: ${row4?.uses_general_pricing}`);
  console.log(`  50ml:  ${row4?.price_50ml_fils} fils (${row4?.price_50ml_fils / 1000} JOD)`);
  console.log(`  100ml: ${row4?.price_100ml_fils} fils (${row4?.price_100ml_fils / 1000} JOD)`);
  console.log(`  200ml: ${row4?.price_200ml_fils} fils (${row4?.price_200ml_fils / 1000} JOD)`);
  console.log('');
  console.log('Needs Review Products:');
  reviewProducts.forEach(p => {
    console.log(`  Row ${p.source_excel_row} | SKU: ${p.sku} | Name: ${p.name_ar} | Confidence: ${p.research_confidence}`);
  });
  console.log('====================================================');

  await p.$disconnect();
}

verify().catch(e => { console.error(e); process.exit(1); });
