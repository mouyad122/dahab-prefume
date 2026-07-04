'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../stores/useAuthStore';
import { useProductStore } from '../../stores/useProductStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { LanguageContext } from '../../contexts/LanguageContext';
import { 
  Package, 
  ShoppingBag, 
  Warehouse, 
  SignOut, 
  Plus, 
  Trash, 
  Pencil, 
  MagnifyingGlass, 
  Copy, 
  Check, 
  WhatsappLogo, 
  Eye, 
  EyeSlash,
  Warning,
  CheckCircle,
  Coins,
  Calendar,
  User,
  MapPin,
  FileText,
  Hourglass,
  Globe
} from '@phosphor-icons/react';
import LuxuryButton from '../../components/ui/LuxuryButton';

// Input sanitization
const sanitizeInput = (val) => {
  if (typeof val !== 'string') return val;
  return val.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
};

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage, t } = useContext(LanguageContext);
  const isAr = language === 'ar';

  // Auth Store
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const hydrateAuth = useAuthStore(state => state.hydrateAuth);
  const logout = useAuthStore(state => state.logout);

  // Product Store
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const saveProduct = useProductStore(state => state.saveProduct);
  const deleteProduct = useProductStore(state => state.deleteProduct);

  // Order Store
  const orders = useOrderStore(state => state.orders);
  const fetchOrders = useOrderStore(state => state.fetchOrders);
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);

  // Local State
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const [orderCityFilter, setOrderCityFilter] = useState('');

  // Modals / Editors
  const [editingProduct, setEditingProduct] = useState(null); // null, 'add', or product object
  const [viewingOrder, setViewingOrder] = useState(null); // null or order object
  const [formErrors, setFormErrors] = useState({});

  // Product Form Ref / Fields
  const [prodForm, setProdForm] = useState({
    id: '',
    slug: '',
    sku: '',
    titleAr: '',
    titleEn: '',
    price: 0,
    compareAtPrice: '',
    volume: '',
    category: 'hair-mists',
    collection: 'hair-mists',
    stock: 10,
    lowStockThreshold: 5,
    hidden: false,
    thumbnail: '',
    shortDescAr: '',
    shortDescEn: '',
    longDescAr: '',
    longDescEn: '',
    notesTop: '',
    notesHeart: '',
    notesBase: '',
    metricLongevity: 'long_lasting',
    metricSillage: 'moderate',
    metricSeason: ['spring', 'summer', 'autumn', 'winter'],
    metricTime: 'all_day'
  });

  // Hydrate auth and state
  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated, router, fetchProducts, fetchOrders]);

  // Sync activeTab with route path
  useEffect(() => {
    if (pathname === '/admin/products') setActiveTab('products');
    else if (pathname === '/admin/inventory') setActiveTab('inventory');
    else if (pathname === '/admin/orders') setActiveTab('orders');
    else setActiveTab('overview');
  }, [pathname]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Copy Clipboard Helper
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  // Safe Slug Generator
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Handle open Product Form
  const openProductForm = (product = null) => {
    setFormErrors({});
    if (product) {
      setProdForm({
        id: product.id,
        slug: product.slug,
        sku: product.sku || '',
        titleAr: product.title?.ar || '',
        titleEn: product.title?.en || '',
        price: product.price || 0,
        compareAtPrice: product.compareAtPrice || '',
        volume: product.volume || '',
        category: product.category || 'hair-mists',
        collection: product.collection || 'hair-mists',
        stock: product.stock || 0,
        lowStockThreshold: product.lowStockThreshold || 5,
        hidden: product.hidden || false,
        thumbnail: product.thumbnail || '',
        shortDescAr: product.shortDescription?.ar || '',
        shortDescEn: product.shortDescription?.en || '',
        longDescAr: product.longDescription?.ar || '',
        longDescEn: product.longDescription?.en || '',
        notesTop: product.fragranceNotes?.top?.join(', ') || '',
        notesHeart: product.fragranceNotes?.heart?.join(', ') || '',
        notesBase: product.fragranceNotes?.base?.join(', ') || '',
        metricLongevity: product.metrics?.longevity || 'long_lasting',
        metricSillage: product.metrics?.sillage || 'moderate',
        metricSeason: product.metrics?.bestSeason || ['spring', 'summer', 'autumn', 'winter'],
        metricTime: product.metrics?.bestTime || 'all_day'
      });
      setEditingProduct(product);
    } else {
      setProdForm({
        id: '',
        slug: '',
        sku: '',
        titleAr: '',
        titleEn: '',
        price: 0,
        compareAtPrice: '',
        volume: '',
        category: 'hair-mists',
        collection: 'hair-mists',
        stock: 10,
        lowStockThreshold: 5,
        hidden: false,
        thumbnail: '',
        shortDescAr: '',
        shortDescEn: '',
        longDescAr: '',
        longDescEn: '',
        notesTop: '',
        notesHeart: '',
        notesBase: '',
        metricLongevity: 'long_lasting',
        metricSillage: 'moderate',
        metricSeason: ['spring', 'summer', 'autumn', 'winter'],
        metricTime: 'all_day'
      });
      setEditingProduct('add');
    }
  };

  // Product Form Validation & Save
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const errors = {};

    const cleanTitleAr = sanitizeInput(prodForm.titleAr);
    const cleanTitleEn = sanitizeInput(prodForm.titleEn);
    const cleanVolume = sanitizeInput(prodForm.volume);
    const cleanSlug = sanitizeInput(prodForm.slug) || generateSlug(cleanTitleEn);
    const cleanSku = sanitizeInput(prodForm.sku);
    const cleanThumbnail = sanitizeInput(prodForm.thumbnail);

    if (!cleanTitleAr) errors.titleAr = isAr ? 'الاسم باللغة العربية مطلوب.' : 'Arabic title is required.';
    if (!cleanTitleEn) errors.titleEn = isAr ? 'الاسم باللغة الإنجليزية مطلوب.' : 'English title is required.';
    if (prodForm.price <= 0) errors.price = isAr ? 'السعر يجب أن يكون أكبر من صفر.' : 'Price must be greater than zero.';
    if (!cleanVolume) errors.volume = isAr ? 'الحجم مطلوب (مثال: 50ml).' : 'Volume is required (e.g. 50ml).';
    if (!cleanSlug) errors.slug = isAr ? 'الرابط الرمزي (Slug) مطلوب.' : 'Slug is required.';

    // Check slug uniqueness
    const duplicate = products.find(p => p.slug === cleanSlug && p.id !== prodForm.id);
    if (duplicate) {
      errors.slug = isAr ? 'الرابط الرمزي مُستخدم بالفعل لمنتج آخر.' : 'Slug is already in use by another product.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Map form back to product object schema
    const productPayload = {
      id: prodForm.id || undefined,
      slug: cleanSlug,
      sku: cleanSku || `DAHAB-${prodForm.category.toUpperCase().slice(0,2)}-${Math.floor(100+Math.random()*900)}`,
      title: { ar: cleanTitleAr, en: cleanTitleEn },
      price: parseFloat(prodForm.price),
      compareAtPrice: prodForm.compareAtPrice ? parseFloat(prodForm.compareAtPrice) : null,
      volume: cleanVolume,
      category: prodForm.category,
      collection: prodForm.collection,
      stock: parseInt(prodForm.stock),
      lowStockThreshold: parseInt(prodForm.lowStockThreshold),
      hidden: prodForm.hidden,
      thumbnail: cleanThumbnail || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
      shortDescription: {
        ar: sanitizeInput(prodForm.shortDescAr),
        en: sanitizeInput(prodForm.shortDescEn)
      },
      longDescription: {
        ar: sanitizeInput(prodForm.longDescAr),
        en: sanitizeInput(prodForm.longDescEn)
      },
      fragranceNotes: {
        top: prodForm.notesTop.split(',').map(n => n.trim()).filter(Boolean),
        heart: prodForm.notesHeart.split(',').map(n => n.trim()).filter(Boolean),
        base: prodForm.notesBase.split(',').map(n => n.trim()).filter(Boolean)
      },
      metrics: {
        longevity: prodForm.metricLongevity,
        sillage: prodForm.metricSillage,
        bestSeason: prodForm.metricSeason,
        bestTime: prodForm.metricTime
      }
    };

    saveProduct(productPayload);
    setEditingProduct(null);
    showToast(isAr ? 'تم حفظ المنتج بنجاح.' : 'Product saved successfully.');
  };

  // Product Delete
  const handleDeleteProduct = (id, name) => {
    const confirmMsg = isAr 
      ? `هل أنت متأكد من حذف المنتج: ${name}؟ لا يمكن التراجع عن هذا الإجراء.`
      : `Are you sure you want to delete product: ${name}? This action cannot be undone.`;
    
    if (confirm(confirmMsg)) {
      deleteProduct(id);
      showToast(isAr ? 'تم حذف المنتج.' : 'Product deleted.', 'error');
    }
  };

  // Inventory Stock change
  const handleUpdateStock = (productId, newStock, threshold) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const updated = {
        ...product,
        stock: Math.max(0, parseInt(newStock)),
        lowStockThreshold: Math.max(0, parseInt(threshold))
      };
      saveProduct(updated);
      showToast(isAr ? 'تم تحديث الكمية المخزنة.' : 'Stock level updated successfully.');
    }
  };

  // Change Order Status
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(isAr ? 'تم تحديث حالة الطلب.' : 'Order status updated.');
    // Keep detail modal updated
    if (viewingOrder && viewingOrder.orderId === orderId) {
      setViewingOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Statistics Computations
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, o) => acc + (o.total || 0), 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  // Best Sellers (derived from local orders)
  const getBestSellers = () => {
    const counts = {};
    orders.forEach(o => {
      if (o.status !== 'cancelled') {
        o.items?.forEach(item => {
          counts[item.id] = (counts[item.id] || 0) + item.quantity;
        });
      }
    });
    return Object.entries(counts)
      .map(([id, qty]) => {
        const prod = products.find(p => p.id === id);
        return {
          title: prod ? prod.title : { ar: id, en: id },
          quantity: qty
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);
  };

  // Filters logic
  const filteredProducts = products.filter(p => {
    const query = productSearch.toLowerCase();
    const titleMatch = p.title?.ar?.toLowerCase().includes(query) || p.title?.en?.toLowerCase().includes(query) || p.sku?.toLowerCase().includes(query);
    const catMatch = !productCatFilter || p.category === productCatFilter;
    return titleMatch && catMatch;
  });

  const filteredOrders = orders.filter(o => {
    const query = orderSearch.toLowerCase();
    const matchQuery = o.orderId?.toLowerCase().includes(query) || o.customer?.name?.toLowerCase().includes(query) || o.customer?.phone?.includes(query);
    const matchStatus = !orderStatusFilter || o.status === orderStatusFilter;
    const matchCity = !orderCityFilter || o.customer?.cityKey === orderCityFilter;
    return matchQuery && matchStatus && matchCity;
  }).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  if (!isAuthenticated) return null;

  return (
    <div className={`min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300 pb-20 flex flex-col ${isAr ? 'font-sans-ar' : 'font-sans-en'}`} dir="ltr">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-[var(--color-gold)] text-black'
        }`}>
          <CheckCircle size={18} weight="bold" />
          <span className="text-xs font-bold uppercase tracking-wider">{toast.message}</span>
        </div>
      )}

      {/* Admin Utilities Bar */}
      <div className="w-full bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-3">
        <div className="premium-container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold tracking-[0.2em] text-[var(--color-gold)]">
              DAHAB PERFUMES ADMIN
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] border-l border-zinc-800 pl-4 ml-1 hidden sm:inline">
              Boutique Control Hub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <LuxuryButton
              variant="ghost"
              onClick={toggleLanguage}
              className="!p-0 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] hover:!text-[var(--color-gold)]"
              iconLeft={Globe}
            >
              {isAr ? 'English' : 'العربية'}
            </LuxuryButton>
            <LuxuryButton 
              variant="ghost"
              onClick={() => { logout(); router.push('/admin/login'); }}
              className="!p-0 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:!text-red-400"
              iconLeft={SignOut}
            >
              {isAr ? 'خروج' : 'Logout'}
            </LuxuryButton>
          </div>
        </div>
      </div>

      {/* Main Admin Wrapper */}
      <div className="premium-container mt-10 flex flex-col gap-10">
        
        {/* Portal Greeting */}
        <div className="text-start">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            {isAr ? 'لوحة تحكم دهب لعطور النيش' : 'Dahab Perfumes Management'}
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] font-light mt-1.5 leading-relaxed">
            {isAr 
              ? 'مرحباً بك في وحدة تحكم المدير. يمكنك تعديل العطور ومستويات المخزون ومراجعة طلبات الواتساب المستلمة.'
              : 'Secure admin portal to manage catalog items, monitor real-time stock levels, and coordinate WhatsApp invoices.'
            }
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[var(--color-border)] gap-6 text-xs font-bold uppercase tracking-widest overflow-x-auto pb-px">
          <Link 
            href="/admin" 
            className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 hover:text-[var(--color-gold)] shrink-0 ${activeTab === 'overview' ? 'text-[var(--color-gold)] border-[var(--color-gold)]' : 'text-[var(--color-text-secondary)] border-transparent'}`}
          >
            <Warehouse size={16} />
            <span>{isAr ? 'نظرة عامة' : 'Overview'}</span>
          </Link>
          <Link 
            href="/admin/products" 
            className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 hover:text-[var(--color-gold)] shrink-0 ${activeTab === 'products' ? 'text-[var(--color-gold)] border-[var(--color-gold)]' : 'text-[var(--color-text-secondary)] border-transparent'}`}
          >
            <Package size={16} />
            <span>{isAr ? 'إدارة المنتجات' : 'Products CRUD'}</span>
          </Link>
          <Link 
            href="/admin/inventory" 
            className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 hover:text-[var(--color-gold)] shrink-0 ${activeTab === 'inventory' ? 'text-[var(--color-gold)] border-[var(--color-gold)]' : 'text-[var(--color-text-secondary)] border-transparent'}`}
          >
            <FileText size={16} />
            <span>{isAr ? 'مستويات المخزون' : 'Inventory'}</span>
          </Link>
          <Link 
            href="/admin/orders" 
            className={`pb-3 flex items-center gap-1.5 transition-colors border-b-2 hover:text-[var(--color-gold)] shrink-0 ${activeTab === 'orders' ? 'text-[var(--color-gold)] border-[var(--color-gold)]' : 'text-[var(--color-text-secondary)] border-transparent'}`}
          >
            <ShoppingBag size={16} />
            <span>{isAr ? 'سجل الطلبات' : 'Orders Log'}</span>
          </Link>
        </div>

        {/* Tab Panel Views */}
        <div className="w-full">
          
          {/* 1. OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-10">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total products */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'إجمالي المنتجات' : 'Total Products'}</span>
                    <Package size={16} className="text-zinc-600 group-hover:text-[var(--color-gold)] transition-colors" />
                  </div>
                  <span className="text-3xl font-display font-bold text-[var(--color-text-primary)] mt-4">{products.length}</span>
                </div>

                {/* Available Products */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'المنتجات المتوفرة' : 'Available Items'}</span>
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <span className="text-3xl font-display font-bold text-emerald-500 mt-4">{products.filter(p => p.stock > 5).length}</span>
                </div>

                {/* Low Stock Warning */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'مخزون منخفض' : 'Low Stock Items'}</span>
                    <Warning size={16} className="text-amber-500 animate-pulse" />
                  </div>
                  <span className="text-3xl font-display font-bold text-amber-500 mt-4">
                    {products.filter(p => p.stock <= (p.lowStockThreshold || 5) && p.stock > 0).length}
                  </span>
                </div>

                {/* Out of Stock */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'نفذ من المستودع' : 'Out of Stock'}</span>
                    <Warning size={16} className="text-red-500" />
                  </div>
                  <span className="text-3xl font-display font-bold text-red-500 mt-4">{products.filter(p => p.stock === 0).length}</span>
                </div>

                {/* Total Revenue */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
                    <Coins size={16} className="text-[var(--color-gold)]" />
                  </div>
                  <span className="text-3xl font-display font-bold text-[var(--color-gold)] mt-4">{totalRevenue.toFixed(2)} JOD</span>
                </div>

                {/* Total Invoices count */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'عدد الفواتير الكلي' : 'Total Invoices'}</span>
                    <ShoppingBag size={16} className="text-zinc-600" />
                  </div>
                  <span className="text-3xl font-display font-bold text-[var(--color-text-primary)] mt-4">{orders.length}</span>
                </div>

                {/* Pending Confirmation count */}
                <div className="rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 text-start flex flex-col justify-between min-h-[135px] relative overflow-hidden group hover:border-[var(--color-gold)]/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{isAr ? 'طلبات قيد الانتظار' : 'Pending Invoices'}</span>
                    <Hourglass size={16} className="text-amber-500" />
                  </div>
                  <span className="text-3xl font-display font-bold text-amber-500 mt-4">{pendingOrdersCount}</span>
                </div>

                {/* Demo Persistence Notice */}
                <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-6 text-start flex flex-col justify-between min-h-[135px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500">{isAr ? 'بيئة تجريبية' : 'Demo Mode'}</span>
                  <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed mt-2">
                    {isAr 
                      ? 'البيانات محفوظة مؤقتاً في متصفحك الحالي عبر LocalStorage. التثبيت النهائي يتطلب خادم وقاعدة بيانات.'
                      : 'Data is saved temporarily via localStorage. Final production requires database setup.'
                    }
                  </p>
                </div>
              </div>

              {/* Sub-grid: Recent Orders & Best Sellers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Recent Orders List */}
                <div className="lg:col-span-2 rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 w-full">
                  <div className="rounded-[calc(2.5rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 shadow-main flex flex-col gap-6 text-start">
                    <h3 className="font-display text-lg font-bold border-b border-[var(--color-border)] pb-3">
                      {isAr ? 'آخر الطلبات الواردة' : 'Recent Invoices'}
                    </h3>
                    
                    {orders.length === 0 ? (
                      <p className="text-xs text-[var(--color-text-muted)] py-10 text-center">
                        {isAr ? 'لم يتم استلام أي طلبات بعد.' : 'No orders recorded yet.'}
                      </p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {orders.slice(0, 5).map(o => (
                          <div 
                            key={o.orderId}
                            onClick={() => setViewingOrder(o)}
                            className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-gold)]/35 bg-[var(--color-bg-primary)]/40 hover:bg-[var(--color-bg-primary)]/80 transition-all cursor-pointer"
                          >
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-sans-en text-xs font-bold text-[var(--color-text-primary)]">{o.orderId}</span>
                                <span className={`text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                                  o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                                  o.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                  'bg-amber-500/10 text-amber-500'
                                }`}>
                                  {o.status}
                                </span>
                              </div>
                              <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold mt-0.5">{o.customer?.name}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-bold text-[var(--color-gold)]">{(o.total || 0).toFixed(2)} JOD</span>
                              <span className="text-[8px] text-[var(--color-text-muted)] mt-1">{o.orderDate}</span>
                            </div>
                          </div>
                        ))}
                        <Link href="/admin/orders" className="text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors mt-2">
                          {isAr ? 'عرض جميع الطلبات ←' : 'View All Orders ←'}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Best Sellers card */}
                <div className="rounded-[2.5rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10 w-full">
                  <div className="rounded-[calc(2.5rem-0.375rem)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 shadow-main flex flex-col gap-6 text-start">
                    <h3 className="font-display text-lg font-bold border-b border-[var(--color-border)] pb-3">
                      {isAr ? 'الأكثر طلباً' : 'Best Selling Scents'}
                    </h3>
                    
                    {getBestSellers().length === 0 ? (
                      <p className="text-xs text-[var(--color-text-muted)] py-10 text-center">
                        {isAr ? 'لا توجد إحصائيات بيع متوفرة.' : 'No sales data recorded.'}
                      </p>
                    ) : (
                      <div className="flex flex-col gap-5">
                        {getBestSellers().map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-[var(--color-border)]/40 pb-3">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[var(--color-text-primary)]">{isAr ? item.title.ar : item.title.en}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase bg-[var(--color-gold-glow)] text-[var(--color-gold)] px-2.5 py-1 rounded-full">
                              {item.quantity} {isAr ? 'مباع' : 'sold'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. PRODUCTS PANEL */}
          {activeTab === 'products' && (
            <div className="flex flex-col gap-6 text-start">
              
              {/* Product list control actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl">
                <div className="flex items-center gap-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-4.5 py-2 w-full sm:max-w-md">
                  <MagnifyingGlass size={16} className="text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder={isAr ? 'ابحث باسم المنتج أو SKU...' : 'Search by name or SKU...'}
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="bg-transparent border-none text-xs text-[var(--color-text-primary)] w-full focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={productCatFilter}
                      onChange={e => setProductCatFilter(e.target.value)}
                      className="form-input text-xs pr-8 py-2 px-4 rounded-full border-[var(--color-border)] bg-[var(--color-bg-primary)] cursor-pointer"
                    >
                      <option value="">{isAr ? 'جميع الفئات' : 'All Categories'}</option>
                      <option value="hair-mists">{isAr ? 'معطرات الشعر' : 'Hair Mists'}</option>
                      <option value="private-collection">{isAr ? 'المجموعة الخاصة' : 'Private Collection'}</option>
                      <option value="oud">{isAr ? 'العطور الشرقية' : 'Middle Eastern (Oud)'}</option>
                    </select>
                  </div>

                  {/* Add Product CTA */}
                  <LuxuryButton 
                    variant="primary"
                    onClick={() => openProductForm()}
                    className="text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-full"
                    iconLeft={() => <Plus size={14} weight="bold" />}
                  >
                    {isAr ? 'إضافة عطر' : 'Add Scent'}
                  </LuxuryButton>
                </div>
              </div>

              {/* Products Catalog Table */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-x-auto shadow-sm">
                <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/30 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                      <th className="px-6 py-4">{isAr ? 'المنتج' : 'Product'}</th>
                      <th className="px-6 py-4">SKU</th>
                      <th className="px-6 py-4">{isAr ? 'الفئة' : 'Category'}</th>
                      <th className="px-6 py-4">{isAr ? 'السعر' : 'Price'}</th>
                      <th className="px-6 py-4">{isAr ? 'المخزون' : 'Stock'}</th>
                      <th className="px-6 py-4">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="px-6 py-4 text-center">{isAr ? 'خيارات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]/40">
                    {filteredProducts.map(p => {
                      const isLow = p.stock <= (p.lowStockThreshold || 5) && p.stock > 0;
                      const isOut = p.stock === 0;

                      return (
                        <tr key={p.id} className="hover:bg-[var(--color-bg-primary)]/10 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img src={p.thumbnail} alt={p.title.en} className="w-9 h-9 object-cover rounded border border-[var(--color-border)] bg-[var(--color-bg-primary)]" />
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-[var(--color-text-primary)] truncate max-w-[180px]">{isAr ? p.title.ar : p.title.en}</span>
                              <span className="text-[9px] text-[var(--color-text-muted)] tracking-wider mt-0.5">{p.volume}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-[10px] text-[var(--color-text-secondary)]">{p.sku}</td>
                          <td className="px-6 py-4 text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">{p.category}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-[var(--color-text-primary)]">{p.price.toFixed(2)} JOD</span>
                              {p.compareAtPrice && (
                                <span className="text-[9px] line-through text-[var(--color-text-muted)]">{p.compareAtPrice.toFixed(2)} JOD</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${isOut ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-emerald-500'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {p.hidden ? (
                              <span className="inline-flex items-center gap-1 text-zinc-500 bg-zinc-500/10 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold">
                                <EyeSlash size={10} />
                                {isAr ? 'مخفي' : 'Hidden'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold">
                                <Eye size={10} />
                                {isAr ? 'نشط' : 'Visible'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <LuxuryButton 
                                variant="icon"
                                onClick={() => openProductForm(p)}
                                className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0 border border-[var(--color-border)] text-zinc-500 hover:!text-[var(--color-gold)] hover:border-[var(--color-gold)]/40 transition-all active:scale-90"
                                title={isAr ? 'تعديل' : 'Edit'}
                              >
                                <Pencil size={12} />
                              </LuxuryButton>
                              <LuxuryButton 
                                variant="icon"
                                onClick={() => handleDeleteProduct(p.id, isAr ? p.title.ar : p.title.en)}
                                className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0 border border-red-500/10 text-red-500 hover:bg-red-500/5 hover:border-red-500/30 transition-all active:scale-90"
                                title={isAr ? 'حذف' : 'Delete'}
                              >
                                <Trash size={12} />
                              </LuxuryButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* 3. INVENTORY PANEL */}
          {activeTab === 'inventory' && (
            <div className="flex flex-col gap-6 text-start">
              
              {/* Inventory Table card */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-x-auto shadow-sm">
                <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/30 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                      <th className="px-6 py-4">{isAr ? 'المنتج' : 'Product'}</th>
                      <th className="px-6 py-4">SKU</th>
                      <th className="px-6 py-4">{isAr ? 'الحالة الحالية' : 'Stock Status'}</th>
                      <th className="px-6 py-4">{isAr ? 'الكمية الحالية' : 'Stock Qty'}</th>
                      <th className="px-6 py-4">{isAr ? 'حد التحذير' : 'Low Warning'}</th>
                      <th className="px-6 py-4 text-center">{isAr ? 'تعديل سريع' : 'Quick Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]/40">
                    {products.map(p => {
                      const isOut = p.stock === 0;
                      const isLow = p.stock <= (p.lowStockThreshold || 5) && p.stock > 0;

                      return (
                        <tr key={p.id} className="hover:bg-[var(--color-bg-primary)]/10 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img src={p.thumbnail} alt={p.title.en} className="w-9 h-9 object-cover rounded border border-[var(--color-border)] bg-[var(--color-bg-primary)]" />
                            <div className="flex flex-col">
                              <span className="font-bold text-[var(--color-text-primary)]">{isAr ? p.title.ar : p.title.en}</span>
                              <span className="text-[9px] text-[var(--color-text-muted)] tracking-wider mt-0.5">{p.volume}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-[10px] text-[var(--color-text-secondary)]">{p.sku}</td>
                          <td className="px-6 py-4">
                            {isOut ? (
                              <span className="bg-red-500/10 text-red-500 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                                {isAr ? 'غير متوفر' : 'Out of Stock'}
                              </span>
                            ) : isLow ? (
                              <span className="bg-amber-500/10 text-amber-500 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                                {isAr ? 'كمية منخفضة' : 'Low Stock'}
                              </span>
                            ) : (
                              <span className="bg-emerald-500/10 text-emerald-500 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                                {isAr ? 'متوفر' : 'Available'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number"
                              defaultValue={p.stock}
                              onBlur={e => handleUpdateStock(p.id, e.target.value, p.lowStockThreshold || 5)}
                              className="form-input text-xs w-20 py-1.5 px-3 rounded-lg border-[var(--color-border)] bg-[var(--color-bg-primary)] focus:outline-none"
                              min="0"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input 
                              type="number"
                              defaultValue={p.lowStockThreshold || 5}
                              onBlur={e => handleUpdateStock(p.id, p.stock, e.target.value)}
                              className="form-input text-xs w-20 py-1.5 px-3 rounded-lg border-[var(--color-border)] bg-[var(--color-bg-primary)] focus:outline-none"
                              min="0"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              {/* Quick Mark Available / Out of stock */}
                              <LuxuryButton
                                variant="outline" 
                                onClick={() => handleUpdateStock(p.id, 0, p.lowStockThreshold || 5)}
                                className={`text-[9px] font-bold !px-3 !py-1.5 rounded-full border-red-500/20 text-red-500 hover:bg-red-500/5 ${isOut ? 'opacity-40 pointer-events-none' : ''}`}
                              >
                                {isAr ? 'تصفير المخزون' : 'Set sold-out'}
                              </LuxuryButton>
                              <LuxuryButton
                                variant="outline" 
                                onClick={() => handleUpdateStock(p.id, 10, p.lowStockThreshold || 5)}
                                className={`text-[9px] font-bold !px-3 !py-1.5 rounded-full border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/5 ${!isOut && !isLow ? 'opacity-40 pointer-events-none' : ''}`}
                              >
                                {isAr ? 'شحن المخزون (10)' : 'Restock to 10'}
                              </LuxuryButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* 4. ORDERS PANEL */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6 text-start">
              
              {/* Order filtering and search control */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5 rounded-2xl">
                <div className="flex items-center gap-2.5 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full px-4.5 py-2 w-full lg:max-w-md">
                  <MagnifyingGlass size={16} className="text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder={isAr ? 'ابحث برقم الطلب، اسم العميل، الهاتف...' : 'Search order reference, name, phone...'}
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="bg-transparent border-none text-xs text-[var(--color-text-primary)] w-full focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto justify-end flex-wrap">
                  {/* Status filter */}
                  <select
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="form-input text-xs py-2 px-4 rounded-full border-[var(--color-border)] bg-[var(--color-bg-primary)] cursor-pointer"
                  >
                    <option value="">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* City filter */}
                  <select
                    value={orderCityFilter}
                    onChange={e => setOrderCityFilter(e.target.value)}
                    className="form-input text-xs py-2 px-4 rounded-full border-[var(--color-border)] bg-[var(--color-bg-primary)] cursor-pointer"
                  >
                    <option value="">{isAr ? 'جميع المدن' : 'All Cities'}</option>
                    <option value="amman">{isAr ? 'عمان' : 'Amman'}</option>
                    <option value="zarqa">{isAr ? 'الزرقاء' : 'Zarqa'}</option>
                    <option value="irbid">{isAr ? 'إربد' : 'Irbid'}</option>
                    <option value="salt">{isAr ? 'السلط' : 'Salt'}</option>
                    <option value="aqaba">{isAr ? 'العقبة' : 'Aqaba'}</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-x-auto shadow-sm">
                <table className="w-full text-xs text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/30 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                      <th className="px-6 py-4">{isAr ? 'رقم الطلب' : 'Order ID'}</th>
                      <th className="px-6 py-4">{isAr ? 'العميل' : 'Customer'}</th>
                      <th className="px-6 py-4">{isAr ? 'المدينة' : 'City'}</th>
                      <th className="px-6 py-4">{isAr ? 'المنتجات' : 'Items'}</th>
                      <th className="px-6 py-4">{isAr ? 'القيمة الإجمالية' : 'Grand Total'}</th>
                      <th className="px-6 py-4">{isAr ? 'حالة الطلب' : 'Status'}</th>
                      <th className="px-6 py-4 text-center">{isAr ? 'تفاصيل' : 'View'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]/40">
                    {filteredOrders.map(o => (
                      <tr key={o.orderId} className="hover:bg-[var(--color-bg-primary)]/10 transition-colors">
                        <td className="px-6 py-4 font-mono text-[10px] font-bold text-[var(--color-text-primary)]">{o.orderId}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-start">
                            <span className="font-bold text-[var(--color-text-primary)]">{o.customer?.name}</span>
                            <span className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{o.customer?.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">{o.customer?.city}</td>
                        <td className="px-6 py-4 text-[10px] text-[var(--color-text-secondary)]">
                          {o.items?.length} {isAr ? 'عطور' : 'items'}
                        </td>
                        <td className="px-6 py-4 font-bold text-[var(--color-gold)]">{(o.total || 0).toFixed(2)} JOD</td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <select 
                              value={o.status}
                              onChange={e => handleStatusChange(o.orderId, e.target.value)}
                              className="form-input text-[10px] font-bold py-1.5 px-3 rounded-lg border-[var(--color-border)] bg-[var(--color-bg-primary)] focus:outline-none cursor-pointer"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <LuxuryButton 
                            variant="icon"
                            onClick={() => setViewingOrder(o)}
                            className="!p-2 !w-auto !h-auto !min-h-0 !min-w-0 border border-[var(--color-border)] text-zinc-500 hover:!text-[var(--color-gold)] hover:border-[var(--color-gold)]/40 transition-all active:scale-90"
                          >
                            <Eye size={12} />
                          </LuxuryButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 5. PRODUCT ADD/EDIT MODAL OVERLAY */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-[3rem] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 flex flex-col gap-6 text-start max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
              <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                {editingProduct === 'add' 
                  ? (isAr ? 'إضافة عطر جديد للكتالوج' : 'Add New Fragrance') 
                  : (isAr ? 'تعديل تفاصيل العطر' : 'Edit Fragrance Details')
                }
              </h2>
              <LuxuryButton 
                variant="ghost"
                onClick={() => setEditingProduct(null)}
                className="!p-0 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] hover:!text-red-500 font-bold"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </LuxuryButton>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col gap-6">
              
              {/* SECTION A: Titles and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الاسم باللغة العربية *' : 'Arabic Scent Scent *'}</label>
                  <input 
                    type="text"
                    value={prodForm.titleAr}
                    onChange={e => setProdForm({ ...prodForm, titleAr: e.target.value })}
                    className="form-input text-xs"
                    required
                  />
                  {formErrors.titleAr && <span className="text-[9px] text-red-500">{formErrors.titleAr}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الاسم باللغة الإنجليزية *' : 'English Scent Name *'}</label>
                  <input 
                    type="text"
                    value={prodForm.titleEn}
                    onChange={e => setProdForm({ ...prodForm, titleEn: e.target.value })}
                    className="form-input text-xs"
                    required
                  />
                  {formErrors.titleEn && <span className="text-[9px] text-red-500">{formErrors.titleEn}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الحجم الزجاجي *' : 'Boutique Volume *'}</label>
                  <input 
                    type="text"
                    value={prodForm.volume}
                    onChange={e => setProdForm({ ...prodForm, volume: e.target.value })}
                    placeholder="e.g. 50ml or 100ml"
                    className="form-input text-xs"
                    required
                  />
                  {formErrors.volume && <span className="text-[9px] text-red-500">{formErrors.volume}</span>}
                </div>
              </div>

              {/* SECTION B: Pricing and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'سعر البيع الحالي (JOD) *' : 'Current Sale Price (JOD) *'}</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={prodForm.price}
                    onChange={e => setProdForm({ ...prodForm, price: parseFloat(e.target.value) || 0 })}
                    className="form-input text-xs"
                    required
                  />
                  {formErrors.price && <span className="text-[9px] text-red-500">{formErrors.price}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'السعر الأصلي قبل التخفيض' : 'Compare at Price (JOD)'}</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={prodForm.compareAtPrice}
                    onChange={e => setProdForm({ ...prodForm, compareAtPrice: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'مخزون المستودع الحالي *' : 'Warehouse Stock Qty *'}</label>
                  <input 
                    type="number"
                    value={prodForm.stock}
                    onChange={e => setProdForm({ ...prodForm, stock: parseInt(e.target.value) || 0 })}
                    className="form-input text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'حد التحذير المنخفض' : 'Low Stock Warning'}</label>
                  <input 
                    type="number"
                    value={prodForm.lowStockThreshold}
                    onChange={e => setProdForm({ ...prodForm, lowStockThreshold: parseInt(e.target.value) || 5 })}
                    className="form-input text-xs"
                    required
                  />
                </div>
              </div>

              {/* SECTION C: Classification & URL */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'التصنيف' : 'Category'}</label>
                  <select
                    value={prodForm.category}
                    onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="hair-mists">hair-mists</option>
                    <option value="private-collection">private-collection</option>
                    <option value="oud">oud</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'المجموعة' : 'Collection'}</label>
                  <select
                    value={prodForm.collection}
                    onChange={e => setProdForm({ ...prodForm, collection: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="hair-mists">hair-mists</option>
                    <option value="private-collection">private-collection</option>
                    <option value="oud">oud</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'رقم الكود التسلسلي (SKU)' : 'Serial SKU Reference'}</label>
                  <input 
                    type="text"
                    value={prodForm.sku}
                    onChange={e => setProdForm({ ...prodForm, sku: e.target.value })}
                    placeholder="Auto-generated if blank"
                    className="form-input text-xs font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الرابط الرمزي (Slug) *' : 'Dynamic Scent URL Slug *'}</label>
                  <input 
                    type="text"
                    value={prodForm.slug}
                    onChange={e => setProdForm({ ...prodForm, slug: e.target.value })}
                    placeholder="e.g. musk-vanilla-hair-mist"
                    className="form-input text-xs font-mono"
                    required
                  />
                  {formErrors.slug && <span className="text-[9px] text-red-500">{formErrors.slug}</span>}
                </div>
              </div>

              {/* SECTION D: Visuals and Visibility */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'رابط الصورة المصغرة' : 'Unsplash / Image URL Link'}</label>
                  <input 
                    type="text"
                    value={prodForm.thumbnail}
                    onChange={e => setProdForm({ ...prodForm, thumbnail: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="form-input text-xs font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end gap-2.5 pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={prodForm.hidden}
                      onChange={e => setProdForm({ ...prodForm, hidden: e.target.checked })}
                      className="accent-[var(--color-gold)]"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                      {isAr ? 'إخفاء المنتج عن الواجهة العامة' : 'Hide from storefront'}
                    </span>
                  </label>
                </div>
              </div>

              {/* SECTION E: Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الوصف القصير (بالعربي)' : 'Short Description (Arabic)'}</label>
                  <textarea
                    value={prodForm.shortDescAr}
                    onChange={e => setProdForm({ ...prodForm, shortDescAr: e.target.value })}
                    className="form-input text-xs h-16 resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'الوصف القصير (بالإنجليزي)' : 'Short Description (English)'}</label>
                  <textarea
                    value={prodForm.shortDescEn}
                    onChange={e => setProdForm({ ...prodForm, shortDescEn: e.target.value })}
                    className="form-input text-xs h-16 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'تفاصيل السرد العطري (بالعربي)' : 'Long Description (Arabic)'}</label>
                  <textarea
                    value={prodForm.longDescAr}
                    onChange={e => setProdForm({ ...prodForm, longDescAr: e.target.value })}
                    className="form-input text-xs h-24 resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'تفاصيل السرد العطري (بالإنجليزي)' : 'Long Description (English)'}</label>
                  <textarea
                    value={prodForm.longDescEn}
                    onChange={e => setProdForm({ ...prodForm, longDescEn: e.target.value })}
                    className="form-input text-xs h-24 resize-none"
                  />
                </div>
              </div>

              {/* SECTION F: Fragrance Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'النوتات العليا (مفصولة بفواصل)' : 'Top Notes (comma separated)'}</label>
                  <input 
                    type="text"
                    value={prodForm.notesTop}
                    onChange={e => setProdForm({ ...prodForm, notesTop: e.target.value })}
                    placeholder="e.g. الفانيليا, البرغموت"
                    className="form-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'نوتات القلب (مفصولة بفواصل)' : 'Heart Notes (comma separated)'}</label>
                  <input 
                    type="text"
                    value={prodForm.notesHeart}
                    onChange={e => setProdForm({ ...prodForm, notesHeart: e.target.value })}
                    placeholder="e.g. الأوركيد, الورد"
                    className="form-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'النوتات القاعدية (مفصولة بفواصل)' : 'Base Notes (comma separated)'}</label>
                  <input 
                    type="text"
                    value={prodForm.notesBase}
                    onChange={e => setProdForm({ ...prodForm, notesBase: e.target.value })}
                    placeholder="e.g. المسك, جوز الهند"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              {/* SECTION G: Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'درجة الثبات' : 'Longevity metric'}</label>
                  <select
                    value={prodForm.metricLongevity}
                    onChange={e => setProdForm({ ...prodForm, metricLongevity: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="eternal">{isAr ? 'أبدي (12+ ساعة)' : 'Eternal'}</option>
                    <option value="long_lasting">{isAr ? 'طويل الأمد (8-12 ساعة)' : 'Long-lasting'}</option>
                    <option value="moderate">{isAr ? 'متوسط (4-8 ساعات)' : 'Moderate'}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'درجة الفوحان والانتشار' : 'Sillage metric'}</label>
                  <select
                    value={prodForm.metricSillage}
                    onChange={e => setProdForm({ ...prodForm, metricSillage: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="heavy">{isAr ? 'قوي وفواح جداً' : 'Heavy'}</option>
                    <option value="moderate">{isAr ? 'معتدل وجذاب' : 'Moderate'}</option>
                    <option value="soft">{isAr ? 'ناعم وهادئ' : 'Soft'}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{isAr ? 'وقت الاستخدام المفضل' : 'Best Time of Day'}</label>
                  <select
                    value={prodForm.metricTime}
                    onChange={e => setProdForm({ ...prodForm, metricTime: e.target.value })}
                    className="form-input text-xs"
                  >
                    <option value="all_day">{isAr ? 'طوال اليوم' : 'All day'}</option>
                    <option value="day">{isAr ? 'نهاري' : 'Day'}</option>
                    <option value="night">{isAr ? 'مسائي' : 'Night'}</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end gap-1 pb-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">{isAr ? 'مواسم الاستخدام الملائمة' : 'Best Seasons'}</span>
                  <span className="text-[10px] text-zinc-400 italic">
                    {isAr ? 'جميع الفصول (افتراضي)' : 'All Seasons (Default)'}
                  </span>
                </div>
              </div>

              {/* Submit CTA row */}
              <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
                <LuxuryButton 
                  variant="secondary"
                  onClick={() => setEditingProduct(null)}
                  className="py-3 px-6 text-xs"
                >
                  {isAr ? 'إلغاء التعديل' : 'Cancel'}
                </LuxuryButton>
                <LuxuryButton 
                  type="submit"
                  variant="primary"
                  className="py-3 px-8 text-xs"
                >
                  {isAr ? 'حفظ العطر بالكتالوج' : 'Save Scent'}
                </LuxuryButton>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 6. ORDER DETAIL VIEW MODAL OVERLAY */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl rounded-[3rem] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 flex flex-col gap-6 text-start max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-sans-en text-base font-bold text-[var(--color-text-primary)]">{viewingOrder.orderId}</span>
                <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded ${
                  viewingOrder.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                  viewingOrder.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  {viewingOrder.status}
                </span>
              </div>
              <LuxuryButton 
                variant="ghost"
                onClick={() => setViewingOrder(null)}
                className="!p-0 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] hover:!text-red-500 font-bold"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </LuxuryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Customer Contact & Address info */}
              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-2 flex items-center gap-1">
                    <User size={14} />
                    <span>{isAr ? 'بيانات العميل' : 'Customer Info'}</span>
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">{viewingOrder.customer?.name}</span>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--color-text-secondary)] font-mono">{viewingOrder.customer?.phone}</span>
                      <LuxuryButton 
                        variant="icon"
                        onClick={() => handleCopy(viewingOrder.customer?.phone, 'phone')}
                        className="!p-1 !w-auto !h-auto !min-h-0 !min-w-0 border border-[var(--color-border)] text-zinc-500 hover:!text-[var(--color-gold)] transition-colors"
                        title={isAr ? 'نسخ الهاتف' : 'Copy phone'}
                      >
                        {copiedId === 'phone' ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                      </LuxuryButton>
                      
                      {/* Whatsapp contact direct action */}
                      <a 
                        href={`https://wa.me/${viewingOrder.customer?.whatsapp?.replace(/[\s+]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded border border-emerald-500/20 text-[#25D366] hover:bg-emerald-500/5 transition-colors"
                        title={isAr ? 'متابعة عبر الواتساب' : 'WhatsApp follow-up'}
                      >
                        <WhatsappLogo size={10} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{isAr ? 'تفاصيل التوصيل' : 'Delivery Address'}</span>
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed">
                    <strong>{isAr ? 'المدينة:' : 'City:'}</strong> {viewingOrder.customer?.city} <br />
                    <strong>{isAr ? 'المنطقة:' : 'Area:'}</strong> {viewingOrder.customer?.area} <br />
                    <strong>{isAr ? 'العنوان:' : 'Address:'}</strong> {viewingOrder.customer?.address}
                  </p>
                </div>

                {viewingOrder.customer?.notes && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-1.5">{isAr ? 'ملاحظات العميل' : 'Customer Notes'}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] italic bg-[var(--color-bg-primary)] p-3 rounded-lg border border-[var(--color-border)]">
                      "{viewingOrder.customer?.notes}"
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-2">{isAr ? 'تفاصيل الفاتورة' : 'Invoice Details'}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] font-light">
                    <strong>{isAr ? 'تاريخ الطلب:' : 'Order Date:'}</strong> {viewingOrder.orderDate} <br />
                    <strong>{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</strong> {viewingOrder.paymentMethod === 'cod' ? (isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery') : viewingOrder.paymentMethod} <br />
                    <strong>{isAr ? 'اللغة المستخدمة:' : 'Language used:'}</strong> {viewingOrder.languageUsed === 'ar' ? 'العربية' : 'English'}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] mb-2">{isAr ? 'تحديث حالة الطلب' : 'Update Status'}</h4>
                  <select 
                    value={viewingOrder.status}
                    onChange={e => handleStatusChange(viewingOrder.orderId, e.target.value)}
                    className="form-input text-xs font-bold py-2.5 px-4 rounded-xl border-[var(--color-border)] bg-[var(--color-bg-primary)] focus:outline-none cursor-pointer w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Items & Pricing breakdown */}
              <div className="flex flex-col gap-5 border-l border-[var(--color-border)]/40 pl-0 md:pl-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold)] border-b border-[var(--color-border)] pb-2 flex items-center gap-1">
                  <ShoppingBag size={14} />
                  <span>{isAr ? 'العطور المطلوبة' : 'Items Ordered'}</span>
                </h4>

                <div className="flex flex-col gap-3">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/30 pb-2">
                      <div className="flex flex-col text-start">
                        <span className="font-bold text-[var(--color-text-primary)]">{isAr ? item.title?.ar : item.title?.en}</span>
                        <span className="text-[9px] text-[var(--color-text-muted)] tracking-wider mt-0.5">
                          {item.quantity} × {item.price.toFixed(2)} JOD
                        </span>
                      </div>
                      <span className="font-bold text-[var(--color-text-primary)] shrink-0">
                        {((item.price || 0) * (item.quantity || 1)).toFixed(2)} JOD
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-4 mt-2">
                  <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-light">
                    <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span>{(viewingOrder.subtotal || 0).toFixed(2)} JOD</span>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-light">
                    <span>{isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
                    <span>+{(viewingOrder.deliveryFee || 0).toFixed(2)} JOD</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[var(--color-text-primary)] border-t border-[var(--color-border)]/40 pt-3">
                    <span>{isAr ? 'المجموع النهائي' : 'Grand Total'}</span>
                    <span className="text-[var(--color-gold)]">{(viewingOrder.total || 0).toFixed(2)} JOD</span>
                  </div>
                </div>

                {/* Confirm on WhatsApp trigger */}
                <a 
                  href={`https://wa.me/${viewingOrder.customer?.whatsapp?.replace(/[\s+]/g, '')}?text=${encodeURIComponent(
                    isAr 
                      ? `مرحباً ${viewingOrder.customer?.name}، نود تأكيد طلبكم رقم ${viewingOrder.orderId} من DAHAB PERFUMES بقيمة ${viewingOrder.total?.toFixed(2)} دينار.`
                      : `Hello ${viewingOrder.customer?.name}, we would like to confirm your order ${viewingOrder.orderId} from DAHAB PERFUMES for a total of ${viewingOrder.total?.toFixed(2)} JOD.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md mt-4"
                >
                  <WhatsappLogo size={16} weight="bold" />
                  <span>{isAr ? 'تأكيد الطلب واتساب' : 'Confirm via WhatsApp'}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
