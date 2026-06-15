import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getVitalSeverity } from '../components/VitalCard.jsx'
import { DEFAULT_THRESHOLDS, INITIAL_PATIENTS } from '../data/patients.js'

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function getPatientStatus(patient) {
  const vitals = ['hr', 'spo2', 'rr', 'sbp', 'dbp', 'map']
  const sevs   = vitals.map(v => getVitalSeverity(v, patient.vitals[v], patient.thresholds[v]))
  if (sevs.includes('critical')) return 'critical'
  if (sevs.includes('warning'))  return 'warning'
  return 'stable'
}

function timeAgo(iso) {
  if (!iso) return null
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)   return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

function AddPatientModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '', gender: 'M', age: '', diagnosis: '', support: '', bed: '', ward: 'NICU',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    const newPatient = {
      id: Date.now(),
      ...form,
      dutyPhone:  '+910000000000',
      thresholds: JSON.parse(JSON.stringify(DEFAULT_THRESHOLDS)),
      vitals:     { hr: 140, spo2: 95, rr: 45, sbp: 65, dbp: 42, map: 50 },
      sim: {
        hr:   { base: 140, range: 6,  maxDrift: 20 },
        spo2: { base: 95,  range: 1,  maxDrift: 5  },
        rr:   { base: 45,  range: 4,  maxDrift: 10 },
        sbp:  { base: 65,  range: 4,  maxDrift: 12 },
        dbp:  { base: 42,  range: 3,  maxDrift: 8  },
      },
    }
    onAdd(newPatient)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-row">
              <label>Patient name</label>
              <input required placeholder="e.g. Baby Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Gender</label>
              <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label>Age</label>
              <input required placeholder="e.g. 3 days" value={form.age} onChange={e => set('age', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Ward</label>
              <select value={form.ward} onChange={e => set('ward', e.target.value)}>
                <option>NICU</option>
                <option>PICU</option>
                <option>ICU</option>
                <option>General Ward</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <label>Diagnosis</label>
            <input required placeholder="e.g. PPHN, RDS, Sepsis" value={form.diagnosis} onChange={e => set('diagnosis', e.target.value)} />
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label>Respiratory support</label>
              <input placeholder="e.g. HFO Ventilator" value={form.support} onChange={e => set('support', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Bed</label>
              <input placeholder="e.g. Bed 3" value={form.bed} onChange={e => set('bed', e.target.value)} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add patient</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { state, addPatient } = useApp()
  const [showAdd, setShowAdd] = useState(false)

  const patients      = state.patients
  const critCount     = patients.filter(p => getPatientStatus(p) === 'critical').length
  const warnCount     = patients.filter(p => getPatientStatus(p) === 'warning').length
  const stableCount   = patients.filter(p => getPatientStatus(p) === 'stable').length
  const critAlerts    = state.alerts.filter(a => a.severity === 'critical').length
  const firstPatient  = patients[0]

  return (
    <div className="page">
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar__brand">
          <span className="navbar__logo">OnCallDoc</span>
          <span className="navbar__tag">MVP</span>
        </div>
        <div className="navbar__right">
          <span className="navbar__bell" style={{ position: 'relative' }}>
            🔔
            {critAlerts > 0 && <span className="alert-bubble">{critAlerts}</span>}
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="dash-hero">
        <div className="dash-hero__inner">
          <div className="dash-hero__left">
            <p className="dash-hero__greeting">Good {getTimeOfDay()}, Dr. Sunil</p>
            <h1 className="dash-hero__title">Your patients.<br />Your eyes.<br />From anywhere.</h1>
            <p className="dash-hero__sub">
              Monitor your admitted patients in real-time — live camera, live vitals, instant alerts — right from your phone or laptop.
            </p>
            <button className="btn-tut-big" onClick={() => navigate('/tutorial')}>
              <span className="btn-tut-big__icon">📖</span>
              <span>
                <span className="btn-tut-big__title">How OnCallDoc works</span>
                <span className="btn-tut-big__sub">Setup guide · clinical workflow · real scenarios</span>
              </span>
              <span className="btn-tut-big__arrow">→</span>
            </button>
          </div>

          <div className="dash-hero__right">
            <div className="dash-hero__stats">
              <div className="hero-stat">
                <span className="hero-stat__num">{patients.length}</span>
                <span className="hero-stat__label">Patients</span>
              </div>
              {critCount > 0 && (
                <div className="hero-stat hero-stat--critical">
                  <span className="hero-stat__num">{critCount}</span>
                  <span className="hero-stat__label">Critical</span>
                </div>
              )}
              {warnCount > 0 && (
                <div className="hero-stat hero-stat--warning">
                  <span className="hero-stat__num">{warnCount}</span>
                  <span className="hero-stat__label">Watch</span>
                </div>
              )}
              <div className="hero-stat hero-stat--stable">
                <span className="hero-stat__num">{stableCount}</span>
                <span className="hero-stat__label">Stable</span>
              </div>
            </div>

            {firstPatient && (
              <div className="dash-hero__preview">
                <div className="preview-chip">
                  <span className="preview-chip__dot" />
                  Monitoring live
                </div>
                <p className="preview-patient-name">{firstPatient.name} · {firstPatient.ward} · {firstPatient.bed}</p>
                <div className="preview-vitals">
                  {['hr', 'spo2', 'map'].map(v => {
                    const sev = getVitalSeverity(v, firstPatient.vitals[v], firstPatient.thresholds[v])
                    return (
                      <div key={v} className="preview-vital">
                        <span className="preview-vital__lbl">{v === 'hr' ? 'HR' : v === 'spo2' ? 'SpO₂' : 'MAP'}</span>
                        <span className={`preview-vital__val preview-vital__val--${sev}`}>
                          {firstPatient.vitals[v]}{v === 'spo2' ? '%' : ''}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Patient list ── */}
      <div className="page-body">
        <div className="patients-header">
          <div>
            <h2 className="patients-title">Active patients</h2>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button className="btn-add-inline" onClick={() => setShowAdd(true)}>+ Add patient</button>
        </div>

        <div className="patients-grid">
          {patients.map(patient => {
            const status       = getPatientStatus(patient)
            const patientAlerts = state.alerts.filter(a => a.patientId === patient.id)
            const lastAlert    = patientAlerts[0]

            return (
              <div
                key={patient.id}
                className={`patient-card patient-card--${status}`}
                onClick={() => navigate(`/monitor/${patient.id}`)}
              >
                <div className="card-header">
                  <div>
                    <p className="card-name">{patient.name}</p>
                    <p className="card-sub">{patient.gender} · {patient.age} · {patient.ward}</p>
                  </div>
                  <span className={`badge badge--${status}`}>
                    {status === 'critical' ? '🔴 Critical' : status === 'warning' ? '🟡 Watch' : '🟢 Stable'}
                  </span>
                </div>

                <p className="card-dx">{patient.diagnosis} · {patient.support} · {patient.bed}</p>

                <div className="card-vitals">
                  {['hr', 'spo2', 'rr'].map(v => {
                    const sev = getVitalSeverity(v, patient.vitals[v], patient.thresholds[v])
                    return (
                      <div key={v} className="mini-v">
                        <span className="mini-v__lbl">{v === 'hr' ? 'HR' : v === 'spo2' ? 'SpO₂' : 'RR'}</span>
                        <span className={`mini-v__val mini-v__val--${sev}`}>
                          {patient.vitals[v]}{v === 'spo2' ? '%' : ''}
                        </span>
                      </div>
                    )
                  })}
                  <div className="mini-v">
                    <span className="mini-v__lbl">BP</span>
                    <span className={`mini-v__val mini-v__val--${
                      ['sbp','dbp','map'].map(v => getVitalSeverity(v, patient.vitals[v], patient.thresholds[v]))
                        .reduce((w, s) => s === 'critical' ? 'critical' : w === 'critical' ? 'critical' : s, 'stable')
                    }`}>
                      {patient.vitals.sbp}/{patient.vitals.dbp}
                    </span>
                    <span className="mini-v__sub">MAP {patient.vitals.map}</span>
                  </div>
                </div>

                {lastAlert && (
                  <div className="card-last-alert">
                    <span style={{ color: lastAlert.severity === 'critical' ? 'var(--critical)' : 'var(--warning)', fontSize: 11 }}>
                      ⚠ {lastAlert.message.length > 32 ? lastAlert.message.slice(0, 32) + '…' : lastAlert.message}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 6 }}>{timeAgo(lastAlert.time)}</span>
                  </div>
                )}

                <div className="card-footer">
                  <span className="card-tap-hint">Tap to monitor →</span>
                </div>
              </div>
            )
          })}
        </div>

        {patients.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">🏥</div>
            <h3>No patients yet</h3>
            <p>Add your first patient to start monitoring.</p>
            <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => setShowAdd(true)}>
              + Add patient
            </button>
          </div>
        )}

        {/* ── Bottom CTA row ── */}
        <div className="dash-bottom-row">
          <button className="btn-add-patient" onClick={() => setShowAdd(true)}>+ Add another patient</button>
          <button className="btn-tut-small" onClick={() => navigate('/tutorial')}>📖 How it works</button>
        </div>
      </div>

      {showAdd && <AddPatientModal onClose={() => setShowAdd(false)} onAdd={addPatient} />}
    </div>
  )
}
