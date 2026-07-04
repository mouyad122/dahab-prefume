export const ALLOWED_CATEGORY_SLUGS = ['men', 'women', 'oud'];
export const ALLOWED_SEASON_SLUGS = ['summer', 'winter', 'both'];

export const CATEGORY_OPTIONS = [
  { slug: 'men', name_ar: 'رجالي', name_en: 'Men' },
  { slug: 'women', name_ar: 'نسائي', name_en: 'Women' },
  { slug: 'oud', name_ar: 'عود', name_en: 'Oud' },
];

export const SEASON_OPTIONS = [
  { slug: 'summer', name_ar: 'صيفي', name_en: 'Summer' },
  { slug: 'winter', name_ar: 'شتوي', name_en: 'Winter' },
  { slug: 'both', name_ar: 'كلا الفصلين', name_en: 'Both seasons' },
];

const categoryLookup = new Map([
  ...CATEGORY_OPTIONS.map((option) => [option.slug, option]),
  ...CATEGORY_OPTIONS.map((option) => [option.name_ar, option]),
  ['male', CATEGORY_OPTIONS[0]],
  ['men perfumes', CATEGORY_OPTIONS[0]],
  ['female', CATEGORY_OPTIONS[1]],
  ['women perfumes', CATEGORY_OPTIONS[1]],
]);

const seasonLookup = new Map([
  ...SEASON_OPTIONS.map((option) => [option.slug, option]),
  ...SEASON_OPTIONS.map((option) => [option.name_ar, option]),
  ['all', SEASON_OPTIONS[2]],
  ['كل المواسم', SEASON_OPTIONS[2]],
  ['جميع المواسم', SEASON_OPTIONS[2]],
]);

function normalizeKey(value) {
  return String(value || '').trim().toLowerCase();
}

export function normalizeCategory(value) {
  return categoryLookup.get(normalizeKey(value)) || null;
}

export function normalizeSeason(value) {
  return seasonLookup.get(normalizeKey(value)) || null;
}

export function getCategoryLabel(productOrSlug, language = 'ar') {
  const value = typeof productOrSlug === 'string'
    ? productOrSlug
    : productOrSlug?.category_slug || productOrSlug?.category?.slug || productOrSlug?.main_category;
  const category = normalizeCategory(value);
  return category ? (language === 'ar' ? category.name_ar : category.name_en) : '';
}

export function getSeasonLabel(productOrSlug, language = 'ar') {
  const value = typeof productOrSlug === 'string'
    ? productOrSlug
    : productOrSlug?.season_slug || productOrSlug?.season;
  const season = normalizeSeason(value);
  return season ? (language === 'ar' ? season.name_ar : season.name_en) : '';
}

export function isAllowedCategorySlug(slug) {
  return ALLOWED_CATEGORY_SLUGS.includes(String(slug || '').trim().toLowerCase());
}

export function isAllowedSeasonSlug(slug) {
  return ALLOWED_SEASON_SLUGS.includes(String(slug || '').trim().toLowerCase());
}
