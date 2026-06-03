import React, { useEffect, useState } from 'react'
import API, { setToken } from '../services/api'

const styles = `
  .sales-container{
    min-height:100vh;
    padding:30px;
    background:linear-gradient(135deg,#fff0f6,#fff8fa,#ffe4ef);
    font-family:'Segoe UI',sans-serif;
  }

  .sales-header{
    margin-bottom:25px;
  }

  .sales-title{
    font-size:32px;
    font-weight:700;
    color:#d9165a;
  }

  .sales-sub{
    color:#b06080;
    margin-top:5px;
  }

  .sales-grid{
    display:grid;
    gap:20px;
  }

  .sale-card{
    background:#fff;
    border-radius:20px;
    padding:20px;
    border:1px solid #ffd6e7;
    box-shadow:0 8px 25px rgba(247,45,114,.12);
    transition:.3s;
  }

  .sale-card:hover{
    transform:translateY(-3px);
    box-shadow:0 12px 30px rgba(247,45,114,.18);
  }

  .sale-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
    flex-wrap:wrap;
  }

  .sale-date{
    color:#6b2240;
    font-size:14px;
    font-weight:600;
  }

  .sale-total{
    background:#ffe4ef;
    color:#d9165a;
    padding:8px 14px;
    border-radius:20px;
    font-weight:700;
  }

  .items-title{
    color:#d9165a;
    font-weight:700;
    margin-bottom:10px;
  }

  .sale-item{
    display:flex;
    justify-content:space-between;
    padding:10px 12px;
    margin-bottom:8px;
    border-radius:12px;
    background:#fff6f9;
    border:1px solid #ffe0ef;
  }

  .sale-item-name{
    color:#2d0a17;
    font-weight:600;
  }

  .sale-item-qty{
    color:#b06080;
  }

  .empty-box{
    background:white;
    padding:50px;
    border-radius:20px;
    text-align:center;
    color:#b06080;
    border:1px solid #ffe0ef;
  }
`

export default function Sales({ token }) {
  const [sales, setSales] = useState([])

  useEffect(() => {
    setToken(token)
    fetchSales()
  }, [token])

  const fetchSales = async () => {
    try {
      const res = await API.get('/sales')
      setSales(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <style>{styles}</style>

      <div className="sales-container">
        <div className="sales-header">
          <div className="sales-title">🌸 Sales History</div>
          <div className="sales-sub">
            View all completed sales transactions
          </div>
        </div>

        {sales.length === 0 ? (
          <div className="empty-box">
            No sales records found.
          </div>
        ) : (
          <div className="sales-grid">
            {sales.map((s) => (
              <div key={s._id} className="sale-card">

                <div className="sale-top">
                  <div className="sale-date">
                    🕒 {new Date(s.createdAt || s.date).toLocaleString()}
                  </div>

                  <div className="sale-total">
                    ${Number(s.total).toFixed(2)}
                  </div>
                </div>

                <div className="items-title">
                  🛍️ Items Purchased
                </div>

                {s.items.map((it, index) => (
                  <div key={index} className="sale-item">
                    <div className="sale-item-name">
                      {it.name}
                    </div>

                    <div className="sale-item-qty">
                      x {it.quantity}
                    </div>
                  </div>
                ))}

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}