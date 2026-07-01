import { ProductDbService } from '../src/services/ProductDbService.js';

async function test() {
  console.log('--- Database Service Verification Test ---');

  // 1. Get visible products
  const visibleProds = await ProductDbService.getVisibleProducts();
  console.log(`Total visible products returned in public safe mode: ${visibleProds.length}`);
  
  if (visibleProds.length > 0) {
    const first = visibleProds[0];
    console.log('Sample public product keys:', Object.keys(first));
    console.log(`  Should NOT contain inspired_by: ${!('inspired_by' in first)}`);
    console.log(`  Should NOT contain needs_review: ${!('needs_review' in first)}`);
    console.log(`  Should NOT contain research_confidence: ${!('research_confidence' in first)}`);
    console.log(`  Should NOT contain source_excel_row: ${!('source_excel_row' in first)}`);
  }

  // 2. Query Row 4 (عود ملكي) custom pricing
  const row4Slug = 'عود-ملكي';
  const row4Public = await ProductDbService.getProductBySlug(row4Slug, false);
  const row4Admin = await ProductDbService.getProductBySlug(row4Slug, true);

  if (row4Public && row4Admin) {
    console.log(`\nRow 4 (عود ملكي) Public details:`);
    console.log(`  Uses General Pricing: ${row4Public.uses_general_pricing}`);
    console.log(`  Price 50ml (fils):   ${row4Public.price_50ml_fils}`);
    console.log(`  Price 100ml (fils):  ${row4Public.price_100ml_fils}`);
    console.log(`  Price 200ml (fils):  ${row4Public.price_200ml_fils}`);
    console.log(`  Has inspired_by?     ${'inspired_by' in row4Public}`);

    console.log(`\nRow 4 (عود ملكي) Admin details:`);
    console.log(`  Has inspired_by?     ${'inspired_by' in row4Admin} (Value: '${row4Admin.inspired_by}')`);
    console.log(`  Research confidence: ${row4Admin.research_confidence}`);
    console.log(`  Excel Row number:    ${row4Admin.source_excel_row}`);
  } else {
    console.log('ERROR: Could not fetch row 4 (عود ملكي) by slug.');
  }

  // 3. Search check
  const searchResultPublic = await ProductDbService.searchProducts('سوفاج', false);
  const searchResultAdmin = await ProductDbService.searchProducts('Sauvage', true);
  console.log(`\nSearch 'سوفاج' Public Count: ${searchResultPublic.length}`);
  console.log(`Search 'Sauvage' Admin Count:  ${searchResultAdmin.length}`);

  // 4. Accords check
  const filteredGenders = await ProductDbService.getVisibleProducts({ gender: 'رجالي' });
  console.log(`Filtered Gender 'رجالي' Count: ${filteredGenders.length}`);
}

test()
  .catch(console.error)
  .finally(() => process.exit(0));
