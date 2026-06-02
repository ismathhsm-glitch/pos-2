import React, { useEffect, useState } from 'react'
import API, { setToken } from '../services/api'

export default function Sales({ token }) {
  const [sales, setSales] = useState([])
  useEffect(()=>{ setToken(token); fetchSales() }, [token])
  const fetchSales = async ()=>{
    const res = await API.get('/sales')
    setSales(res.data)
  }
  return (
    <div className="card">
      <h2>Sales History</h2>
      {sales.map(s=> (
        <div key={s._id} className="sale">
          <div>{new Date(s.date).toLocaleString()}</div>
          <div>Total: ${s.total.toFixed(2)}</div>
          <div>
            {s.items.map(it=> <div key={it._id}>{it.name} x {it.quantity}</div>)}
          </div>
        </div>
      ))}
    </div>
  )
}
