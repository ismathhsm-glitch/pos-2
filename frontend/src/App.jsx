import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import POS from './components/POS'
import Sales from './components/Sales'
import AdminProducts from './components/AdminProducts'

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('pos_user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('pos_token') || '')
  const [view, setView] = useState('pos')

  useEffect(() => {
    if (!user) { setView('login') } else { setView('pos') }
  }, [user])

  const handleLogin = (user, token) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('pos_user', JSON.stringify(user))
    localStorage.setItem('pos_token', token)
  }

  const handleLogout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('pos_user')
    localStorage.removeItem('pos_token')
    setView('login')
  }

  if (view === 'login') return <Login onLogin={handleLogin} />

  return (
    <div className="app">
      <header className="topbar">
        <h1>POS System</h1>
        <div>
          <button onClick={() => setView('pos')}>POS</button>
          <button onClick={() => setView('sales')}>Sales</button>
          {user?.role === 'admin' && (
            <button onClick={() => setView('admin')}>Admin</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        {view === 'pos' && <POS token={token} />}
        {view === 'sales' && <Sales token={token} />}
        {view === 'admin' && <AdminProducts token={token} />}
      </main>
    </div>
  )
}
