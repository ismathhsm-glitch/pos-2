import React, { useEffect, useState } from 'react'
import API, { setToken } from '../services/api'
import AddProduct from './AddProduct'

export default function AdminProducts({ token }){
  const [products, setProducts] = useState([])
  useEffect(()=>{ setToken(token); fetch() }, [token])
  const fetch = async ()=>{ const res = await API.get('/products'); setProducts(res.data) }
  const remove = async (id)=>{ await API.delete(`/products/${id}`); fetch() }
  const update = async (id, body)=>{ await API.put(`/products/${id}`, body); fetch() }
  return (
    <div className="card admin">
      <h2>Manage Products</h2>
      <AddProduct onAdd={fetch} token={token} />
      <div className="admin-list">
        {products.map(p=> (
          <div key={p._id} className="admin-item">
            <div>{p.name}</div>
            <div>${p.price.toFixed(2)}</div>
            <div>Stock: {p.stock}</div>
            <div>
              <button onClick={()=>update(p._id, { stock: p.stock+10 })}>+10</button>
              <button onClick={()=>remove(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
