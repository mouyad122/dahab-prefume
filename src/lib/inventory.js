export const DEFAULT_LOW_STOCK_THRESHOLD_ML = 300;

export function parseVolumeMl(volume, fallback = 100) {
  const value = parseFloat(String(volume ?? '').replace(/ml/gi, '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function getLowStockThresholdMl(product) {
  const threshold = Number(product?.low_stock_threshold);
  return Number.isFinite(threshold) && threshold > 0 ? threshold : DEFAULT_LOW_STOCK_THRESHOLD_ML;
}

export function getBulkStockMl(product) {
  const stock = Number(product?.bulk_stock_ml);
  return Number.isFinite(stock) && stock > 0 ? stock : 0;
}

export function getSellableUnitsForVariant(product, variant) {
  if (!product || !variant) return 0;
  if (product.inventory_mode === 'FORMULA_BASED') return Number.POSITIVE_INFINITY;
  if (product.inventory_mode === 'BULK_LIQUID') {
    return Math.floor(getBulkStockMl(product) / parseVolumeMl(variant.volume));
  }
  return Math.max(0, Number(variant.stock) || 0);
}

export function getTotalSellableUnits(product) {
  if (!product) return 0;
  if (product.inventory_mode === 'BULK_LIQUID') {
    return getBulkStockMl(product);
  }
  if (product.inventory_mode === 'FORMULA_BASED') return Number.POSITIVE_INFINITY;
  return (product.variants || []).reduce((sum, variant) => sum + Math.max(0, Number(variant.stock) || 0), 0);
}

export function isLowStockProduct(product) {
  if (!product) return true;
  if (product.inventory_mode === 'BULK_LIQUID') {
    const stock = getBulkStockMl(product);
    return stock > 0 && stock <= getLowStockThresholdMl(product);
  }
  return (product.variants || []).some((variant) => (Number(variant.stock) || 0) <= getLowStockThresholdMl(product));
}

export function formatMl(ml) {
  const value = Number(ml) || 0;
  if (value >= 1000) return `${(value / 1000).toFixed(2)} لتر`;
  return `${Math.round(value)} مل`;
}
