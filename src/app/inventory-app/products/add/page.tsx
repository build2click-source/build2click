'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Save, Weight, Layers, Droplets, Calendar, Store, X } from 'lucide-react';

const FMCG_CATEGORIES = ['Baby Care', 'Beverages', 'Canned & Preserved', 'Condiments', 'Dairy', 'Frozen Foods', 'Health', 'Household', 'Packaged Foods', 'Personal Care', 'Snacks', 'Staples', 'Electronics', 'Furniture', 'Stationery', 'Networking'];

const UNITS: Record<string, { label: string; options: string[] }> = {
    weight: { label: 'Weight', options: ['g', 'kg', 'mg'] },
    volume: { label: 'Volume', options: ['ml', 'L'] },
    pieces: { label: 'Pieces / Count', options: ['pcs', 'tabs', 'bags', 'sachets', 'strips'] },
};

export default function AddProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [gstEnabled, setGstEnabled] = useState(false);

    // Core fields
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [skuEdited, setSkuEdited] = useState(false);
    const [section, setSection] = useState('');
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [price, setPrice] = useState('');
    const [gstPercent, setGstPercent] = useState('0');
    const [discountPercent, setDiscountPercent] = useState('0');
    const [lowStockThreshold, setLowStockThreshold] = useState('10');

    // Measurement fields
    const [measurementType, setMeasurementType] = useState<'weight' | 'volume' | 'pieces'>('pieces');
    const [measurementValue, setMeasurementValue] = useState('');
    const [measurementUnit, setMeasurementUnit] = useState('pcs');

    // Expiry
    const [hasExpiry, setHasExpiry] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');

    // Stock / carton
    const [cartonsCount, setCartonsCount] = useState('');
    const [itemsPerCarton, setItemsPerCarton] = useState('');
    const [manualStock, setManualStock] = useState('');
    const totalUnitsFromCarton = cartonsCount && itemsPerCarton ? parseInt(cartonsCount) * parseInt(itemsPerCarton) : 0;
    const finalStock = totalUnitsFromCarton > 0 ? totalUnitsFromCarton : parseInt(manualStock) || 0;

    // Store
    const [storeId, setStoreId] = useState('');
    const [stores, setStores] = useState<{ id: string; name: string; branch?: string }[]>([]);
    const [existingSections, setExistingSections] = useState<string[]>([]);

    // Variants
    const [hasVariants, setHasVariants] = useState(false);
    const [variants, setVariants] = useState<{ value: string; price: string; stock: string; lowStock: string; expiry: string; sku?: string }[]>([
        { value: '', price: '', stock: '', lowStock: '10', expiry: '' }
    ]);

    // Suggestions
    const [existingNames, setExistingNames] = useState<string[]>([]);
    const [showNameSuggestions, setShowNameSuggestions] = useState(false);
    const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');

    useEffect(() => {
        fetch('/inventory-app/api/settings').then(r => r.json()).then(d => setGstEnabled(d.gst_enabled === 'true'));
        fetch('/inventory-app/api/stores').then(r => r.json()).then(d => { setStores(d); if (d.length > 0) setStoreId(d[0].id); });
        // Fetch existing categories and product names from the database
        fetch('/inventory-app/api/products').then(r => r.json()).then((products: any[]) => {
            const sections = [...new Set(products.map((p: any) => p.section).filter(Boolean))] as string[];
            setExistingSections(sections);
            const names = [...new Set(products.map((p: any) => p.name).filter(Boolean))] as string[];
            setExistingNames(names);
        });
    }, []);

    const effectiveSection = isNewCategory ? newCategoryName : section;

    const fetchSku = useCallback(async (cat: string) => {
        if (!cat || skuEdited) return;
        const res = await fetch(`/inventory-app/api/products/sku-preview?category=${encodeURIComponent(cat)}`);
        const data = await res.json();
        setSku(data.sku);
    }, [skuEdited]);

    useEffect(() => { if (effectiveSection) fetchSku(effectiveSection); }, [effectiveSection, fetchSku]);

    // When measurement type changes, reset unit to first option
    const handleMeasurementType = (type: 'weight' | 'volume' | 'pieces') => {
        setMeasurementType(type);
        setMeasurementUnit(UNITS[type].options[0]);
    };

    const allSections = [...new Set([...FMCG_CATEGORIES, ...existingSections])].sort();
    const filteredSections = categorySearch
        ? allSections.filter(s => s.toLowerCase().includes(categorySearch.toLowerCase()))
        : allSections;

    const filteredNames = name.length >= 2
        ? existingNames.filter(n => n.toLowerCase().includes(name.toLowerCase()))
        : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!effectiveSection) { setError('Please select or enter a category.'); return; }
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const variantList = hasVariants ? variants : [{ 
                value: `${measurementValue}${measurementUnit}`, 
                price, 
                stock: finalStock.toString(),
                lowStock: lowStockThreshold,
                expiry: hasExpiry ? expiryDate : ''
            }];

            for (const v of variantList) {
                const res = await fetch('/inventory-app/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: hasVariants ? `${name} ${v.value}` : name,
                        sku: v.sku || (hasVariants ? `${sku}-${v.value.replace(/\s+/g, '')}` : sku),
                        section: effectiveSection,
                        price: v.price || price,
                        gstPercent: gstEnabled ? gstPercent : '0',
                        discountPercent,
                        stockQuantity: parseInt(v.stock) || 0,
                        lowStockThreshold: parseInt(v.lowStock) || 10,
                        measurementType: measurementType,
                        measurementValue: hasVariants ? parseFloat(v.value) || null : parseFloat(measurementValue) || null,
                        measurementUnit: measurementUnit,
                        expiryDate: v.expiry || null,
                        storeId: storeId || null,
                    }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Something went wrong');
                }
            }

            setSuccess(hasVariants ? 'Variants added successfully!' : 'Product added successfully!');
            setName(''); setSku(''); setSkuEdited(false); setPrice('');
            setCartonsCount(''); setItemsPerCarton(''); setManualStock('');
            setMeasurementValue(''); setExpiryDate(''); setHasExpiry(false);
            setVariants([{ value: '', price: '', stock: '', lowStock: '10', expiry: '' }]);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addVariant = () => setVariants([...variants, { value: '', price: '', stock: '', lowStock: '10', expiry: '' }]);
    const updateVariant = (index: number, field: keyof typeof variants[0], val: string) => {
        const newV = [...variants];
        newV[index] = { ...newV[index], [field]: val };
        setVariants(newV);
    };
    const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));

    const sectionBox = (type: 'weight' | 'volume' | 'pieces', icon: React.ReactNode, label: string) => (
        <button
            type="button"
            onClick={() => handleMeasurementType(type)}
            style={{
                flex: 1, padding: '0.75rem 1rem', border: `2px solid ${measurementType === type ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '0.75rem', background: measurementType === type ? 'rgba(37,99,235,0.06)' : 'transparent',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                color: measurementType === type ? 'var(--primary)' : '#64748b', transition: 'all 0.16s'
            }}
        >
            {icon}
            <span style={{ fontWeight: 600, fontSize: '0.78rem' }}>{label}</span>
        </button>
    );

    return (
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Package /> Add New Product
                </h1>
                <p className="page-description">Fill in the details to add a new inventory item.</p>
            </div>

            <form onSubmit={handleSubmit}>
                {error && <div style={{ padding: '1rem', background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
                {success && <div style={{ padding: '1rem', background: '#ecfdf5', color: '#10b981', border: '1px solid #6ee7b7', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{success}</div>}

                {/* ── Section 1: Basic Info ─────────────────── */}
                <div className="card glass-panel" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '1.25rem' }}>📝 Basic Info</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                        <div className="input-group">
                            <label className="input-label" htmlFor="name">Product Name *</label>
                            <div style={{ position: 'relative' }}>
                                <input id="name" type="text" className="input-field" value={name}
                                    onChange={e => { setName(e.target.value); setShowNameSuggestions(true); }}
                                    onFocus={() => setShowNameSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowNameSuggestions(false), 200)}
                                    placeholder="e.g. Amul Butter 500g" required autoComplete="off" />
                                {showNameSuggestions && filteredNames.length > 0 && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', marginTop: '0.25rem' }}>
                                        {filteredNames.slice(0, 8).map(n => (
                                            <button key={n} type="button" onMouseDown={() => { setName(n); setShowNameSuggestions(false); }}
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                            >{n}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Category *</label>
                            <div style={{ position: 'relative' }}>
                                <input type="text" className="input-field" value={isNewCategory ? newCategoryName : (section || categorySearch)}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setCategorySearch(val);
                                        setShowCategorySuggestions(true);
                                        // Check if typed value matches existing
                                        const match = allSections.find(s => s.toLowerCase() === val.toLowerCase());
                                        if (match) { setSection(match); setIsNewCategory(false); }
                                        else { setSection(''); setIsNewCategory(true); setNewCategoryName(val); }
                                    }}
                                    onFocus={() => { setShowCategorySuggestions(true); setCategorySearch(''); }}
                                    onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 200)}
                                    placeholder="Type to search or add new..." required autoComplete="off"
                                    style={{ borderColor: isNewCategory && newCategoryName ? '#2563eb' : undefined }}
                                />
                                {isNewCategory && newCategoryName && (
                                    <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.65rem', fontWeight: 700, color: '#2563eb', background: 'rgba(37,99,235,0.08)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>NEW</span>
                                )}
                                {showCategorySuggestions && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxHeight: '220px', overflowY: 'auto', marginTop: '0.25rem' }}>
                                        {filteredSections.map(s => (
                                            <button key={s} type="button"
                                                onMouseDown={() => { setSection(s); setIsNewCategory(false); setCategorySearch(''); setShowCategorySuggestions(false); }}
                                                style={{ width: '100%', padding: '0.5rem 0.75rem', border: 'none', background: section === s ? '#eff6ff' : 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: '#334155', fontWeight: section === s ? 700 : 400 }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                                                onMouseLeave={e => (e.currentTarget.style.background = section === s ? '#eff6ff' : 'transparent')}
                                            >{s}{existingSections.includes(s) && !FMCG_CATEGORIES.includes(s) ? ' ✦' : ''}</button>
                                        ))}
                                        {categorySearch && !allSections.some(s => s.toLowerCase() === categorySearch.toLowerCase()) && (
                                            <button type="button"
                                                onMouseDown={() => { setIsNewCategory(true); setNewCategoryName(categorySearch); setShowCategorySuggestions(false); }}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'none', borderTop: '1px solid #e2e8f0', background: '#eff6ff', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}
                                            >➕ Create &quot;{categorySearch}&quot;</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="sku">
                                SKU Code *{!skuEdited && <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.75rem', marginLeft: '0.5rem' }}>(auto-generated)</span>}
                            </label>
                            <input id="sku" type="text" className="input-field" value={sku} onChange={e => { setSku(e.target.value); setSkuEdited(true); }} placeholder="Auto-filled from category" required />
                        </div>

                        {/* Store selector */}
                        <div className="input-group">
                            <label className="input-label" htmlFor="store"><Store size={13} style={{ display: 'inline', marginRight: '0.3rem' }} />Store / Warehouse</label>
                            <select id="store" className="input-field" value={storeId} onChange={e => setStoreId(e.target.value)}>
                                <option value="">No specific store</option>
                                {stores.map(s => <option key={s.id} value={s.id}>{s.name}{s.branch ? ` — ${s.branch}` : ''}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Section 2: Pricing ───────────────────── */}
                <div className="card glass-panel" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '1.25rem' }}>💰 Pricing</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '1.25rem' }}>
                        <div className="input-group">
                            <label className="input-label" htmlFor="price">Base Price (₹) *</label>
                            <input id="price" type="number" step="0.01" min="0" className="input-field" value={price} onChange={e => setPrice(e.target.value)} required />
                        </div>
                        {gstEnabled && (
                            <div className="input-group">
                                <label className="input-label" htmlFor="gstPercent">GST (%)</label>
                                <select id="gstPercent" className="input-field" value={gstPercent} onChange={e => setGstPercent(e.target.value)}>
                                    {['0', '5', '12', '18', '28'].map(v => <option key={v} value={v}>{v}%{v === '0' ? ' (Exempt)' : ''}</option>)}
                                </select>
                            </div>
                        )}
                        <div className="input-group">
                            <label className="input-label" htmlFor="discountPercent">Default Discount (%)</label>
                            <input id="discountPercent" type="number" step="0.1" min="0" max="100" className="input-field" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="card glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ flex: '1 1 min-content' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>📊 Product Variants</h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>Define different weights, sizes or counts for this product.</p>
                        </div>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: '#f8fafc', padding: '0.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                            {['pieces', 'weight', 'volume'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleMeasurementType(type as any)}
                                    style={{
                                        padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600,
                                        background: measurementType === type ? (type === 'pieces' ? 'var(--primary)' : 'white') : 'transparent',
                                        color: measurementType === type ? (type === 'pieces' ? 'white' : 'var(--primary)') : '#64748b',
                                        boxShadow: measurementType === type ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        border: type === 'pieces' ? `2px solid ${measurementType === 'pieces' ? 'var(--primary)' : '#e2e8f0'}` : 'none',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {type === 'pieces' ? <Layers size={14} /> : type === 'weight' ? <Weight size={14} /> : <Droplets size={14} />}
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                            <div style={{ borderLeft: '1px solid #e2e8f0', margin: '0 0.25rem' }}></div>
                            <select 
                                className="input-field" 
                                value={measurementUnit} 
                                onChange={e => setMeasurementUnit(e.target.value)}
                                style={{ 
                                    padding: '0.2rem 0.5rem', height: '100%', 
                                    border: '1px solid var(--border)', background: '#f1f5f9', 
                                    fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.4rem',
                                    color: 'var(--primary)', outline: 'none'
                                }}
                            >
                                {UNITS[measurementType].options.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ padding: '0 0.25rem' }}>
                        {variants.map((v, i) => (
                            <div key={i} style={{ 
                                display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', 
                                background: 'rgba(37,99,235,0.03)', padding: '1rem', borderRadius: '0.75rem', 
                                border: '1px solid rgba(37,99,235,0.15)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                                position: 'relative'
                            }}>
                                <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Weight / Value</label>
                                    <input 
                                        type="text" 
                                        className="input-field" 
                                        value={v.value} 
                                        onChange={e => updateVariant(i, 'value', e.target.value)} 
                                        placeholder={`e.g. 20${measurementUnit}`} 
                                        required 
                                        style={{ background: 'white', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Price (₹)</label>
                                    <input 
                                        type="number" 
                                        className="input-field" 
                                        value={v.price} 
                                        onChange={e => updateVariant(i, 'price', e.target.value)} 
                                        placeholder="Price" 
                                        required 
                                        style={{ background: 'white', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div style={{ flex: '1 1 90px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Stock</label>
                                    <input 
                                        type="number" 
                                        className="input-field" 
                                        value={v.stock} 
                                        onChange={e => updateVariant(i, 'stock', e.target.value)} 
                                        placeholder="TS" 
                                        required 
                                        style={{ background: 'white', fontWeight: 700, border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div style={{ flex: '1 1 110px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Alert at</label>
                                    <input 
                                        type="number" 
                                        className="input-field" 
                                        value={v.lowStock} 
                                        onChange={e => updateVariant(i, 'lowStock', e.target.value)} 
                                        placeholder="Alert at" 
                                        required 
                                        style={{ background: 'white', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Expiry Date</label>
                                    <input 
                                        type="date" 
                                        className="input-field" 
                                        value={v.expiry} 
                                        onChange={e => updateVariant(i, 'expiry', e.target.value)} 
                                        style={{ background: 'white', fontSize: '0.8rem', border: '1px solid #e2e8f0' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '0.5rem' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => removeVariant(i)} 
                                        style={{ 
                                            border: '1px solid #fca5a5', background: '#fef2f2', color: '#ef4444', 
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: '32px', height: '32px', borderRadius: '50%', transition: 'all 0.2s',
                                            marginTop: '1.2rem'
                                        }} 
                                        onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                                        onMouseLeave={e => (e.currentTarget.style.background = '#fef2f2')}
                                        disabled={variants.length === 1}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addVariant} className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem', border: '1px dashed #cbd5e1', background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
                            + Add Another Variant
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn-secondary" onClick={() => router.push('/inventory-app/products')} disabled={isSubmitting}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        <Save size={18} /> {isSubmitting ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
