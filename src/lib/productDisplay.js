import { getBulkStockMl, getSellableUnitsForVariant } from './inventory';

const FALLBACK_PRODUCT_IMAGE = '/hero-bottle.png';

export function getProductImageSrc(productOrPath, fallback = FALLBACK_PRODUCT_IMAGE) {
  const raw =
    typeof productOrPath === 'string'
      ? productOrPath
      : productOrPath?.image_url || productOrPath?.thumbnail || productOrPath?.image_name;

  const value = String(raw || '').trim();
  if (!value || value === 'missing' || value.includes('placeholder-dahab')) {
    return fallback;
  }

  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) {
    return value;
  }

  if (value.startsWith('/')) {
    return value;
  }

  if (value.startsWith('products/') || value.startsWith('uploads/')) {
    return `/${value}`;
  }

  return `/products/${value}`;
}

export function getSortedVariants(product) {
  return [...(product?.variants || [])].sort((a, b) => {
    const av = parseInt(String(a.volume || '').replace(/\D/g, ''), 10) || 0;
    const bv = parseInt(String(b.volume || '').replace(/\D/g, ''), 10) || 0;
    return av - bv;
  });
}

export function getDefaultVariant(product) {
  const variants = getSortedVariants(product);
  return variants.find((variant) => Number(variant.price) > 0) || variants[0] || null;
}

export function getTotalStock(product) {
  if (product?.inventory_mode === 'FORMULA_BASED') {
    return 999; // Treat formula-based products as always available on storefront
  }
  if (product?.inventory_mode === 'BULK_LIQUID') {
    return Math.floor(getBulkStockMl(product));
  }

  const directStock = Number(product?.stock);
  if (Number.isFinite(directStock) && directStock > 0) {
    return directStock;
  }

  return (product?.variants || []).reduce((sum, variant) => {
    const stock = Number(variant.stock);
    return sum + (Number.isFinite(stock) && stock > 0 ? stock : 0);
  }, 0);
}

export function getPriceJod(product, variant = getDefaultVariant(product)) {
  const directPrice = Number(product?.price);
  if (Number.isFinite(directPrice) && directPrice > 0) {
    return directPrice > 100 ? directPrice / 1000 : directPrice;
  }

  const variantPrice = Number(variant?.price);
  return Number.isFinite(variantPrice) && variantPrice > 0 ? variantPrice / 1000 : 0;
}

export function buildCartProduct(product, variant = getDefaultVariant(product)) {
  const volume = variant?.volume || product?.volume || '100ml';
  let stock = Number(variant?.stock ?? product?.stock);
  if (product?.inventory_mode === 'BULK_LIQUID') {
    stock = getSellableUnitsForVariant(product, { ...variant, volume });
  } else if (product?.inventory_mode === 'FORMULA_BASED') {
    stock = 999;
  }
  const normalizedStock = Number.isFinite(stock) && stock > 0 ? stock : null;

  return {
    ...product,
    id: variant?.id ? `${product.id}-${variant.id}` : `${product.id}-${volume}`,
    productId: product.id,
    volume,
    price: getPriceJod(product, variant),
    stock: normalizedStock,
    thumbnail: getProductImageSrc(product),
    title: product.title || product.name_ar || product.name_en,
    title_ar: product.title_ar || product.name_ar,
    title_en: product.title_en || product.name_en,
  };
}
