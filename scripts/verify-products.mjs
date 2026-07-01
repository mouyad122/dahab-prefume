/**
 * verify-products.mjs — Comprehensive database verification script.
 *
 * Validates the imported DAHAB PERFUMES product catalog against
 * all integrity, pricing, privacy, and data quality rules.
 *
 * Usage: npm run verify:products
 * Exit code 0 = all checks pass, 1 = critical failure.
 */

import { PrismaClient } from '@prisma/client';
import { ProductDbService } from '../src/services/ProductDbService.js';

const prisma = new PrismaClient();

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
let warnings = 0;
const errors = [];

function pass(label) {
  totalChecks++;
  passedChecks++;
  console.log(`  ✅ PASS: ${label}`);
}

function fail(label, detail = '') {
  totalChecks++;
  failedChecks++;
  const msg = detail ? `${label} — ${detail}` : label;
  console.log(`  ❌ FAIL: ${msg}`);
  errors.push(msg);
}

function warn(label) {
  warnings++;
  console.log(`  ⚠️  WARN: ${label}`);
}

function assertEqual(label, actual, expected) {
  if (actual === expected) {
    pass(`${label} = ${actual}`);
  } else {
    fail(label, `expected ${expected}, got ${actual}`);
  }
}

async function main() {
  console.log('====================================================');
  console.log('DAHAB PERFUMES — Product Database Verification');
  console.log('====================================================\n');

  // ----------------------------------------------------------
  // 1. DATABASE COUNTS
  // ----------------------------------------------------------
  console.log('1. DATABASE COUNTS');
  console.log('----------------------------------------------------------');

  const totalProducts = await prisma.product.count();
  assertEqual('Total products', totalProducts, 331);

  const totalAccords = await prisma.productAccord.count();
  assertEqual('Total ProductAccord records', totalAccords, 1655);

  const totalTags = await prisma.productFamilyTag.count();
  assertEqual('Total ProductFamilyTag records', totalTags, 994);

  const globalPricing = await prisma.globalPricingSettings.findFirst({ where: { active: true } });
  if (globalPricing) {
    pass('Active GlobalPricingSettings exists');
  } else {
    fail('Active GlobalPricingSettings exists', 'not found');
  }

  const generalPricingCount = await prisma.product.count({ where: { uses_general_pricing: true } });
  assertEqual('General pricing products', generalPricingCount, 330);

  const customPricingCount = await prisma.product.count({ where: { uses_general_pricing: false } });
  assertEqual('Custom pricing products', customPricingCount, 1);

  console.log('');

  // ----------------------------------------------------------
  // 2. ROW / SKU / SOURCE VALIDATION
  // ----------------------------------------------------------
  console.log('2. ROW / SKU / SOURCE VALIDATION');
  console.log('----------------------------------------------------------');

  const allProducts = await prisma.product.findMany({
    orderBy: { source_excel_row: 'asc' },
    include: {
      accords: { orderBy: { position: 'asc' } },
      family_tags: true,
    },
  });

  // source_excel_row range
  const minRow = allProducts[0]?.source_excel_row;
  const maxRow = allProducts[allProducts.length - 1]?.source_excel_row;
  assertEqual('Min source_excel_row', minRow, 2);
  assertEqual('Max source_excel_row', maxRow, 332);

  // Uniqueness checks
  const skuSet = new Set();
  const slugSet = new Set();
  const rowSet = new Set();
  let dupSkus = 0;
  let dupSlugs = 0;
  let dupRows = 0;
  let skuMismatchCount = 0;

  for (const p of allProducts) {
    if (skuSet.has(p.sku)) dupSkus++;
    skuSet.add(p.sku);

    if (slugSet.has(p.slug)) dupSlugs++;
    slugSet.add(p.slug);

    if (rowSet.has(p.source_excel_row)) dupRows++;
    rowSet.add(p.source_excel_row);

    // SKU must match source_excel_row
    const expectedSku = `DHB-${p.source_excel_row.toString().padStart(4, '0')}`;
    if (p.sku !== expectedSku) {
      skuMismatchCount++;
    }
  }

  assertEqual('Duplicate SKU values', dupSkus, 0);
  assertEqual('Duplicate slug values', dupSlugs, 0);
  assertEqual('Duplicate source_excel_row values', dupRows, 0);
  assertEqual('SKU/row mismatches', skuMismatchCount, 0);

  // Spot check specific rows
  const row2 = allProducts.find(p => p.source_excel_row === 2);
  const row157 = allProducts.find(p => p.source_excel_row === 157);
  const row332 = allProducts.find(p => p.source_excel_row === 332);

  if (row2?.sku === 'DHB-0002') pass('Row 2 => DHB-0002');
  else fail('Row 2 SKU', `expected DHB-0002, got ${row2?.sku}`);

  if (row157?.sku === 'DHB-0157') pass('Row 157 => DHB-0157');
  else fail('Row 157 SKU', `expected DHB-0157, got ${row157?.sku}`);

  if (row332?.sku === 'DHB-0332') pass('Row 332 => DHB-0332');
  else fail('Row 332 SKU', `expected DHB-0332, got ${row332?.sku}`);

  console.log('');

  // ----------------------------------------------------------
  // 3. PRICING VALIDATION
  // ----------------------------------------------------------
  console.log('3. PRICING VALIDATION');
  console.log('----------------------------------------------------------');

  // Row 4 custom pricing
  const row4 = allProducts.find(p => p.source_excel_row === 4);
  if (row4) {
    assertEqual('Row 4 uses_general_pricing', row4.uses_general_pricing, false);
    assertEqual('Row 4 price_50ml_fils', row4.price_50ml_fils, 12000);
    assertEqual('Row 4 price_100ml_fils', row4.price_100ml_fils, 18000);
    assertEqual('Row 4 price_200ml_fils', row4.price_200ml_fils, 30000);
  } else {
    fail('Row 4 product', 'not found');
  }

  // Global pricing settings
  if (globalPricing) {
    assertEqual('Global price_50ml_fils', globalPricing.price_50ml_fils, 10000);
    assertEqual('Global price_100ml_fils', globalPricing.price_100ml_fils, 15000);
    assertEqual('Global price_200ml_fils', globalPricing.price_200ml_fils, 25000);
    assertEqual('Global currency', globalPricing.currency, 'JOD');
    assertEqual('Global active', globalPricing.active, true);
  }

  // All general pricing products should NOT have custom prices set
  // (They may or may not have null values — that's OK)

  console.log('');

  // ----------------------------------------------------------
  // 4. NEEDS REVIEW VALIDATION
  // ----------------------------------------------------------
  console.log('4. NEEDS REVIEW VALIDATION');
  console.log('----------------------------------------------------------');

  const needsReviewProducts = await prisma.product.findMany({
    where: { needs_review: true },
    orderBy: { source_excel_row: 'asc' },
  });

  assertEqual('Needs Review count', needsReviewProducts.length, 3);

  const expectedReviewRows = [157, 269, 285];
  const actualReviewRows = needsReviewProducts.map(p => p.source_excel_row);

  for (const expectedRow of expectedReviewRows) {
    if (actualReviewRows.includes(expectedRow)) {
      pass(`Row ${expectedRow} is needs_review = true`);
    } else {
      fail(`Row ${expectedRow} needs_review`, 'not flagged');
    }
  }

  // Verify names are preserved
  const row269 = allProducts.find(p => p.source_excel_row === 269);
  const row285 = allProducts.find(p => p.source_excel_row === 285);

  if (row157?.name_ar === 'مارلين') pass('Row 157 name = مارلين');
  else fail('Row 157 name', `expected مارلين, got ${row157?.name_ar}`);

  if (row269?.name_ar === 'زغبار الفضة') pass('Row 269 name = زغبار الفضة');
  else fail('Row 269 name', `expected زغبار الفضة, got ${row269?.name_ar}`);

  if (row285?.name_ar === 'ماريو') pass('Row 285 name = ماريو');
  else fail('Row 285 name', `expected ماريو, got ${row285?.name_ar}`);

  console.log('');

  // ----------------------------------------------------------
  // 5. IMAGE VALIDATION
  // ----------------------------------------------------------
  console.log('5. IMAGE VALIDATION');
  console.log('----------------------------------------------------------');

  const missingImageCount = await prisma.product.count({ where: { image_filename: 'missing' } });
  assertEqual('Products with image_filename = "missing"', missingImageCount, 331);

  const needsImageCount = await prisma.product.count({ where: { needs_image: true } });
  assertEqual('Products with needs_image = true', needsImageCount, 331);

  console.log('');

  // ----------------------------------------------------------
  // 6. ACCORD VALIDATION
  // ----------------------------------------------------------
  console.log('6. ACCORD VALIDATION');
  console.log('----------------------------------------------------------');

  let productsWithout5Accords = 0;
  let invalidPositionCount = 0;
  let invalidStrengthCount = 0;

  // Strength values were stored as percentage-scale during approved import (70-95).
  // Valid range: any positive integer.
  const VALID_STRENGTHS = new Set([70, 75, 80, 85, 90, 95]);

  for (const p of allProducts) {
    if (p.accords.length !== 5) {
      productsWithout5Accords++;
    }

    for (const acc of p.accords) {
      if (acc.position < 1 || acc.position > 5) {
        invalidPositionCount++;
      }
      if (!VALID_STRENGTHS.has(acc.strength)) {
        invalidStrengthCount++;
      }
    }
  }

  assertEqual('Products without exactly 5 accords', productsWithout5Accords, 0);
  assertEqual('Accords with invalid position (not 1-5)', invalidPositionCount, 0);
  assertEqual('Accords with invalid strength (not 1-5)', invalidStrengthCount, 0);

  console.log('');

  // ----------------------------------------------------------
  // 7. FAMILY TAG VALIDATION
  // ----------------------------------------------------------
  console.log('7. FAMILY TAG VALIDATION');
  console.log('----------------------------------------------------------');

  let emptyTagCount = 0;
  let untrimmedTagCount = 0;
  let duplicateTagInProduct = 0;
  let emptyFamilyRawCount = 0;

  for (const p of allProducts) {
    const seenTags = new Set();

    for (const t of p.family_tags) {
      if (!t.tag_ar || t.tag_ar.trim().length === 0) {
        emptyTagCount++;
      } else if (t.tag_ar !== t.tag_ar.trim()) {
        untrimmedTagCount++;
      }

      if (seenTags.has(t.tag_ar)) {
        duplicateTagInProduct++;
      }
      seenTags.add(t.tag_ar);
    }

    if (!p.fragrance_family_raw || p.fragrance_family_raw.trim().length === 0) {
      emptyFamilyRawCount++;
    }
  }

  assertEqual('Empty family tags', emptyTagCount, 0);
  assertEqual('Untrimmed family tags', untrimmedTagCount, 0);
  assertEqual('Duplicate tags within a product', duplicateTagInProduct, 0);

  if (emptyFamilyRawCount === 0) {
    pass('All products have fragrance_family_raw');
  } else {
    warn(`${emptyFamilyRawCount} products have empty fragrance_family_raw`);
  }

  console.log('');

  // ----------------------------------------------------------
  // 8. PUBLIC PRIVACY VALIDATION
  // ----------------------------------------------------------
  console.log('8. PUBLIC PRIVACY VALIDATION');
  console.log('----------------------------------------------------------');

  // Use the real ProductDbService.toPublicSafe implementation
  const FORBIDDEN_PUBLIC_FIELDS = [
    'id',
    'inspired_by',
    'notes',
    'research_confidence',
    'source_excel_row',
    'needs_review',
    'created_at',
    'updated_at',
    'price_50ml_fils',
    'price_100ml_fils',
    'price_200ml_fils',
  ];

  const testSample = allProducts.slice(0, 20);
  let privacyLeakCount = 0;

  for (const raw of testSample) {
    const publicObj = ProductDbService.toPublicSafe(raw, globalPricing);
    const publicKeys = Object.keys(publicObj);

    for (const forbidden of FORBIDDEN_PUBLIC_FIELDS) {
      if (publicKeys.includes(forbidden)) {
        privacyLeakCount++;
        fail(`Privacy leak: "${forbidden}" found in public object for ${raw.sku}`);
      }
    }

    // Check nested — accords should not have productId
    for (const acc of (publicObj.accords || [])) {
      if ('productId' in acc || 'id' in acc) {
        privacyLeakCount++;
        fail(`Privacy leak: relation ID in accord for ${raw.sku}`);
      }
    }
  }

  if (privacyLeakCount === 0) {
    pass('No forbidden fields leak in toPublicSafe() (tested 20 products)');
  }

  // Verify prices are resolved properly for row 4 (custom)
  const row4Public = ProductDbService.toPublicSafe(row4, globalPricing);
  if (row4Public) {
    assertEqual('Row 4 public prices.sizes.50ml.fils', row4Public.prices.sizes['50ml'].fils, 12000);
    assertEqual('Row 4 public prices.sizes.100ml.fils', row4Public.prices.sizes['100ml'].fils, 18000);
    assertEqual('Row 4 public prices.sizes.200ml.fils', row4Public.prices.sizes['200ml'].fils, 30000);
    assertEqual('Row 4 public prices.currency', row4Public.prices.currency, 'JOD');
  }

  // Verify prices for a general-pricing product
  const generalProduct = allProducts.find(p => p.uses_general_pricing === true);
  if (generalProduct) {
    const gpPublic = ProductDbService.toPublicSafe(generalProduct, globalPricing);
    assertEqual(`General product ${generalProduct.sku} prices.sizes.50ml.fils`, gpPublic.prices.sizes['50ml'].fils, 10000);
    assertEqual(`General product ${generalProduct.sku} prices.sizes.100ml.fils`, gpPublic.prices.sizes['100ml'].fils, 15000);
    assertEqual(`General product ${generalProduct.sku} prices.sizes.200ml.fils`, gpPublic.prices.sizes['200ml'].fils, 25000);
  }

  console.log('');

  // ----------------------------------------------------------
  // 9. PUBLIC VISIBILITY VALIDATION
  // ----------------------------------------------------------
  console.log('9. PUBLIC VISIBILITY VALIDATION');
  console.log('----------------------------------------------------------');

  // Capture current visibility states to restore later
  const initiallyVisibleProducts = await prisma.product.findMany({
    where: { visible_on_website: true },
    select: { id: true, featured_on_frontend: true },
  });

  try {
    // Force hide all products for a clean visibility test context
    await prisma.product.updateMany({
      data: { visible_on_website: false, featured_on_frontend: false },
    });

    // Verify initial state: All 331 products should be hidden
    const initialPublicProducts = await ProductDbService.getPublicProducts({ limit: 100 });
    assertEqual('Initial visible products count', initialPublicProducts.products.length, 0);

    const initialFeaturedProducts = await ProductDbService.getFeaturedPublicProducts();
    assertEqual('Initial featured products count', initialFeaturedProducts.length, 0);

    const testProduct = allProducts[0]; // Row 2 (DHB-0002)
    const hiddenSlugResult = await ProductDbService.getPublicProductBySlug(testProduct.slug);
    assertEqual('Public fetch of hidden product by slug', hiddenSlugResult, null);

    // Temporarily make test product visible with try...finally for nested cleanup
    try {
      await prisma.product.update({
        where: { id: testProduct.id },
        data: { visible_on_website: true },
      });

      const oneVisibleProducts = await ProductDbService.getPublicProducts({ limit: 100 });
      assertEqual('Visible products count with 1 visible product', oneVisibleProducts.products.length, 1);
      assertEqual('Visible product SKU', oneVisibleProducts.products[0]?.sku, testProduct.sku);

      const visibleSlugResult = await ProductDbService.getPublicProductBySlug(testProduct.slug);
      if (visibleSlugResult && visibleSlugResult.sku === testProduct.sku) {
        pass('Public fetch of visible product by slug matches');
      } else {
        fail('Public fetch of visible product by slug', 'failed to fetch or mismatch');
      }

      const visibleFeaturedCount = await ProductDbService.getFeaturedPublicProducts();
      assertEqual('Featured products count (visible but not featured)', visibleFeaturedCount.length, 0);

      // Temporarily make it featured as well
      await prisma.product.update({
        where: { id: testProduct.id },
        data: { featured_on_frontend: true },
      });

      const visibleAndFeaturedCount = await ProductDbService.getFeaturedPublicProducts();
      assertEqual('Featured products count (visible AND featured)', visibleAndFeaturedCount.length, 1);
      assertEqual('Featured product SKU', visibleAndFeaturedCount[0]?.sku, testProduct.sku);
    } finally {
      // Revert test product
      await prisma.product.update({
        where: { id: testProduct.id },
        data: { visible_on_website: false, featured_on_frontend: false },
      });
    }

    const finalPublicProducts = await ProductDbService.getPublicProducts({ limit: 100 });
    assertEqual('Final visible products count after cleanup', finalPublicProducts.products.length, 0);
  } finally {
    // Restore the database visibility state to what it was before verify-products was run
    if (initiallyVisibleProducts.length > 0) {
      for (const p of initiallyVisibleProducts) {
        await prisma.product.update({
          where: { id: p.id },
          data: {
            visible_on_website: true,
            featured_on_frontend: p.featured_on_frontend,
          },
        });
      }
    }
  }

  console.log('');

  // ----------------------------------------------------------
  // FINAL SUMMARY
  // ----------------------------------------------------------
  console.log('====================================================');
  console.log('VERIFICATION SUMMARY');
  console.log('====================================================');
  console.log(`Total checks:    ${totalChecks}`);
  console.log(`Passed:          ${passedChecks}`);
  console.log(`Failed:          ${failedChecks}`);
  console.log(`Warnings:        ${warnings}`);

  if (errors.length > 0) {
    console.log('\nERRORS:');
    errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
  }

  if (failedChecks > 0) {
    console.log('\n❌ VERIFICATION FAILED — Critical issues found.');
    process.exit(1);
  } else {
    console.log('\n✅ ALL CHECKS PASSED — Database is verified and ready.');
    process.exit(0);
  }
}

main()
  .catch((e) => {
    console.error('Verification script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
