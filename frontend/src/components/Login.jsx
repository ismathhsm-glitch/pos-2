import React, { useState } from 'react'
import API, { setToken } from '../services/api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@pos.local')
  const [password, setPassword] = useState('admin123')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      setToken(res.data.token)
      onLogin(res.data.user, res.data.token)
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="login">
      <form onSubmit={submit} className="card">
        <h2>Login</h2>
        {err && <div className="error">{err}</div>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
