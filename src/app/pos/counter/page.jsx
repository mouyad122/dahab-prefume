'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlass, Plus, Minus, X, CheckCircle, Printer, ArrowRight, Receipt, Package, ShoppingCart } from '@phosphor-icons/react';
import { usePosContext } from '../../../contexts/PosContext';
import LuxuryButton from '../../../components/ui/LuxuryButton';

export default function PosCounter() {
  const { employee } = usePosContext();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [saleNote, setSaleNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastInvoice, setLastInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'cart'

  const [selectedProductForSize, setSelectedProductForSize] = useState(null);

  // Focus ref for search
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?limit=100');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    (p.name_ar && p.name_ar.includes(searchQuery)) ||
    (p.name_en && p.name_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatJOD = (fils) => `${(fils / 1000).toFixed(3)} JOD`;

  const addToCart = (product, sizeObj = null) => {
    const vars = product.variants || [];
    if (vars.length === 0) {
      alert('هذا المنتج لا يحتوي على أحجام للبيع');
      return;
    }
    
    // If no size is pre-selected and there are multiple sizes, open the size selection modal
    if (!sizeObj && vars.length > 1) {
      setSelectedProductForSize(product);
      return;
    }
    
    // Use the single variant or the selected variant
    const variant = sizeObj || vars[0];
    
    if (variant.stock <= 0) {
      alert('عذراً، هذا الحجم نفذت كميته من المخزن');
      return;
    }
    
    const cartItemId = `${product.id}-${variant.volume}`;
    const volLabel = `${variant.volume}ml`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        if (existing.quantity >= variant.stock) {
          alert('لا يمكن إضافة كمية أكبر من المخزون المتوفر');
          return prev;
        }
        return prev.map(item => 
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1, subtotal_fils: (item.quantity + 1) * item.price_fils }
            : item
        );
      }
      return [...prev, {
        id: cartItemId,
        productId: product.id,
        name_ar: `${product.name_ar} (${volLabel})`,
        name_en: product.name_en ? `${product.name_en} (${volLabel})` : null,
        sku: product.sku,
        price_fils: variant.price,
        quantity: 1,
        volume: volLabel,
        subtotal_fils: variant.price
      }];
    });
    
    setSelectedProductForSize(null);
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const product = products.find(p => p.id === item.productId);
        const variant = product?.variants?.find(v => `${v.volume}ml` === item.volume);
        const maxStock = variant ? variant.stock : 999;
        
        const newQty = item.quantity + delta;
        if (newQty <= 0) return item;
        if (newQty > maxStock) {
          alert('لا يمكن إضافة كمية أكبر من المخزون المتوفر');
          return item;
        }
        return { ...item, quantity: newQty, subtotal_fils: newQty * item.price_fils };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const subtotal_fils = cartItems.reduce((acc, item) => acc + item.subtotal_fils, 0);
  const total_fils = subtotal_fils;
  const amountReceived_fils = amountReceived === '' ? total_fils : Math.round(parseFloat(amountReceived) * 1000);
  const change_fils = amountReceived_fils - total_fils;

  const canComplete = cartItems.length > 0 && 
    (paymentMethod === 'card' || (paymentMethod === 'cash' && change_fils >= 0));

  const handleCompleteSale = async () => {
    if (!canComplete || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        items: cartItems.map(i => ({
          productId: i.productId,
          product_name_ar: i.name_ar,
          product_name_en: i.name_en,
          product_sku: i.sku,
          quantity: i.quantity,
          unit_price: i.price_fils,
          total_price: i.subtotal_fils,
          volume: i.volume
        })),
        subtotal: subtotal_fils,
        discount_total: 0,
        total: total_fils,
        amount_received: paymentMethod === 'cash' ? amountReceived_fils : total_fils,
        payment_method: paymentMethod,
        notes: saleNote
      };

      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setLastInvoice(data.sale);
        
        // Update local stock immediately for UI feeling
        setProducts(prev => prev.map(p => {
          const itemsForProduct = cartItems.filter(ci => ci.productId === p.id);
          if (itemsForProduct.length > 0) {
            return {
              ...p,
              variants: p.variants.map(v => {
                const cartItem = itemsForProduct.find(ci => ci.volume === `${v.volume}ml`);
                if (cartItem) {
                  return { ...v, stock: Math.max(0, v.stock - cartItem.quantity) };
                }
                return v;
              })
            };
          }
          return p;
        }));

        // Reset form
        setCartItems([]);
        setAmountReceived('');
        setSaleNote('');
        setSearchQuery('');
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`حدث خطأ أثناء حفظ الفاتورة: ${err.error || err.message || res.statusText || 'خطأ غير معروف'}`);
      }
    } catch (e) {
      alert(`خطأ في الاتصال بالخادم: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const printInvoice = () => {
    window.print();
  };

  const resetNewSale = () => {
    setLastInvoice(null);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  // SUCCESS SCREEN
  if (lastInvoice) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--color-bg-primary)] dir-ar h-full overflow-auto">
        <div className="glass-card p-10 max-w-lg w-full text-center border border-[var(--color-border-strong)]">
          <CheckCircle size={64} className="text-[#5ddb85] mx-auto mb-4" weight="fill" />
          <h2 className="text-2xl font-display font-bold text-[var(--color-text-primary)] mb-2">
            تمت عملية البيع بنجاح
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6 font-mono text-lg">
            {lastInvoice.invoice_number}
          </p>
          
          <div className="bg-[var(--color-bg-surface)] rounded-md p-4 mb-8 text-right border border-[var(--color-border-subtle)]">
            <div className="flex justify-between mb-2">
              <span className="text-[var(--color-text-muted)]">الإجمالي:</span>
              <span className="font-bold text-[var(--color-gold-light)]">{formatJOD(lastInvoice.total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[var(--color-text-muted)]">طريقة الدفع:</span>
              <span>{lastInvoice.payment_method === 'cash' ? 'نقدي' : 'بطاقة'}</span>
            </div>
            {lastInvoice.payment_method === 'cash' && (
              <div className="flex justify-between pt-2 border-t border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">الباقي للعميل:</span>
                <span className="font-bold text-[#5ddb85]">
                  {formatJOD((lastInvoice.amount_received || lastInvoice.total) - lastInvoice.total)}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <LuxuryButton onClick={printInvoice} variant="secondary" className="flex-1" iconLeft={Printer}>
              طباعة الفاتورة
            </LuxuryButton>
            <LuxuryButton onClick={resetNewSale} variant="primary" className="flex-1" iconRight={ArrowRight}>
              فاتورة جديدة
            </LuxuryButton>
          </div>
        </div>

        {/* Hidden Print Layout */}
        <div className="hidden print-only print-receipt" dir="rtl">
          <div className="print-header">
            <h1>DAHAB PERFUMES</h1>
            <p>فاتورة مبيعات - رقم {lastInvoice.invoice_number}</p>
            <p>التاريخ: {new Date(lastInvoice.created_at).toLocaleString('ar-JO')}</p>
            <p>الموظف: {employee?.display_name || ''}</p>
          </div>
          
          <table className="print-table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              {lastInvoice.items?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.product_name_ar}</td>
                  <td>{item.quantity}</td>
                  <td>{formatJOD(item.unit_price)}</td>
                  <td>{formatJOD(item.total_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="print-summary-box">
            <div className="flex justify-between mb-1">
              <span>المجموع الفرعي:</span>
              <span>{formatJOD(lastInvoice.subtotal)}</span>
            </div>
            <div className="flex justify-between mb-1 font-bold text-lg">
              <span>الإجمالي:</span>
              <span>{formatJOD(lastInvoice.total)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>طريقة الدفع:</span>
              <span>{lastInvoice.payment_method === 'cash' ? 'نقدي' : 'بطاقة ائتمان'}</span>
            </div>
            {lastInvoice.payment_method === 'cash' && (
              <>
                <div className="flex justify-between mb-1">
                  <span>المبلغ المستلم:</span>
                  <span>{formatJOD(lastInvoice.amount_received)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>الباقي:</span>
                  <span>{formatJOD(lastInvoice.amount_received - lastInvoice.total)}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-8 text-sm text-[#666]">
            شكراً لزيارتكم دهب للعطور
          </div>
        </div>
      </div>
    );
  }

  // MAIN COUNTER UI
  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full no-print pb-16 lg:pb-0 lg:gap-8 lg:p-4 bg-[var(--color-bg-primary)]">
      
      {/* LEFT COLUMN: Products */}
      <div className={`flex-[2] flex flex-col h-full border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-primary)] dir-ar ${activeTab === 'products' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] flex items-center gap-4 rounded-t-xl">
          <div className="relative flex-1">
            <MagnifyingGlass size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              ref={searchInputRef}
              type="text" 
              className="form-input pr-10 text-right" 
              placeholder="ابحث عن منتج، اسم، أو SKU..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const totalStock = (product.variants || []).reduce((acc, v) => acc + (v.stock || 0), 0);
              const outOfStock = totalStock <= 0;
              const defaultVariant = product.variants?.[0] || { price: 0, volume: '100' };
              const multipleSizes = (product.variants || []).length > 1;

              return (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={outOfStock}
                  className={`pos-product-btn flex flex-col gap-2 ${outOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="button"
                >
                  <div className="w-full aspect-square rounded-md overflow-hidden bg-black/40 border border-[var(--color-border-subtle)] relative">
                    {product.image_filename ? (
                       <img src={product.image_filename} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] text-xs">صورة</div>
                    )}
                    {outOfStock && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-red-400 font-bold text-sm">
                        نفذت الكمية
                      </div>
                    )}
                  </div>
                  <div className="text-right w-full">
                    <div className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-snug h-10">
                      {product.name_ar}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">
                      {multipleSizes ? 'أحجام متعددة' : `${defaultVariant.volume}ml`} | المخزون: {totalStock}
                    </div>
                    <div className="text-[var(--color-gold-light)] font-bold text-sm">
                      {multipleSizes ? 'أسعار متعددة' : formatJOD(defaultVariant.price)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Cart */}
      <div className={`flex-[1] min-w-[320px] max-w-md flex flex-col bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl dir-ar ${activeTab === 'cart' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between rounded-t-xl bg-[var(--color-bg-surface)]">
          <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)]">الفاتورة الحالية</h2>
          <span className="badge-gold">{cartItems.length} منتجات</span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-muted)] opacity-50 p-6 text-center">
              <Receipt size={64} weight="thin" className="mb-4" />
              <p>السلة فارغة، قم بإضافة منتجات من القائمة</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {cartItems.map(item => (
                <div key={item.productId} className="pos-cart-item flex flex-col gap-2">
                  <div className="flex justify-between w-full items-center">
                    <span className="font-semibold text-sm">{item.name_ar}</span>
                    <LuxuryButton 
                      variant="icon" 
                      onClick={() => removeFromCart(item.productId)} 
                      className="!p-1 !text-[var(--color-text-muted)] hover:!text-red-400 !w-auto !h-auto !min-h-0 !min-w-0 border-none rounded-full"
                    >
                      <X size={16} />
                    </LuxuryButton>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-md px-2 py-1">
                      <LuxuryButton variant="icon" onClick={() => updateQuantity(item.productId, -1)} className="!p-1 !text-[var(--color-text-muted)] hover:!text-white !w-auto !h-auto !min-h-0 !min-w-0 border-none" disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </LuxuryButton>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <LuxuryButton variant="icon" onClick={() => updateQuantity(item.productId, 1)} className="!p-1 !text-[var(--color-text-muted)] hover:!text-[var(--color-gold)] !w-auto !h-auto !min-h-0 !min-w-0 border-none">
                        <Plus size={14} />
                      </LuxuryButton>
                    </div>
                    <span className="font-bold text-[var(--color-gold)] text-sm">
                      {formatJOD(item.subtotal_fils)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Payment */}
        <div className="border-t border-[var(--color-border-strong)] p-4 bg-[var(--color-bg-card)]">
          <div className="flex justify-between mb-2 text-sm text-[var(--color-text-secondary)]">
            <span>المجموع الفرعي:</span>
            <span>{formatJOD(subtotal_fils)}</span>
          </div>
          <div className="flex justify-between mb-4 text-xl font-bold text-[var(--color-gold-light)]">
            <span>الإجمالي:</span>
            <span>{formatJOD(total_fils)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <LuxuryButton 
              variant={paymentMethod === 'cash' ? 'primary' : 'outline'}
              className="!py-2 text-sm font-bold"
              onClick={() => setPaymentMethod('cash')}
            >
              نقدي
            </LuxuryButton>
            <LuxuryButton 
              variant={paymentMethod === 'card' ? 'primary' : 'outline'}
              className="!py-2 text-sm font-bold"
              onClick={() => { setPaymentMethod('card'); setAmountReceived(''); }}
            >
              بطاقة
            </LuxuryButton>
          </div>

          {paymentMethod === 'cash' && (
            <div className="mb-4 space-y-3">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] block mb-1">المبلغ المستلم (JOD)</label>
                <input 
                  type="number" 
                  step="0.001"
                  className="form-input text-left font-mono" 
                  dir="ltr"
                  value={amountReceived}
                  onChange={e => setAmountReceived(e.target.value)}
                  placeholder="0.000"
                />
              </div>
              <div className="p-3 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-secondary)]">الباقي:</span>
                <span className={`font-bold font-mono text-lg ${change_fils > 0 ? 'change-positive' : change_fils < 0 ? 'change-negative' : 'text-[var(--color-text-muted)]'}`}>
                  {change_fils === 0 && amountReceived !== '' ? 'مبلغ مضبوط' : 
                   change_fils < 0 ? `عجز: ${formatJOD(Math.abs(change_fils))}` : 
                   formatJOD(Math.max(0, change_fils))}
                </span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <textarea 
              className="form-input w-full min-h-[60px] text-sm resize-none py-2"
              placeholder="ملاحظة (اختياري)..."
              value={saleNote}
              onChange={e => setSaleNote(e.target.value)}
            />
          </div>

          <LuxuryButton 
            variant="primary"
            fullWidth
            className="h-12 text-lg shadow-[var(--shadow-gold)]"
            disabled={!canComplete || isSubmitting}
            loading={isSubmitting}
            onClick={handleCompleteSale}
          >
            إتمام البيع
          </LuxuryButton>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-bg-surface)] border-t border-[var(--color-border)] flex items-center justify-around z-30 no-print">
        <LuxuryButton 
          variant="ghost"
          onClick={() => setActiveTab('products')}
          className={`flex flex-col items-center justify-center gap-1 w-1/2 h-full rounded-none transition-colors ${activeTab === 'products' ? '!text-[var(--color-gold)] font-bold' : '!text-[var(--color-text-muted)]'}`}
        >
          <Package size={20} weight={activeTab === 'products' ? "fill" : "regular"} />
          <span className="text-xs">المنتجات</span>
        </LuxuryButton>
        <LuxuryButton 
          variant="ghost"
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center justify-center gap-1 w-1/2 h-full rounded-none transition-colors relative ${activeTab === 'cart' ? '!text-[var(--color-gold)] font-bold' : '!text-[var(--color-text-muted)]'}`}
        >
          <div className="relative">
            <ShoppingCart size={20} weight={activeTab === 'cart' ? "fill" : "regular"} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[0.65rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="text-xs">السلة</span>
        </LuxuryButton>
      </div>

      {/* Size Selection Modal */}
      {selectedProductForSize && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm p-6 border border-[var(--color-border-strong)] flex flex-col gap-4 bg-[var(--color-bg-surface)] text-white text-right dir-rtl">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
              <h2 className="font-display text-lg font-bold text-[var(--color-gold-light)]">
                اختر حجم العبوة لـ {selectedProductForSize.name_ar}
              </h2>
              <LuxuryButton variant="icon" className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 text-[var(--color-text-muted)] hover:!text-white border-none rounded-full" onClick={() => setSelectedProductForSize(null)}>
                <X size={20} />
              </LuxuryButton>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              {(selectedProductForSize.variants || []).map((v) => {
                const itemOutOfStock = v.stock <= 0;
                return (
                  <button
                    key={v.id}
                    onClick={() => addToCart(selectedProductForSize, v)}
                    disabled={itemOutOfStock}
                    className={`flex justify-between items-center p-3 rounded-lg border text-right transition-colors ${
                      itemOutOfStock 
                        ? 'border-red-500/20 bg-red-500/5 text-red-400 opacity-60 cursor-not-allowed'
                        : 'border-[var(--color-border-subtle)] bg-black/30 hover:bg-black/50 text-white'
                    }`}
                  >
                    <span className="font-bold">{v.volume} مل</span>
                    <div className="flex gap-4 items-center">
                      <span className="text-xs text-[var(--color-text-muted)]">المخزون: {v.stock}</span>
                      <span className="font-bold text-[var(--color-gold-light)]">{formatJOD(v.price)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
