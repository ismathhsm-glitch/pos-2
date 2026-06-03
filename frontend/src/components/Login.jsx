import React, { useState } from 'react'
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
    --cream: #fff8fa;
    --text-dark: #2d0a17;
    --text-mid: #6b2240;
    --text-light: #b06080;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, #fff0f6 0%, #fff8fa 50%, #ffe4ef 100%);
    position: relative;
    overflow: hidden;
    padding: 20px;
  }

  /* Decorative blobs */
  .login-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .login-blob-1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(255,92,151,0.18) 0%, transparent 70%);
    top: -120px; left: -120px;
  }
  .login-blob-2 {
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(247,45,114,0.12) 0%, transparent 70%);
    bottom: -100px; right: -80px;
  }
  .login-blob-3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(255,148,188,0.2) 0%, transparent 70%);
    top: 40%; left: 60%;
  }

  /* Card */
  .login-card {
    position: relative;
    z-index: 1;
    background: #fff;
    border-radius: 28px;
    padding: 48px 44px 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(247,45,114,0.14), 0 4px 16px rgba(247,45,114,0.08);
    border: 1.5px solid var(--pink-100);
    animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Logo area */
  .login-logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-logo-icon {
    width: 68px; height: 68px;
    background: linear-gradient(135deg, var(--pink-400), var(--pink-600));
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    box-shadow: 0 8px 24px rgba(247,45,114,0.3);
    margin-bottom: 16px;
  }
  .login-logo-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--text-dark);
    letter-spacing: 0.3px;
  }
  .login-logo-sub {
    font-size: 13px;
    color: var(--text-light);
    margin-top: 4px;
    font-weight: 400;
  }

  /* Welcome text */
  .login-welcome {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 6px;
  }
  .login-welcome-sub {
    font-size: 13px;
    color: var(--text-light);
    margin-bottom: 28px;
  }

  /* Error */
  .login-error {
    background: #fff0f3;
    border: 1.5px solid #ffb3c6;
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 13px;
    color: #c0143c;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: shake 0.35s ease;
  }
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-5px)}
    40%{transform:translateX(5px)}
    60%{transform:translateX(-3px)}
    80%{transform:translateX(3px)}
  }

  /* Field group */
  .login-field {
    margin-bottom: 16px;
  }
  .login-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-mid);
    margin-bottom: 7px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
  .login-input-wrap {
    position: relative;
  }
  .login-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
  }
  .login-input {
    width: 100%;
    padding: 13px 16px 13px 42px;
    border: 1.5px solid var(--pink-200);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    background: var(--pink-50);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .login-input:focus {
    border-color: var(--pink-400);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(247,45,114,0.1);
  }
  .login-input::placeholder { color: var(--text-light); }

  /* Show/hide password toggle */
  .login-pw-toggle {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    font-size: 16px;
    padding: 2px;
    transition: color 0.2s;
  }
  .login-pw-toggle:hover { color: var(--pink-500); }

  /* Submit button */
  .login-btn {
    width: 100%;
    margin-top: 8px;
    padding: 14px;
    background: linear-gradient(135deg, var(--pink-400) 0%, var(--pink-600) 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 6px 20px rgba(247,45,114,0.3);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .login-btn:hover {
    opacity: 0.9;
    box-shadow: 0 8px 26px rgba(247,45,114,0.4);
  }
  .login-btn:active { transform: scale(0.98); }
  .login-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  /* Spinner */
  .login-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .login-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 0;
  }
  .login-divider-line { flex: 1; height: 1px; background: var(--pink-100); }
  .login-divider-text { font-size: 11px; color: var(--text-light); font-weight: 500; }

  /* Footer */
  .login-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
    color: var(--text-light);
  }
  .login-footer strong {
    color: var(--pink-500);
    font-weight: 600;
  }
`

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@pos.local')
  const [password, setPassword] = useState('admin123')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const res = await API.post('/auth/login', { email, password })
      setToken(res.data.token)
      onLogin(res.data.user, res.data.token)
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrapper">
        {/* Background blobs */}
        <div className="login-blob login-blob-1" />
        <div className="login-blob login-blob-2" />
        <div className="login-blob login-blob-3" />

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">🌸</div>
            <div className="login-logo-title">Blossom POS</div>
            <div className="login-logo-sub">Point of Sale System</div>
          </div>

          <div className="login-welcome">Welcome back 👋</div>
          <div className="login-welcome-sub">Sign in to continue to your dashboard</div>

          {/* Error */}
          {err && (
            <div className="login-error">
              <span>⚠️</span> {err}
            </div>
          )}

          {/* Form — no <form> tag, using div + onKeyDown */}
          <div onKeyDown={e => e.key === 'Enter' && submit(e)}>
            {/* Email */}
            <div className="login-field">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">✉️</span>
                <input
                  className="login-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-label">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  className="login-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: 42 }}
                />
                <button
                  className="login-pw-toggle"
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  tabIndex={-1}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button className="login-btn" onClick={submit} disabled={loading}>
              {loading
                ? <><div className="login-spinner" /> Signing in...</>
                : <>🌸 Sign In</>
              }
            </button>
          </div>

          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">SECURE LOGIN</span>
            <div className="login-divider-line" />
          </div>

          <div className="login-footer">
            Powered by <strong>Blossom POS</strong> · All rights reserved
          </div>
        </div>
      </div>
    </>
  )
}