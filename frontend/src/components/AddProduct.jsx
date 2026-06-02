import React, { useState } from 'react'
import API from '../services/api'

export default function AddProduct({ onAdd }){
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const submit = async (e)=>{
    e.preventDefault()
    await API.post('/products', { name, price: Number(price), stock: Number(stock) })
    setName(''); setPrice(0); setStock(0)
    onAdd()
  }
  return (
    <form className="add-product" onSubmit={submit}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" required />
      <input type="number" value={stock} onChange={e=>setStock(e.target.value)} placeholder="Stock" required />
      <button type="submit">Add</button>
    </form>
  )
}
