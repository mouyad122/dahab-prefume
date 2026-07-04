import { prisma } from '../config/prisma.js';

/**
 * ProductDbService — Data access layer for DAHAB PERFUMES.
 *
 * Provides strict public/admin separation:
 * - PUBLIC methods: Return only public-safe product objects.
 *   Never expose inspired_by, notes, research_confidence,
 *   source_excel_row, needs_review, id, created_at, updated_at,
 *   or raw price fields.
 * - ADMIN methods: Return full internal product data.
 *   These must ONLY be called from protected admin logic.
 *
 * TODO: Admin methods must be gated behind authentication/authorization
 *       when admin routes are implemented.
 */
export class ProductDbService {

  // ============================================================
  // INTERNAL HELPERS
  // ============================================================

  /**
   * Standard Prisma include for product relations.
   */
  static _includeRelations() {
    return {
      accords: { orderBy: { position: 'asc' } },
      family_tags: true,
      variants: true,
    };
  }

  /**
   * Resolve the final prices for a product.
   * Dynamically maps variants into the sizes structure.
   *
   * @param {Object} product - Raw Prisma product row with variants.
   * @returns {{ currency: string, sizes: Object }}
   */
  static _resolveProductPrices(product) {
    const currency = 'JOD';
    const sizes = {};

    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        const key = `${variant.volume}ml`;
        sizes[key] = {
          fils: variant.price,
          jod: variant.price / 1000,
          stock: variant.stock,
          id: variant.id
        };
      }
    }

    return {
      currency,
      sizes,
    };
  }

  /**
   * Map a raw Prisma product to a public-safe structure.
   *
   * FORBIDDEN public fields (never leaked):
   *   id, inspired_by, notes, research_confidence,
   *   source_excel_row, needs_review, created_at, updated_at
   *
   * @param {Object} product - Raw Prisma product with relations.
   * @param {Object|null} globalPricing - Deprecated parameter (kept for compat).
   * @returns {Object} Public-safe product object.
   */
  static toPublicSafe(product, globalPricing = null) {
    if (!product) return null;

    const prices = this._resolveProductPrices(product);

    return {
      sku: product.sku,
      slug: product.slug,
      name_ar: product.name_ar,
      main_category: product.main_category,
      gender: product.gender,
      season: product.season,
      fragrance_family: product.fragrance_family,
      family_tags: (product.family_tags || []).map(t => t.tag_ar),
      accords: (product.accords || []).map(a => ({
        position: a.position,
        name_ar: a.name_ar,
        strength: a.strength,
      })),
      short_description: product.short_description,
      keywords: product.keywords,
      image_name: product.image_name,
      needs_image: product.needs_image,
      visible: product.visible,
      featured: product.featured,
      prices,
    };
  }

  /**
   * Parse and validate sort parameter.
   * Only allowlisted sort values are accepted.
   * @param {string|null} sortParam
   * @returns {{ field: string, direction: string }}
   */
  static _parseSort(sortParam) {
    const ALLOWED_SORTS = {
      'name_asc': { field: 'name_ar', direction: 'asc' },
      'name_desc': { field: 'name_ar', direction: 'desc' },
      'sku_asc': { field: 'sku', direction: 'asc' },
      'sku_desc': { field: 'sku', direction: 'desc' },
      'newest': { field: 'created_at', direction: 'desc' },
      'oldest': { field: 'created_at', direction: 'asc' },
    };
    return ALLOWED_SORTS[sortParam] || { field: 'sku', direction: 'asc' };
  }

  // ============================================================
  // PUBLIC METHODS — Return public-safe objects only
  // ============================================================

  /**
   * Get paginated, filtered, sorted public products.
   * Only returns visible = true.
   *
   * @param {Object} options
   * @param {number} [options.page=1]
   * @param {number} [options.limit=24] - Max 100
   * @param {string} [options.q] - Search query (max 200 chars)
   * @param {string} [options.main_category]
   * @param {string} [options.gender]
   * @param {string} [options.season]
   * @param {string} [options.family_tag]
   * @param {boolean} [options.featured]
   * @param {string} [options.sort]
   * @returns {{ products: Object[], total: number, page: number, totalPages: number }}
   */
  static async getPublicProducts(options = {}) {
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(options.limit) || 24));
    const skip = (page - 1) * limit;
    const sort = this._parseSort(options.sort);

    const where = { visible: true };

    // Search query
    if (options.q && typeof options.q === 'string') {
      const q = options.q.trim().slice(0, 200);
      if (q.length > 0) {
        where.OR = [
          { name_ar: { contains: q } },
          { keywords: { contains: q } },
        ];
      }
    }

    // Filters
    if (options.main_category) where.main_category = String(options.main_category).trim();
    if (options.gender) where.gender = String(options.gender).trim();
    if (options.season) where.season = String(options.season).trim();

    if (options.family_tag) {
      where.family_tags = {
        some: { tag_ar: String(options.family_tag).trim() },
      };
    }

    if (options.featured === true || options.featured === 'true') {
      where.featured = true;
    }

    const globalPricing = await prisma.globalPricingSettings.findFirst({
      where: { active: true },
    });

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: this._includeRelations(),
        orderBy: { [sort.field]: sort.direction },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products.map(p => this.toPublicSafe(p, globalPricing)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a single public product by slug.
   * Returns null if not found or not visible.
   *
   * @param {string} slug
   * @returns {Object|null} Public-safe product or null.
   */
  static async getPublicProductBySlug(slug) {
    if (!slug || typeof slug !== 'string') return null;

    const product = await prisma.product.findUnique({
      where: { slug: slug.trim() },
      include: this._includeRelations(),
    });

    if (!product || !product.visible) return null;

    const globalPricing = await prisma.globalPricingSettings.findFirst({
      where: { active: true },
    });

    return this.toPublicSafe(product, globalPricing);
  }

  /**
   * Get featured public products.
   * Only returns visible + featured.
   *
   * @param {number} [limit=12] - Max 50.
   * @returns {Object[]} Array of public-safe products.
   */
  static async getFeaturedPublicProducts(limit = 12) {
    const safeLimit = Math.min(50, Math.max(1, parseInt(limit) || 12));

    const globalPricing = await prisma.globalPricingSettings.findFirst({
      where: { active: true },
    });

    const products = await prisma.product.findMany({
      where: {
        visible: true,
        featured: true,
      },
      include: this._includeRelations(),
      orderBy: { sku: 'asc' },
      take: safeLimit,
    });

    return products.map(p => this.toPublicSafe(p, globalPricing));
  }

  /**
   * Search public products by name or keywords.
   * Only returns visible = true.
   *
   * @param {string} query - Search text (max 200 chars).
   * @param {Object} [options] - Pagination options.
   * @returns {{ products: Object[], total: number, page: number, totalPages: number }}
   */
  static async searchPublicProducts(query, options = {}) {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return { products: [], total: 0, page: 1, totalPages: 0 };
    }
    return this.getPublicProducts({ ...options, q: query });
  }

  /**
   * Get distinct filter values from visible products.
   *
   * @returns {{ main_categories: string[], genders: string[], seasons: string[], family_tags: string[] }}
   */
  static async getPublicFilters() {
    const visibleProducts = await prisma.product.findMany({
      where: { visible: true },
      select: {
        main_category: true,
        gender: true,
        season: true,
        family_tags: { select: { tag_ar: true } },
      },
    });

    const categories = new Set();
    const genders = new Set();
    const seasons = new Set();
    const tags = new Set();

    for (const p of visibleProducts) {
      if (p.main_category) categories.add(p.main_category);
      if (p.gender) genders.add(p.gender);
      if (p.season) seasons.add(p.season);
      for (const t of p.family_tags) {
        if (t.tag_ar) tags.add(t.tag_ar);
      }
    }

    return {
      main_categories: [...categories].sort(),
      genders: [...genders].sort(),
      seasons: [...seasons].sort(),
      family_tags: [...tags].sort(),
    };
  }

  /**
   * Get Global Pricing Settings (public — no internal fields).
   *
   * @returns {{ currency: string, sizes: Object }|null}
   */
  static async getGlobalPricing() {
    const gp = await prisma.globalPricingSettings.findFirst({
      where: { active: true },
    });
    if (!gp) return null;
    return {
      currency: gp.currency,
      sizes: {
        '50ml': { fils: gp.price_50ml_fils, jod: gp.price_50ml_fils / 1000 },
        '100ml': { fils: gp.price_100ml_fils, jod: gp.price_100ml_fils / 1000 },
        '200ml': { fils: gp.price_200ml_fils, jod: gp.price_200ml_fils / 1000 },
      },
    };
  }

  // ============================================================
  // ADMIN-SAFE METHODS — Service layer only
  // Must be gated behind auth when admin routes are built.
  // TODO: Add authentication/authorization middleware before
  //       exposing these through admin API routes.
  // ============================================================

  /**
   * Admin: Get paginated products with full internal data.
   *
   * @param {Object} options
   * @param {number} [options.page=1]
   * @param {number} [options.limit=50]
   * @param {boolean} [options.needsReview]
   * @param {boolean} [options.needsImage]
   * @returns {{ products: Object[], total: number, page: number, totalPages: number }}
   */
  static async getAdminProducts(options = {}) {
    const { needsReview, needsImage, limit = 50, page = 1 } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (needsReview !== undefined) where.needs_review = needsReview;
    if (needsImage !== undefined) where.needs_image = needsImage;

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: this._includeRelations(),
        orderBy: { source_excel_row: 'asc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Admin: Get a single product by internal ID with full data.
   *
   * @param {string} id - Product UUID.
   * @returns {Object|null}
   */
  static async getAdminProductById(id) {
    if (!id) return null;
    return prisma.product.findUnique({
      where: { id },
      include: this._includeRelations(),
    });
  }

  /**
   * Admin: Get a single product by slug with full internal data.
   *
   * @param {string} slug
   * @returns {Object|null}
   */
  static async getAdminProductBySlug(slug) {
    if (!slug) return null;
    return prisma.product.findUnique({
      where: { slug },
      include: this._includeRelations(),
    });
  }

  /**
   * Admin: Get all products flagged needs_review = true.
   *
   * @returns {Object[]}
   */
  static async getAdminNeedsReviewProducts() {
    return prisma.product.findMany({
      where: { needs_review: true },
      include: this._includeRelations(),
      orderBy: { source_excel_row: 'asc' },
    });
  }

  /**
   * Admin: Get all products with missing images.
   *
   * @returns {Object[]}
   */
  static async getAdminProductsMissingImages() {
    return prisma.product.findMany({
      where: { needs_image: true },
      include: this._includeRelations(),
      orderBy: { source_excel_row: 'asc' },
    });
  }

  /**
   * Admin: Update product metadata.
   * TODO: Gate behind admin auth middleware.
   *
   * @param {string} id
   * @param {Object} data
   * @returns {Object} Updated product.
   */
  static async adminUpdateProduct(id, data) {
    const { visible, featured, image_name, needs_review } = data;

    const updateData = {};
    if (visible !== undefined) updateData.visible = visible;
    if (featured !== undefined) updateData.featured = featured;
    if (needs_review !== undefined) updateData.needs_review = needs_review;

    if (image_name !== undefined) {
      updateData.image_name = image_name;
      updateData.needs_image = image_name === 'missing';
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Admin: Update Global Pricing Settings.
   * TODO: Gate behind admin auth middleware.
   *
   * @param {Object} data
   * @returns {Object} Updated pricing settings.
   */
  static async adminUpdateGlobalPricing(data) {
    const activePricing = await prisma.globalPricingSettings.findFirst({
      where: { active: true },
    });

    if (activePricing) {
      return prisma.globalPricingSettings.update({
        where: { id: activePricing.id },
        data,
      });
    } else {
      return prisma.globalPricingSettings.create({
        data: { ...data, active: true },
      });
    }
  }
}
