'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package, Search, Plus, Loader2, Minus, AlertTriangle, Calendar, Store, ChevronDown, X, Check } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    sku: string;
    section: string;
    price: number;
    discountPercent: number;
    stockQuantity: number;
    lowStockThreshold: number;
    measurementValue?: number | null;
    measurementUnit?: string | null;
    expiryDate?: string | null;
    store?: { id: string; name: string; branch?: string } | null;
}

interface StoreOption { id: string; name: string; branch?: string; }

function ProductsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filterParam = searchParams.get('filter');

    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<StoreOption[]>([]);
    const [selectedStoreId, setSelectedStoreId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [localEdits, setLocalEdits] = useState<Record<string, { stockQuantity?: number; discountPercent?: number }>>({});

    useEffect(() => {
        fetch('/inventory-app/api/stores').then(r => r.json()).then(setStores);
    }, []);

    const fetchProducts = useCallback(async (storeId = '') => {
        setIsLoading(true);
        try {
            const url = storeId ? `/inventory-app/api/products?storeId=${storeId}` : '/inventory-app/api/products';
            const res = await fetch(url);
            setProducts(await res.json());
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchProducts(selectedStoreId); }, [selectedStoreId, fetchProducts]);

    const handleUpdateStockLocal = (id: string, newStock: number) => {
        if (newStock < 0) return;
        setLocalEdits(prev => ({
            ...prev,
            [id]: { ...prev[id], stockQuantity: newStock }
        }));
    };

    const handleUpdateDiscountLocal = (id: string, percent: number) => {
        if (percent < 0 || percent > 100) return;
        setLocalEdits(prev => ({
            ...prev,
            [id]: { ...prev[id], discountPercent: percent }
        }));
    };

    const saveLocalEdit = async (id: string) => {
        const edit = localEdits[id];
        if (!edit) return;
        setUpdatingId(id);
        try {
            if (edit.stockQuantity !== undefined) {
                await fetch(`/inventory-app/api/products/${id}/stock`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stockQuantity: edit.stockQuantity }),
                });
            }
            if (edit.discountPercent !== undefined) {
                await fetch(`/inventory-app/api/products/${id}/discount`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ discountPercent: edit.discountPercent }),
                });
            }
            // Update products state with final values
            setProducts(prev => prev.map(p => p.id === id ? { 
                ...p, 
                stockQuantity: edit.stockQuantity ?? p.stockQuantity,
                discountPercent: edit.discountPercent ?? p.discountPercent
            } : p));
            setLocalEdits(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        } finally {
            setUpdatingId(null);
        }
    };

    const getDaysUntilExpiry = (dateStr: string) => {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const exp = new Date(dateStr); exp.setHours(0, 0, 0, 0);
        return Math.round((exp.getTime() - today.getTime()) / 86400000);
    };

    const getExpiryStyle = (days: number) => {
        if (days <= 7) return { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: days <= 0 ? 'EXPIRED' : `Exp: ${days}d` };
        if (days <= 14) return { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', label: `Exp: ${days}d` };
        return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', label: `Exp: ${days}d` };
    };

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterParam === 'low_stock') {
        filtered = filtered.filter(p => p.stockQuantity < p.lowStockThreshold);
    } else if (filterParam === 'near_expiry') {
        filtered = filtered.filter(p => {
            if (!p.expiryDate) return false;
            const days = getDaysUntilExpiry(p.expiryDate);
            return days >= 0 && days <= 30;
        });
    }

    const grouped = filtered.reduce((acc, p) => {
        if (!acc[p.section]) acc[p.section] = {};
        const baseName = p.name.replace(/\s+\d+(g|kg|ml|L|pcs|tabs|bags|sachets|strips).*$/i, '').trim();
        if (!acc[p.section][baseName]) acc[p.section][baseName] = [];
        acc[p.section][baseName].push(p);
        return acc;
    }, {} as Record<string, Record<string, Product[]>>);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Package /> Product Management
                    </h1>
                    <p className="page-description">Manage your inventory — grouped by category.</p>
                </div>
                <Link href="/inventory-app/products/add" className="btn-primary">
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {/* Search + Store Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="card glass-panel" style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Search size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        className="input-field"
                        style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0 }}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                {stores.length > 0 && (
                    <div className="card glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem' }}>
                        <Store size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                        <select
                            value={selectedStoreId}
                            onChange={e => setSelectedStoreId(e.target.value)}
                            style={{ border: 'none', background: 'transparent', fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', cursor: 'pointer', outline: 'none', minWidth: '160px' }}
                        >
                            <option value="">All Stores</option>
                            {stores.map(s => (
                                <option key={s.id} value={s.id}>{s.name}{s.branch ? ` — ${s.branch}` : ''}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} style={{ color: '#94a3b8' }} />
                    </div>
                )}
                <div style={{ display: 'flex', background: 'var(--muted)', borderRadius: '0.625rem', padding: '4px', gap: '4px' }}>
                    <button
                        onClick={() => router.push('/inventory-app/products')}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            background: !filterParam ? 'white' : 'transparent',
                            color: !filterParam ? 'var(--foreground)' : '#64748b',
                            boxShadow: !filterParam ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                    >
                        <Package size={14} /> All Items
                    </button>
                    <button
                        onClick={() => router.push('/inventory-app/products?filter=low_stock')}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            background: filterParam === 'low_stock' ? 'white' : 'transparent',
                            color: filterParam === 'low_stock' ? '#ef4444' : '#64748b',
                            boxShadow: filterParam === 'low_stock' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                    >
                        <AlertTriangle size={14} /> Low Stock
                    </button>
                    <button
                        onClick={() => router.push('/inventory-app/products?filter=near_expiry')}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            background: filterParam === 'near_expiry' ? 'white' : 'transparent',
                            color: filterParam === 'near_expiry' ? '#f59e0b' : '#64748b',
                            boxShadow: filterParam === 'near_expiry' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}
                    >
                        <Calendar size={14} /> Near Expiry
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                    <Loader2 size={40} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); }}`}</style>
                </div>
            ) : Object.keys(grouped).length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <Package size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>No products found</h3>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                        {selectedStoreId ? 'No products for this store.' : 'Get started by adding your first product.'}
                    </p>
                    <Link href="/inventory-app/products/add" className="btn-primary" style={{ display: 'inline-flex' }}><Plus size={18} /> Add Product</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([section, items]) => (
                        <div key={section}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border)' }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>{section}</h2>
                                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.125rem 0.625rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600 }}>
                                    {Object.keys(items).length} items
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: '1.5rem' }}>
                                {Object.entries(items).map(([baseName, variants]) => {
                                    const first = variants[0];
                                    return (
                                        <div key={baseName} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}>
                                            {/* Top: Common Name */}
                                            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--foreground)' }}>{baseName}</h3>
                                                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                                                    <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '1rem', background: 'rgba(139,92,246,0.08)', color: '#7c3aed' }}>
                                                        {first.store?.branch || first.store?.name || 'Main Store'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Variants List */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {variants.sort((a, b) => (a.measurementValue || 0) - (b.measurementValue || 0)).map(product => {
                                                    const isLow = product.stockQuantity < product.lowStockThreshold;
                                                    const days = product.expiryDate ? getDaysUntilExpiry(product.expiryDate) : null;
                                                    const expStyle = days !== null ? getExpiryStyle(days) : null;
                                                    const variantLabel = product.name.replace(baseName, '').trim() || `${product.measurementValue}${product.measurementUnit}`;

                                                    return (
                                                        <div key={product.id} style={{ padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: variants.indexOf(product) < variants.length - 1 ? '1px dashed #f1f5f9' : 'none' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>{variantLabel}</span>
                                                                    {expStyle && (
                                                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '0.1rem 0.45rem', borderRadius: '1rem', background: expStyle.bg, color: expStyle.color }}>
                                                                            {expStyle.label}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</div>
                                                            </div>

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isLow ? '#ef4444' : '#22c55e', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                                        {isLow && <AlertTriangle size={12} />}
                                                                        {product.stockQuantity} {isLow ? `/ ${product.lowStockThreshold}` : 'pcs'}
                                                                    </span>
                                                                </div>

                                                                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: (localEdits[product.id]?.discountPercent ?? product.discountPercent) > 0 ? 'rgba(239,68,68,0.05)' : '#f8fafc', padding: '0.2rem', borderRadius: '0.5rem', border: `1px solid ${(localEdits[product.id]?.discountPercent ?? product.discountPercent) > 0 ? '#fca5a5' : '#e2e8f0'}` }}>
                                                                            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: (localEdits[product.id]?.discountPercent ?? product.discountPercent) > 0 ? '#ef4444' : '#64748b' }}>% OFF</span>
                                                                                <input
                                                                                    type="number"
                                                                                    value={localEdits[product.id]?.discountPercent ?? product.discountPercent}
                                                                                    onChange={e => handleUpdateDiscountLocal(product.id, parseFloat(e.target.value) || 0)}
                                                                                    style={{ width: '42px', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', color: (localEdits[product.id]?.discountPercent ?? product.discountPercent) > 0 ? '#ef4444' : 'inherit', padding: 0 }}
                                                                                />
                                                                        </div>
                                                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: '#f8fafc', padding: '0.15rem', borderRadius: '0.4rem', border: '1px solid #e2e8f0' }}>
                                                                            <button onClick={() => handleUpdateStockLocal(product.id, (localEdits[product.id]?.stockQuantity ?? product.stockQuantity) - 1)} className="btn-secondary" style={{ padding: 0, minWidth: 'auto', height: '22px', width: '22px', fontSize: '10px' }} disabled={updatingId === product.id}>-</button>
                                                                            <input type="number" value={localEdits[product.id]?.stockQuantity ?? product.stockQuantity} onChange={e => handleUpdateStockLocal(product.id, parseInt(e.target.value) || 0)} style={{ width: '44px', border: 'none', background: 'transparent', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', padding: 0 }} />
                                                                            <button onClick={() => handleUpdateStockLocal(product.id, (localEdits[product.id]?.stockQuantity ?? product.stockQuantity) + 1)} className="btn-secondary" style={{ padding: 0, minWidth: 'auto', height: '22px', width: '22px', fontSize: '10px' }} disabled={updatingId === product.id}>+</button>
                                                                        </div>
                                                                        {localEdits[product.id] && (
                                                                            <button 
                                                                                onClick={() => saveLocalEdit(product.id)}
                                                                                className="btn-primary"
                                                                                style={{ padding: '0.3rem', minWidth: 'auto', height: '28px', width: '28px', borderRadius: '0.5rem' }}
                                                                                disabled={updatingId === product.id}
                                                                                title="Save changes"
                                                                            >
                                                                                {updatingId === product.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}><Loader2 size={40} className="animate-spin text-primary" /></div>}>
            <ProductsContent />
        </Suspense>
    );
}
