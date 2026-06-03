import React, { useState, useRef } from 'react'
import API from '../services/api'

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
    --radius: 18px;
    --radius-sm: 12px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ap-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #fff0f6 0%, #fff8fa 50%, #ffe4ef 100%);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 20px;
  }

  .ap-card {
    background: #fff;
    border-radius: 28px;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 20px 60px rgba(247,45,114,0.13), 0 4px 16px rgba(247,45,114,0.07);
    border: 1.5px solid var(--pink-100);
    overflow: hidden;
    animation: cardIn 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(22px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  /* Card header */
  .ap-header {
    background: linear-gradient(135deg, var(--pink-400), var(--pink-600));
    padding: 28px 32px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ap-header-icon {
    width: 50px; height: 50px;
    background: rgba(255,255,255,0.22);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  .ap-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }
  .ap-header-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.75);
    margin-top: 2px;
  }

  /* Body */
  .ap-body { padding: 30px 32px 32px; }

  /* Photo upload */
  .ap-photo-section {
    margin-bottom: 26px;
  }
  .ap-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-mid);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .ap-photo-upload {
    border: 2px dashed var(--pink-200);
    border-radius: var(--radius);
    background: var(--pink-50);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    overflow: hidden;
    position: relative;
  }
  .ap-photo-upload:hover {
    border-color: var(--pink-400);
    background: var(--pink-100);
  }
  .ap-photo-upload.has-image {
    border-style: solid;
    border-color: var(--pink-300);
  }

  .ap-photo-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    gap: 8px;
  }
  .ap-photo-placeholder-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, var(--pink-100), var(--pink-200));
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    margin-bottom: 4px;
  }
  .ap-photo-placeholder-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-mid);
  }
  .ap-photo-placeholder-sub {
    font-size: 12px;
    color: var(--text-light);
  }
  .ap-photo-badge {
    background: var(--pink-100);
    color: var(--pink-600);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .ap-photo-preview {
    position: relative;
    width: 100%;
    height: 200px;
  }
  .ap-photo-preview img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .ap-photo-preview-overlay {
    position: absolute;
    inset: 0;
    background: rgba(45,10,23,0.45);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .ap-photo-upload:hover .ap-photo-preview-overlay { opacity: 1; }
  .ap-photo-preview-overlay span {
    color: #fff;
    font-size: 13px;
    font-weight: 600;
  }
  .ap-photo-preview-icon { font-size: 28px; }

  .ap-photo-remove {
    position: absolute;
    top: 10px; right: 10px;
    width: 30px; height: 30px;
    background: rgba(255,255,255,0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    color: #c0143c;
    transition: background 0.15s;
    z-index: 2;
  }
  .ap-photo-remove:hover { background: #fff; }

  .ap-file-input { display: none; }

  /* Fields grid */
  .ap-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .ap-field-full { grid-column: 1 / -1; }
  .ap-field { display: flex; flex-direction: column; gap: 7px; }

  .ap-input-wrap { position: relative; }
  .ap-input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    pointer-events: none;
  }
  .ap-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border: 1.5px solid var(--pink-200);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    background: var(--pink-50);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    -moz-appearance: textfield;
  }
  .ap-input::-webkit-inner-spin-button,
  .ap-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .ap-input:focus {
    border-color: var(--pink-400);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(247,45,114,0.1);
  }
  .ap-input::placeholder { color: var(--text-light); }

  /* Success toast */
  .ap-toast {
    background: linear-gradient(135deg, #e8fff4, #d0ffe8);
    border: 1.5px solid #6fdfa8;
    border-radius: var(--radius-sm);
    padding: 11px 14px;
    font-size: 13px;
    color: #0a6640;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    animation: fadeSlide 0.3s ease;
  }
  @keyframes fadeSlide {
    from { opacity:0; transform:translateY(-8px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Error */
  .ap-error {
    background: #fff0f3;
    border: 1.5px solid #ffb3c6;
    border-radius: var(--radius-sm);
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

  /* Submit button */
  .ap-btn {
    width: 100%;
    margin-top: 6px;
    padding: 14px;
    background: linear-gradient(135deg, var(--pink-400) 0%, var(--pink-600) 100%);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 6px 20px rgba(247,45,114,0.28);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .ap-btn:hover { opacity: 0.9; box-shadow: 0 8px 26px rgba(247,45,114,0.38); }
  .ap-btn:active { transform: scale(0.98); }
  .ap-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .ap-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Photo hint */
  .ap-photo-hint {
    font-size: 11px;
    color: var(--text-light);
    margin-top: 6px;
    text-align: center;
  }
`

export default function AddProduct({ onAdd }) {
  const [name, setName]     = useState('')
  const [price, setPrice]   = useState('')
  const [stock, setStock]   = useState('')
  const [photo, setPhoto]   = useState(null)   // File object
  const [preview, setPreview] = useState(null) // data URL
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setErr]       = useState('')
  const fileRef = useRef()

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removePhoto = (e) => {
    e.stopPropagation()
    setPhoto(null)
    setPreview(null)
    fileRef.current.value = ''
  }

  const submit = async () => {
    if (!name.trim() || !price || !stock) {
      setErr('Please fill in all required fields.')
      return
    }
    setErr('')
    setLoading(true)
    try {
      let photoUrl = null
      // If photo selected, upload as multipart or base64 depending on your API
      if (photo) {
        const fd = new FormData()
        fd.append('photo', photo)
        try {
          const uploadRes = await API.post('/uploads', fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          photoUrl = uploadRes.data.url
        } catch {
          // If upload endpoint not ready, skip photo silently
        }
      }
      await API.post('/products', {
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        ...(photoUrl && { photo: photoUrl })
      })
      setName(''); setPrice(''); setStock('')
      setPhoto(null); setPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      onAdd()
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to add product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ap-wrapper">
        <div className="ap-card">
          {/* Header */}
          <div className="ap-header">
            <div className="ap-header-icon">🛍️</div>
            <div>
              <div className="ap-header-title">Add New Product</div>
              <div className="ap-header-sub">Fill in the details to add to your catalogue</div>
            </div>
          </div>

          <div className="ap-body">
            {success && (
              <div className="ap-toast">✅ Product added successfully!</div>
            )}
            {err && (
              <div className="ap-error">⚠️ {err}</div>
            )}

            {/* Photo Upload */}
            <div className="ap-photo-section">
              <label className="ap-label">Product Photo</label>
              <div
                className={`ap-photo-upload${preview ? ' has-image' : ''}`}
                onClick={() => fileRef.current.click()}
              >
                <input
                  ref={fileRef}
                  className="ap-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />
                {preview ? (
                  <div className="ap-photo-preview">
                    <img src={preview} alt="Product preview" />
                    <div className="ap-photo-preview-overlay">
                      <span className="ap-photo-preview-icon">📷</span>
                      <span>Change Photo</span>
                    </div>
                    <button className="ap-photo-remove" onClick={removePhoto} title="Remove photo">×</button>
                  </div>
                ) : (
                  <div className="ap-photo-placeholder">
                    <div className="ap-photo-placeholder-icon">📸</div>
                    <div className="ap-photo-placeholder-text">Click to upload photo</div>
                    <div className="ap-photo-placeholder-sub">Drag & drop or click to browse</div>
                    <div className="ap-photo-badge">Optional</div>
                  </div>
                )}
              </div>
              {!preview && (
                <div className="ap-photo-hint">JPG, PNG, WEBP · Max 5MB recommended</div>
              )}
            </div>

            {/* Fields */}
            <div className="ap-fields">
              {/* Name — full width */}
              <div className="ap-field ap-field-full">
                <label className="ap-label">Product Name <span style={{color:'var(--pink-500)'}}>*</span></label>
                <div className="ap-input-wrap">
                  <span className="ap-input-icon">🏷️</span>
                  <input
                    className="ap-input"
                    type="text"
                    placeholder="e.g. Rose Hand Cream"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="ap-field">
                <label className="ap-label">Price ($) <span style={{color:'var(--pink-500)'}}>*</span></label>
                <div className="ap-input-wrap">
                  <span className="ap-input-icon">💰</span>
                  <input
                    className="ap-input"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    min="0"
                    step="0.01"
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="ap-field">
                <label className="ap-label">Stock Qty <span style={{color:'var(--pink-500)'}}>*</span></label>
                <div className="ap-input-wrap">
                  <span className="ap-input-icon">📦</span>
                  <input
                    className="ap-input"
                    type="number"
                    placeholder="0"
                    value={stock}
                    min="0"
                    onChange={e => setStock(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button className="ap-btn" onClick={submit} disabled={loading}>
              {loading
                ? <><div className="ap-spinner" /> Adding Product...</>
                : <>🌸 Add Product</>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
