import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { getVitalSeverity } from '../components/VitalCard.jsx'
import { DEFAULT_THRESHOLDS, INITIAL_PATIENTS } from '../data/patients.js'

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
      thresholds: JSON.parse(JSON.stringify(DEFAULT_THRESHOLDS)),
      vitals: { hr: 140, spo2: 95, rr: 45, sbp: 65, dbp: 42, map: 50 },
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
              <label>Baby name</label>
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

  const critCount = state.patients.filter(p => getPatientStatus(p) === 'critical').length
  const warnCount = state.patients.filter(p => getPatientStatus(p) === 'warning').length
  const unreadCritAlerts = state.alerts.filter(a => a.severity === 'critical').length

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar__brand">
          <span className="navbar__logo">OnCallDoc</span>
          <span className="navbar__tag">MVP</span>
        </div>
        <div className="navbar__right">
          <span className="navbar__bell" style={{ position: 'relative' }}>
            🔔
            {unreadCritAlerts > 0 && <span className="alert-bubble">{unreadCritAlerts}</span>}
          </span>
        </div>
      </nav>

      <div className="page-body">
        <div className="dash-meta">
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · Dr. Sunil
          </p>
          <div className="dash-stats">
            <span className="stat-chip">{state.patients.length} patients</span>
            {critCount > 0 && <span className="stat-chip stat-chip--critical">{critCount} critical</span>}
            {warnCount > 0 && <span className="stat-chip stat-chip--warning">{warnCount} watching</span>}
          </div>
        </div>

        <h1 className="dash-title">My patients</h1>

        <div className="patients-grid">
          {state.patients.map(patient => {
            const status = getPatientStatus(patient)
            const patientAlerts = state.alerts.filter(a => a.patientId === patient.id)
            const lastAlert = patientAlerts[0]

            return (
              <div
                key={patient.id}
                className={`patient-card patient-card--${status}`}
                onClick={() => navigate(`/monitor/${patient.id}`)}
              >
                <div className="card-header">
                  <div>
                    <p className="card-name">{patient.name} · {patient.gender} · {patient.age}</p>
                    <p className="card-sub">{patient.diagnosis} · {patient.support} · {patient.bed}</p>
                  </div>
                  <span className={`badge badge--${status}`}>
                    {status === 'critical' ? 'Critical' : status === 'warning' ? 'Watch' : 'Stable'}
                  </span>
                </div>
                <div className="card-vitals">
                  {['hr', 'spo2', 'rr'].map(v => {
                    const sev = getVitalSeverity(v, patient.vitals[v], patient.thresholds[v])
                    return (
                      <div key={v} className="mini-v">
                        <span className="mini-v__lbl">
                          {v === 'hr' ? 'HR' : v === 'spo2' ? 'SpO₂' : 'RR'}
                        </span>
                        <span className={`mini-v__val mini-v__val--${sev}`}>
                          {patient.vitals[v]}{v === 'spo2' ? '%' : ''}
                        </span>
                      </div>
                    )
                  })}
                  <div className="mini-v">
                    <span className="mini-v__lbl">SBP/DBP</span>
                    <span className={`mini-v__val mini-v__val--${getVitalSeverity('sbp', patient.vitals.sbp, patient.thresholds.sbp)}`}>
                      {patient.vitals.sbp}/{patient.vitals.dbp}
                    </span>
                  </div>
                  <div className="mini-v">
                    <span className="mini-v__lbl">MAP</span>
                    <span className={`mini-v__val mini-v__val--${getVitalSeverity('map', patient.vitals.map, patient.thresholds.map)}`}>
                      {patient.vitals.map}
                    </span>
                  </div>
                  {lastAlert && (
                    <div className="card-last-alert">
                      <span style={{ color: lastAlert.severity === 'critical' ? 'var(--critical)' : 'var(--warning)', fontSize: 11 }}>
                        ⚠ {lastAlert.message.length > 28 ? lastAlert.message.slice(0, 28) + '…' : lastAlert.message}
                      </span>
                      <br />
                      <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{timeAgo(lastAlert.time)}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button className="btn-add-patient" onClick={() => setShowAdd(true)}>
          + Add patient
        </button>
      </div>

      {showAdd && (
        <AddPatientModal onClose={() => setShowAdd(false)} onAdd={addPatient} />
      )}
    </div>
  )
}
