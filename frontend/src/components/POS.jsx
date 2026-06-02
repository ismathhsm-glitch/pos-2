import React, { useState, useEffect } from 'react'
import API, { setToken } from '../services/api'

function ProductCard({ p, onAdd }) {
  return (
    <div className="product">
      <div>{p.name}</div>
      <div>${p.price.toFixed(2)}</div>
      <div>Stock: {p.stock}</div>
      <button onClick={() => onAdd(p)}>Add</button>
    </div>
  )
}

export default function POS({ token }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    setToken(token)
    fetchProducts()
  }, [token])

  const fetchProducts = async () => {
    const res = await API.get('/products')
    setProducts(res.data)
  }

  const addToCart = (p) => {
    setCart(prev => {
      const found = prev.find(x => x.product === p._id)
      if (found) return prev.map(x => x.product === p._id ? { ...x, quantity: x.quantity+1 } : x)
      return [...prev, { product: p._id, name: p.name, price: p.price, quantity: 1 }]
    })
  }

  const updateQty = (productId, q) => {
    setCart(prev => prev.map(i => i.product === productId ? { ...i, quantity: Math.max(1, q) } : i))
  }

  const removeItem = (productId) => setCart(prev => prev.filter(i => i.product !== productId))

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0)

  const checkout = async () => {
    if (cart.length === 0) return alert('Cart is empty')
    await API.post('/sales', { items: cart, total })
    alert('Sale saved')
    setCart([])
    fetchProducts()
  }

  return (
    <div className="pos">
      <section className="products">
        <h2>Products</h2>
        <div className="grid">
          {products.map(p => <ProductCard key={p._id} p={p} onAdd={addToCart} />)}
        </div>
      </section>

      <aside className="cart">
        <h2>Cart</h2>
        {cart.map(i => (
          <div key={i.product} className="cart-item">
            <div>{i.name}</div>
            <div>${i.price.toFixed(2)}</div>
            <input type="number" value={i.quantity} onChange={e=>updateQty(i.product, parseInt(e.target.value||1))} />
            <button onClick={()=>removeItem(i.product)}>Remove</button>
          </div>
        ))}
        <div className="total">Total: ${total.toFixed(2)}</div>
        <button className="checkout" onClick={checkout}>Checkout</button>
      </aside>
    </div>
  )
}
