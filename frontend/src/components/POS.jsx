import React, { useState, useEffect } from 'react'
import API, { setToken } from '../services/api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --pink-50: #fff0f6;
    --pink-100: #ffe0ef;
    --pink-200: #ffc2d9;
    --pink-300: #ff94bc;
    --pink-400: #ff5c97;
    --pink-500: #f72d72;
    --pink-600: #d9165a;
    --pink-700: #b0103f;
    --pink-800: #7a0b2c;
    --rose: #ff3370;
    --blush: #fce4ec;
    --cream: #fff8fa;
    --white: #ffffff;
    --text-dark: #2d0a17;
    --text-mid: #6b2240;
    --text-light: #b06080;
    --shadow-sm: 0 2px 8px rgba(247,45,114,0.08);
    --shadow-md: 0 6px 24px rgba(247,45,114,0.14);
    --shadow-lg: 0 16px 48px rgba(247,45,114,0.18);
    --radius: 18px;
    --radius-sm: 10px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--text-dark);
    min-height: 100vh;
  }

  .pos-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #fff0f6 0%, #fff8fa 50%, #ffe4ef 100%);
    padding: 0;
  }

  /* Top Bar */
  .pos-topbar {
    background: linear-gradient(90deg, var(--pink-500) 0%, var(--pink-400) 100%);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(247,45,114,0.25);
  }
  .pos-topbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .pos-topbar-icon {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.25);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .pos-topbar-title {
    font-family: 'Playfair Display', serif;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
  .pos-topbar-subtitle {
    color: rgba(255,255,255,0.75);
    font-size: 12px;
    font-weight: 300;
    margin-top: 1px;
  }
  .pos-topbar-time {
    color: rgba(255,255,255,0.9);
    font-size: 13px;
    font-weight: 500;
    background: rgba(255,255,255,0.15);
    padding: 6px 14px;
    border-radius: 20px;
  }

  /* Main layout */
  .pos-main {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    padding: 24px 32px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Section headers */
  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-dark);
  }
  .section-badge {
    background: var(--pink-100);
    color: var(--pink-600);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }

  /* Product Grid */
  .products-panel {
    background: var(--white);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    border: 1.5px solid var(--pink-100);
  }

  .products-search {
    position: relative;
    margin-bottom: 20px;
  }
  .products-search input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    background: var(--pink-50);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .products-search input:focus {
    border-color: var(--pink-400);
    box-shadow: 0 0 0 3px rgba(247,45,114,0.1);
    background: #fff;
  }
  .products-search input::placeholder { color: var(--text-light); }
  .products-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--pink-400);
    font-size: 16px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 14px;
  }

  /* Product Card */
  .product-card {
    background: linear-gradient(145deg, #fff 0%, var(--pink-50) 100%);
    border: 1.5px solid var(--pink-100);
    border-radius: var(--radius);
    padding: 18px 14px 14px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    overflow: hidden;
  }
  .product-card::before {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, var(--pink-200) 0%, transparent 70%);
    opacity: 0.5;
    pointer-events: none;
  }
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--pink-300);
  }
  .product-card:active { transform: scale(0.97); }

  .product-card-emoji {
    font-size: 28px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .product-card-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
    line-height: 1.3;
  }
  .product-card-price {
    font-size: 16px;
    font-weight: 700;
    color: var(--pink-500);
    font-family: 'Playfair Display', serif;
  }
  .product-card-stock {
    font-size: 11px;
    color: var(--text-light);
    font-weight: 400;
  }
  .product-card-add {
    margin-top: 6px;
    background: linear-gradient(135deg, var(--pink-400), var(--pink-500));
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 7px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.1s;
    width: 100%;
  }
  .product-card-add:hover { opacity: 0.88; }
  .product-card-add:active { transform: scale(0.96); }
  .product-card-add:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
  .product-card-out {
    font-size: 10px;
    font-weight: 600;
    color: #e05; text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Cart Panel */
  .cart-panel {
    background: var(--white);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    border: 1.5px solid var(--pink-100);
    display: flex;
    flex-direction: column;
    height: fit-content;
    position: sticky;
    top: 24px;
  }

  .cart-empty {
    text-align: center;
    padding: 40px 0 32px;
    color: var(--text-light);
  }
  .cart-empty-icon { font-size: 42px; margin-bottom: 12px; }
  .cart-empty-text { font-size: 14px; }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    max-height: 340px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .cart-items::-webkit-scrollbar { width: 4px; }
  .cart-items::-webkit-scrollbar-track { background: var(--pink-50); border-radius: 4px; }
  .cart-items::-webkit-scrollbar-thumb { background: var(--pink-300); border-radius: 4px; }

  .cart-item {
    background: var(--pink-50);
    border: 1.5px solid var(--pink-100);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: border-color 0.2s;
  }
  .cart-item:hover { border-color: var(--pink-300); }

  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-item-unit {
    font-size: 11px;
    color: var(--text-light);
    margin-top: 1px;
  }

  .cart-item-qty {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .qty-btn {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    border: 1.5px solid var(--pink-200);
    background: #fff;
    color: var(--pink-500);
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, border-color 0.15s;
    line-height: 1;
  }
  .qty-btn:hover { background: var(--pink-100); border-color: var(--pink-400); }
  .qty-input {
    width: 34px;
    text-align: center;
    border: 1.5px solid var(--pink-200);
    border-radius: 6px;
    padding: 3px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
    background: #fff;
    outline: none;
  }
  .qty-input:focus { border-color: var(--pink-400); }

  .cart-item-subtotal {
    font-size: 13px;
    font-weight: 700;
    color: var(--pink-600);
    min-width: 52px;
    text-align: right;
  }

  .cart-item-remove {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #ccc;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .cart-item-remove:hover { background: #ffe0e0; color: #e05; }

  /* Cart Total */
  .cart-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--pink-200), transparent);
    margin: 4px 0 16px;
  }

  .cart-summary {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  }
  .cart-summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-light);
  }
  .cart-total-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 4px;
  }
  .cart-total-label {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-dark);
  }
  .cart-total-amount {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--pink-500);
    line-height: 1;
  }

  /* Action Buttons */
  .cart-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .btn-checkout {
    background: linear-gradient(135deg, var(--pink-400) 0%, var(--pink-600) 100%);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    padding: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(247,45,114,0.3);
  }
  .btn-checkout:hover { opacity: 0.9; box-shadow: 0 6px 20px rgba(247,45,114,0.4); }
  .btn-checkout:active { transform: scale(0.98); }
  .btn-checkout:disabled { background: #ddd; box-shadow: none; cursor: not-allowed; }

  .btn-print {
    background: var(--white);
    color: var(--pink-500);
    border: 1.5px solid var(--pink-300);
    border-radius: var(--radius-sm);
    padding: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .btn-print:hover { background: var(--pink-50); border-color: var(--pink-400); }
  .btn-print:disabled { opacity: 0.45; cursor: not-allowed; }

  .btn-clear {
    background: transparent;
    color: var(--text-light);
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }
  .btn-clear:hover { color: #e05; }

  /* Receipt Modal */
  .receipt-overlay {
    position: fixed;
    inset: 0;
    background: rgba(45, 10, 23, 0.45);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .receipt-modal {
    background: #fff;
    border-radius: 24px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 30px 80px rgba(247,45,114,0.25);
    overflow: hidden;
    animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

  .receipt-header {
    background: linear-gradient(135deg, var(--pink-400), var(--pink-600));
    padding: 28px 28px 22px;
    text-align: center;
    color: #fff;
  }
  .receipt-logo { font-size: 32px; margin-bottom: 6px; }
  .receipt-store-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .receipt-tagline { font-size: 12px; opacity: 0.8; margin-top: 2px; }
  .receipt-date-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 12px;
    margin-top: 10px;
  }

  .receipt-body { padding: 20px 24px; }

  .receipt-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }
  .receipt-table th {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: var(--text-light);
    padding: 0 0 10px;
    border-bottom: 1.5px solid var(--pink-100);
  }
  .receipt-table th:not(:first-child) { text-align: right; }
  .receipt-table td {
    padding: 9px 0;
    font-size: 13px;
    color: var(--text-dark);
    border-bottom: 1px solid var(--pink-50);
  }
  .receipt-table td:not(:first-child) { text-align: right; }
  .receipt-table td:first-child { font-weight: 500; }
  .receipt-table td.qty { color: var(--text-light); font-size: 12px; }

  .receipt-total-section {
    background: var(--pink-50);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    border: 1.5px solid var(--pink-100);
  }
  .receipt-total-label {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text-dark);
  }
  .receipt-total-value {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--pink-500);
  }

  .receipt-footer-msg {
    text-align: center;
    color: var(--text-light);
    font-size: 12px;
    margin-bottom: 18px;
    line-height: 1.6;
  }

  .receipt-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .receipt-btn-print {
    background: linear-gradient(135deg, var(--pink-400), var(--pink-600));
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .receipt-btn-print:hover { opacity: 0.88; }
  .receipt-btn-close {
    background: var(--white);
    color: var(--text-mid);
    border: 1.5px solid var(--pink-200);
    border-radius: 10px;
    padding: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .receipt-btn-close:hover { background: var(--pink-50); }

  /* Item count chip */
  .cart-count-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--pink-500);
    color: #fff;
    border-radius: 20px;
    min-width: 22px;
    height: 22px;
    font-size: 11px;
    font-weight: 700;
    padding: 0 6px;
  }

  @media (max-width: 900px) {
    .pos-main {
      grid-template-columns: 1fr;
      padding: 16px;
    }
    .cart-panel { position: static; }
    .products-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  }

  @media print {
    .pos-wrapper, .pos-topbar, .products-panel, .cart-panel, .receipt-overlay { display: none !important; }
    .receipt-modal { box-shadow: none; border-radius: 0; max-width: 100%; display: block; position: static; }
    .receipt-actions { display: none; }
  }
`

const PRODUCT_EMOJIS = ['🛍️','💄','👗','🌸','🎀','🍰','💅','🌺','👠','🎁','✨','🌷']
function getEmoji(name, idx) {
  const map = { cake:'🍰', cream:'💄', flower:'🌺', bag:'🛍️', gift:'🎁', shoe:'👠', dress:'👗' }
  const lower = name?.toLowerCase() || ''
  for (const [k, v] of Object.entries(map)) { if (lower.includes(k)) return v }
  return PRODUCT_EMOJIS[idx % PRODUCT_EMOJIS.length]
}

function ProductCard({ p, idx, onAdd }) {
  return (
    <div className="product-card" onClick={() => p.stock > 0 && onAdd(p)}>
      <div className="product-card-emoji">{getEmoji(p.name, idx)}</div>
      <div className="product-card-name">{p.name}</div>
      <div className="product-card-price">${p.price.toFixed(2)}</div>
      {p.stock > 0
        ? <div className="product-card-stock">Stock: {p.stock}</div>
        : <div className="product-card-out">Out of stock</div>
      }
      <button className="product-card-add" disabled={p.stock === 0}
        onClick={e => { e.stopPropagation(); onAdd(p) }}>
        + Add to Cart
      </button>
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  return <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
}

export default function POS({ token }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)
  const [receiptData, setReceiptData] = useState(null)

  useEffect(() => {
    setToken(token)
    fetchProducts()
  }, [token])

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products')
      setProducts(res.data)
    } catch {}
  }

  const addToCart = (p) => {
    setCart(prev => {
      const found = prev.find(x => x.product === p._id)
      if (found) return prev.map(x => x.product === p._id ? { ...x, quantity: x.quantity + 1 } : x)
      return [...prev, { product: p._id, name: p.name, price: p.price, quantity: 1 }]
    })
  }

  const updateQty = (productId, q) => {
    const val = Math.max(1, parseInt(q) || 1)
    setCart(prev => prev.map(i => i.product === productId ? { ...i, quantity: val } : i))
  }

  const removeItem = (productId) => setCart(prev => prev.filter(i => i.product !== productId))
  const clearCart = () => setCart([])

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0)
  const itemCount = cart.reduce((s, it) => s + it.quantity, 0)

  const checkout = async () => {
    if (cart.length === 0) return alert('Cart is empty')
    try {
      await API.post('/sales', { items: cart, total })
      openReceipt(cart, total)
      setCart([])
      fetchProducts()
    } catch {
      alert('Failed to save sale')
    }
  }

  const openReceipt = (items, totalAmount) => {
    if (!items?.length) return
    setReceiptData({ items, totalAmount, date: new Date().toLocaleString() })
    setShowReceipt(true)
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <style>{styles}</style>
      <div className="pos-wrapper">
        {/* Top Bar */}
        <div className="pos-topbar">
          <div className="pos-topbar-brand">
            <div className="pos-topbar-icon">🌸</div>
            <div>
              <div className="pos-topbar-title">Blossom POS</div>
              <div className="pos-topbar-subtitle">Point of Sale System</div>
            </div>
          </div>
          <div className="pos-topbar-time"><Clock /></div>
        </div>

        {/* Main */}
        <div className="pos-main">
          {/* Products */}
          <div className="products-panel">
            <div className="section-header">
              <div className="section-title">Products</div>
              <div className="section-badge">{filtered.length} items</div>
            </div>
            <div className="products-search">
              <span className="products-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="products-grid">
              {filtered.map((p, i) => (
                <ProductCard key={p._id} p={p} idx={i} onAdd={addToCart} />
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="cart-panel">
            <div className="section-header">
              <div className="section-title">Cart</div>
              {itemCount > 0 && <span className="cart-count-chip">{itemCount}</span>}
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <div className="cart-empty-text">Your cart is empty<br /><span style={{fontSize:12}}>Click a product to add</span></div>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map(i => (
                  <div key={i.product} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{i.name}</div>
                      <div className="cart-item-unit">${i.price.toFixed(2)} each</div>
                    </div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => i.quantity > 1 ? updateQty(i.product, i.quantity - 1) : removeItem(i.product)}>−</button>
                      <input
                        className="qty-input"
                        type="number"
                        value={i.quantity}
                        onChange={e => updateQty(i.product, e.target.value)}
                        min="1"
                      />
                      <button className="qty-btn" onClick={() => updateQty(i.product, i.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-item-subtotal">${(i.price * i.quantity).toFixed(2)}</div>
                    <button className="cart-item-remove" onClick={() => removeItem(i.product)} title="Remove">×</button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <>
                <div className="cart-divider" />
                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Items ({itemCount})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="cart-total-row">
                    <span className="cart-total-label">Total</span>
                    <span className="cart-total-amount">${total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

            <div className="cart-actions">
              <button className="btn-checkout" onClick={checkout} disabled={cart.length === 0}>
                🛍️ Checkout & Print
              </button>
              <button className="btn-print" onClick={() => openReceipt(cart, total)} disabled={cart.length === 0}>
                🖨️ Print Bill
              </button>
              {cart.length > 0 && (
                <button className="btn-clear" onClick={clearCart}>Clear cart</button>
              )}
            </div>
          </div>
        </div>

        {/* Receipt Modal */}
        {showReceipt && receiptData && (
          <div className="receipt-overlay" onClick={() => setShowReceipt(false)}>
            <div className="receipt-modal" onClick={e => e.stopPropagation()}>
              <div className="receipt-header">
                <div className="receipt-logo">🌸</div>
                <div className="receipt-store-name">Blossom POS</div>
                <div className="receipt-tagline">Thank you for shopping with us</div>
                <div className="receipt-date-badge">{receiptData.date}</div>
              </div>
              <div className="receipt-body">
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptData.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td className="qty">{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="receipt-total-section">
                  <span className="receipt-total-label">Total Paid</span>
                  <span className="receipt-total-value">${receiptData.totalAmount.toFixed(2)}</span>
                </div>
                <div className="receipt-footer-msg">
                  🌸 Thank you for your purchase!<br />
                  We hope to see you again soon.
                </div>
                <div className="receipt-actions">
                  <button className="receipt-btn-print" onClick={() => window.print()}>🖨️ Print</button>
                  <button className="receipt-btn-close" onClick={() => setShowReceipt(false)}>✕ Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
