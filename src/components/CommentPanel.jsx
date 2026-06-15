import React, { useState } from 'react'

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)   return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function CommentPanel({ patientId, comments, onAddComment }) {
  const [text, setText] = useState('')
  const [type, setType] = useState('order')

  const list = [...comments]
    .filter(c => c.patientId === patientId)
    .sort((a, b) => new Date(b.time) - new Date(a.time))

  function handleSend(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAddComment({
      id:        Date.now(),
      patientId,
      text:      text.trim(),
      author:    'Dr. Sunil',
      time:      new Date().toISOString(),
      type,
    })
    setText('')
  }

  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <span className="panel-card__title">Orders &amp; Notes</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>shown on bedside display</span>
      </div>

      <div className="comment-list">
        {list.length === 0 ? (
          <div className="alert-empty">No orders yet</div>
        ) : (
          list.map(c => (
            <div key={c.id} className={`comment-item comment-item--${c.type}`}>
              <div className="comment-item__head">
                <span className={`comment-type-badge comment-type-badge--${c.type}`}>
                  {c.type === 'order' ? '📋 Order' : '📝 Note'}
                </span>
                <span className="comment-item__time">{fmtDate(c.time)} · {fmtTime(c.time)}</span>
              </div>
              <p className="comment-item__text">{c.text}</p>
              <span className="comment-item__author">{c.author} · {timeAgo(c.time)}</span>
            </div>
          ))
        )}
      </div>

      <div className="comment-form">
        <div className="comment-type-toggle">
          <button type="button" className={`type-btn${type === 'order' ? ' type-btn--active' : ''}`} onClick={() => setType('order')}>
            📋 Order
          </button>
          <button type="button" className={`type-btn${type === 'note' ? ' type-btn--active' : ''}`} onClick={() => setType('note')}>
            📝 Note
          </button>
        </div>
        <form onSubmit={handleSend} className="comment-input-row">
          <textarea
            className="comment-textarea"
            placeholder={type === 'order'
              ? 'e.g. Give injection adrenaline 0.1 mg/kg IV stat'
              : 'e.g. Echo — moderate RV dysfunction, continue iNO'}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={2}
          />
          <button type="submit" className="comment-send-btn" disabled={!text.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
