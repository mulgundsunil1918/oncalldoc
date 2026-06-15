import React from 'react'

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)  return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

export default function AlertLog({ alerts }) {
  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <span className="panel-card__title">Alert log</span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{alerts.length} total</span>
      </div>
      <div className="panel-card__body" style={{ padding: '0 16px' }}>
        {alerts.length === 0
          ? <p className="alert-empty">No alerts yet</p>
          : (
            <div className="alert-list">
              {alerts.map(a => (
                <div key={a.id} className="alert-row">
                  <span className={`alert-dot alert-dot--${a.severity}`} />
                  <span className="alert-msg">{a.message}</span>
                  <span className="alert-time">{timeAgo(a.time)}</span>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}
