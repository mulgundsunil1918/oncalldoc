import React from 'react'
import { VITAL_META } from '../data/patients.js'

export function getVitalSeverity(vital, value, thresholds) {
  const t = thresholds
  if (!t) return 'stable'
  if ((t.critLow && value <= t.critLow) || (t.critHigh && value >= t.critHigh)) return 'critical'
  if ((t.warnLow && value <= t.warnLow) || (t.warnHigh && value >= t.warnHigh)) return 'warning'
  return 'stable'
}

function statusLabel(sev, value, thresholds) {
  const t = thresholds
  if (sev === 'critical') {
    if (t.critLow && value <= t.critLow) return `↓ Critical (< ${t.critLow})`
    if (t.critHigh && value >= t.critHigh) return `↑ Critical (> ${t.critHigh})`
  }
  if (sev === 'warning') {
    if (t.warnLow && value <= t.warnLow) return `↓ Below limit (< ${t.warnLow})`
    if (t.warnHigh && value >= t.warnHigh) return `↑ Above limit (> ${t.warnHigh})`
  }
  return 'Normal'
}

export default function VitalCard({ vital, value, thresholds }) {
  const meta = VITAL_META[vital]
  const sev  = getVitalSeverity(vital, value, thresholds)
  return (
    <div className={`vital-card vital-card--${sev}`}>
      <div className="vital-card__label">
        <span>{meta.icon}</span> {meta.label}
      </div>
      <div className="vital-card__value">{value}</div>
      <div className="vital-card__unit">{meta.unit}</div>
      <div className="vital-card__status">{statusLabel(sev, value, thresholds)}</div>
    </div>
  )
}
