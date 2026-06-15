import React, { useState } from 'react'
import { VITAL_META } from '../data/patients.js'

const TABS = [
  { key: 'hr',   label: 'HR'   },
  { key: 'spo2', label: 'SpO₂' },
  { key: 'rr',   label: 'RR'   },
  { key: 'bp',   label: 'BP'   },
]

const THR_ROWS = {
  hr: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 40,  max: 110, step: 5 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 60,  max: 140, step: 5 },
    { key: 'warnHigh', label: 'Notify — warning high',   sev: 'warning',  dir: 'high', min: 140, max: 200, step: 5 },
    { key: 'critHigh', label: 'Call me — critical high', sev: 'critical', dir: 'high', min: 160, max: 220, step: 5 },
  ],
  spo2: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 70, max: 90, step: 1 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 80, max: 96, step: 1 },
  ],
  rr: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 10, max: 35,  step: 2 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 15, max: 50,  step: 2 },
    { key: 'warnHigh', label: 'Notify — warning high',   sev: 'warning',  dir: 'high', min: 50, max: 80,  step: 2 },
    { key: 'critHigh', label: 'Call me — critical high', sev: 'critical', dir: 'high', min: 60, max: 100, step: 2 },
  ],
  sbp: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 20, max: 50,  step: 1 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 30, max: 70,  step: 1 },
    { key: 'warnHigh', label: 'Notify — warning high',   sev: 'warning',  dir: 'high', min: 70, max: 100, step: 1 },
    { key: 'critHigh', label: 'Call me — critical high', sev: 'critical', dir: 'high', min: 90, max: 120, step: 1 },
  ],
  dbp: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 10, max: 30,  step: 1 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 15, max: 40,  step: 1 },
    { key: 'warnHigh', label: 'Notify — warning high',   sev: 'warning',  dir: 'high', min: 45, max: 70,  step: 1 },
    { key: 'critHigh', label: 'Call me — critical high', sev: 'critical', dir: 'high', min: 60, max: 80,  step: 1 },
  ],
  map: [
    { key: 'critLow',  label: 'Call me — critical low',  sev: 'critical', dir: 'low',  min: 15, max: 40,  step: 1 },
    { key: 'warnLow',  label: 'Notify — warning low',    sev: 'warning',  dir: 'low',  min: 25, max: 55,  step: 1 },
    { key: 'warnHigh', label: 'Notify — warning high',   sev: 'warning',  dir: 'high', min: 55, max: 80,  step: 1 },
    { key: 'critHigh', label: 'Call me — critical high', sev: 'critical', dir: 'high', min: 70, max: 90,  step: 1 },
  ],
}

function ThrRow({ patientId, vital, rowDef, currentVal, onSet }) {
  const val = currentVal ?? ''
  return (
    <div className="thr-row">
      <div className="thr-row__head">
        <span className="thr-row__label">{rowDef.label}</span>
        <span className={`thr-row__val thr-row__val--${rowDef.sev}`}>
          {val !== '' ? `${rowDef.dir === 'low' ? '< ' : '> '}${val}` : 'Off'}
        </span>
      </div>
      <div className="thr-input-row">
        <input
          type="range"
          min={rowDef.min} max={rowDef.max} step={rowDef.step}
          value={val !== '' ? val : rowDef.min}
          onChange={e => onSet(patientId, vital, rowDef.key, e.target.value)}
        />
        <input
          type="number"
          min={rowDef.min} max={rowDef.max}
          value={val} placeholder="off"
          onChange={e => {
            const clamped = Math.min(rowDef.max, Math.max(rowDef.min, Number(e.target.value)))
            onSet(patientId, vital, rowDef.key, clamped)
          }}
        />
      </div>
    </div>
  )
}

function BpSubSection({ title, vital, patient, onSetThreshold }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8, paddingBottom: 4, borderBottom: '0.5px solid var(--border)' }}>
        {title} · current: <strong style={{ color: 'var(--text-1)' }}>{patient.vitals[vital]} mmHg</strong>
      </div>
      {THR_ROWS[vital].map(row => (
        <ThrRow
          key={row.key}
          patientId={patient.id}
          vital={vital}
          rowDef={row}
          currentVal={patient.thresholds[vital][row.key]}
          onSet={onSetThreshold}
        />
      ))}
    </div>
  )
}

export default function ThresholdPanel({ patient, onSetThreshold }) {
  const [activeTab, setActiveTab] = useState('hr')

  return (
    <div className="panel-card">
      <div className="panel-card__head">
        <span className="panel-card__title">Alert thresholds</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>changes apply instantly</span>
      </div>
      <div className="thr-tabs">
        {TABS.map(t => (
          <div
            key={t.key}
            className={`thr-tab${activeTab === t.key ? ' thr-tab--active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div className="thr-body">
        {activeTab === 'bp' ? (
          <>
            <BpSubSection title="SBP — systolic" vital="sbp" patient={patient} onSetThreshold={onSetThreshold} />
            <BpSubSection title="DBP — diastolic" vital="dbp" patient={patient} onSetThreshold={onSetThreshold} />
            <BpSubSection title="MAP — mean arterial" vital="map" patient={patient} onSetThreshold={onSetThreshold} />
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: -4 }}>
              {VITAL_META[activeTab].label} · current:{' '}
              <strong style={{ color: 'var(--text-1)' }}>
                {patient.vitals[activeTab]} {VITAL_META[activeTab].unit}
              </strong>
            </div>
            {THR_ROWS[activeTab].map(row => (
              <ThrRow
                key={row.key}
                patientId={patient.id}
                vital={activeTab}
                rowDef={row}
                currentVal={patient.thresholds[activeTab][row.key]}
                onSet={onSetThreshold}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
