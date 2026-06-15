import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import VitalCard, { getVitalSeverity } from '../components/VitalCard.jsx'
import AlertLog from '../components/AlertLog.jsx'
import ThresholdPanel from '../components/ThresholdPanel.jsx'
import CommentPanel from '../components/CommentPanel.jsx'

// ── Vitals simulation ──────────────────────────────────
function simStep(current, sim) {
  const noise   = (Math.random() - 0.5) * sim.range
  const pullback = (sim.base - current) * 0.15
  const next    = current + noise + pullback
  return Math.round(Math.max(sim.base - sim.maxDrift, Math.min(sim.base + sim.maxDrift, next)))
}

// ── Audio alarm ────────────────────────────────────────
function playBeep(critical = false) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx   = new AudioCtx()
    const freqs = critical ? [880, 880, 880] : [660, 660]
    const gap   = critical ? 0.18 : 0.25
    let t = ctx.currentTime + 0.05
    freqs.forEach(freq => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      gain.gain.setValueAtTime(critical ? 0.45 : 0.2, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16)
      osc.start(t)
      osc.stop(t + 0.16)
      t += gap
    })
  } catch (_) {}
}

// ── Browser notification ───────────────────────────────
function sendNotification(title, body) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
  new Notification(title, { body })
}

// ── Alert definitions ──────────────────────────────────
function buildAlertChecks(vitals, thresholds) {
  const { hr, spo2, rr, sbp, dbp, map } = vitals
  const t = thresholds
  return [
    { key: 'hr_crit_low',   value: hr,  thr: t.hr.critLow,   dir: 'low',  sev: 'critical', msg: `HR critically low: ${hr} bpm`            },
    { key: 'hr_warn_low',   value: hr,  thr: t.hr.warnLow,   dir: 'low',  sev: 'warning',  msg: `HR below warning: ${hr} bpm`             },
    { key: 'hr_crit_high',  value: hr,  thr: t.hr.critHigh,  dir: 'high', sev: 'critical', msg: `HR critically high: ${hr} bpm`           },
    { key: 'hr_warn_high',  value: hr,  thr: t.hr.warnHigh,  dir: 'high', sev: 'warning',  msg: `HR above warning: ${hr} bpm`            },
    { key: 'spo2_crit_low', value: spo2,thr: t.spo2.critLow, dir: 'low',  sev: 'critical', msg: `SpO₂ critically low: ${spo2}%`           },
    { key: 'spo2_warn_low', value: spo2,thr: t.spo2.warnLow, dir: 'low',  sev: 'warning',  msg: `SpO₂ below warning: ${spo2}%`           },
    { key: 'rr_crit_low',   value: rr,  thr: t.rr.critLow,   dir: 'low',  sev: 'critical', msg: `RR critically low: ${rr} br/min`         },
    { key: 'rr_warn_low',   value: rr,  thr: t.rr.warnLow,   dir: 'low',  sev: 'warning',  msg: `RR below warning: ${rr} br/min`         },
    { key: 'rr_crit_high',  value: rr,  thr: t.rr.critHigh,  dir: 'high', sev: 'critical', msg: `RR critically high: ${rr} br/min`        },
    { key: 'rr_warn_high',  value: rr,  thr: t.rr.warnHigh,  dir: 'high', sev: 'warning',  msg: `RR above warning: ${rr} br/min`         },
    { key: 'sbp_crit_low',  value: sbp, thr: t.sbp.critLow,  dir: 'low',  sev: 'critical', msg: `SBP critically low: ${sbp} mmHg`         },
    { key: 'sbp_warn_low',  value: sbp, thr: t.sbp.warnLow,  dir: 'low',  sev: 'warning',  msg: `SBP below warning: ${sbp} mmHg`         },
    { key: 'sbp_crit_high', value: sbp, thr: t.sbp.critHigh, dir: 'high', sev: 'critical', msg: `SBP critically high: ${sbp} mmHg`        },
    { key: 'sbp_warn_high', value: sbp, thr: t.sbp.warnHigh, dir: 'high', sev: 'warning',  msg: `SBP above warning: ${sbp} mmHg`         },
    { key: 'dbp_crit_low',  value: dbp, thr: t.dbp.critLow,  dir: 'low',  sev: 'critical', msg: `DBP critically low: ${dbp} mmHg`         },
    { key: 'dbp_warn_low',  value: dbp, thr: t.dbp.warnLow,  dir: 'low',  sev: 'warning',  msg: `DBP below warning: ${dbp} mmHg`         },
    { key: 'dbp_crit_high', value: dbp, thr: t.dbp.critHigh, dir: 'high', sev: 'critical', msg: `DBP critically high: ${dbp} mmHg`        },
    { key: 'dbp_warn_high', value: dbp, thr: t.dbp.warnHigh, dir: 'high', sev: 'warning',  msg: `DBP above warning: ${dbp} mmHg`         },
    { key: 'map_crit_low',  value: map, thr: t.map.critLow,  dir: 'low',  sev: 'critical', msg: `MAP critically low: ${map} mmHg`         },
    { key: 'map_warn_low',  value: map, thr: t.map.warnLow,  dir: 'low',  sev: 'warning',  msg: `MAP below warning: ${map} mmHg`         },
    { key: 'map_crit_high', value: map, thr: t.map.critHigh, dir: 'high', sev: 'critical', msg: `MAP critically high: ${map} mmHg`        },
    { key: 'map_warn_high', value: map, thr: t.map.warnHigh, dir: 'high', sev: 'warning',  msg: `MAP above warning: ${map} mmHg`         },
  ]
}

function getPatientStatus(patient) {
  const vitals = ['hr', 'spo2', 'rr', 'sbp', 'dbp', 'map']
  const sevs   = vitals.map(v => getVitalSeverity(v, patient.vitals[v], patient.thresholds[v]))
  if (sevs.includes('critical')) return 'critical'
  if (sevs.includes('warning'))  return 'warning'
  return 'stable'
}

export default function Monitor() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { state, updateVitals, addAlert, setThreshold, addComment, toggleSound } = useApp()

  const patient       = state.patients.find(p => p.id === parseInt(id))
  const patientRef    = useRef(patient)
  const lastAlerted   = useRef({})
  const soundRef      = useRef(state.soundEnabled)
  const [liveDot, setLiveDot] = useState(true)

  useEffect(() => { patientRef.current = patient }, [patient])
  useEffect(() => { soundRef.current = state.soundEnabled }, [state.soundEnabled])

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setLiveDot(d => !d), 700)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!patient) return
    const vitals = { ...patient.vitals }

    const t = setInterval(() => {
      const p = patientRef.current
      if (!p) return
      const next = {
        hr:   simStep(vitals.hr,   p.sim.hr),
        spo2: simStep(vitals.spo2, p.sim.spo2),
        rr:   simStep(vitals.rr,   p.sim.rr),
        sbp:  simStep(vitals.sbp,  p.sim.sbp),
        dbp:  simStep(vitals.dbp,  p.sim.dbp),
      }
      next.map = Math.round((next.sbp + 2 * next.dbp) / 3)
      vitals.hr   = next.hr
      vitals.spo2 = next.spo2
      vitals.rr   = next.rr
      vitals.sbp  = next.sbp
      vitals.dbp  = next.dbp
      vitals.map  = next.map
      updateVitals(p.id, { ...next })
    }, 2000)

    return () => clearInterval(t)
  }, [id]) // eslint-disable-line

  useEffect(() => {
    if (!patient) return
    const DEBOUNCE_MS = 20_000
    const now = Date.now()

    buildAlertChecks(patient.vitals, patient.thresholds).forEach(c => {
      if (!c.thr) return
      const triggered = c.dir === 'low' ? c.value <= c.thr : c.value >= c.thr
      if (!triggered) return
      const last = lastAlerted.current[c.key]
      if (last && now - last < DEBOUNCE_MS) return
      lastAlerted.current[c.key] = now

      addAlert({
        id:          now + Math.random(),
        patientId:   patient.id,
        patientName: patient.name,
        vital:       c.key.split('_')[0],
        severity:    c.sev,
        message:     c.msg,
        value:       c.value,
        time:        new Date().toISOString(),
      })

      if (soundRef.current) playBeep(c.sev === 'critical')
      sendNotification(
        `${c.sev === 'critical' ? '🚨' : '⚠️'} OnCallDoc — ${patient.name}`,
        c.msg,
      )
    })
  }, [patient?.vitals?.hr, patient?.vitals?.spo2, patient?.vitals?.rr, patient?.vitals?.sbp, patient?.vitals?.dbp, patient?.vitals?.map]) // eslint-disable-line

  if (!patient) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        Patient not found.{' '}
        <span style={{ color: 'var(--brand)', cursor: 'pointer' }} onClick={() => navigate('/')}>Go back</span>
      </div>
    )
  }

  const status        = getPatientStatus(patient)
  const patientAlerts = state.alerts.filter(a => a.patientId === patient.id)

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar__brand">
          <span className="navbar__logo">OnCallDoc</span>
        </div>
        <div className="navbar__right">
          <button
            className={`sound-toggle${state.soundEnabled ? '' : ' sound-toggle--off'}`}
            onClick={toggleSound}
            title={state.soundEnabled ? 'Sound ON — click to mute' : 'Sound OFF — click to unmute'}
          >
            {state.soundEnabled ? '🔔 Sound ON' : '🔕 Sound OFF'}
          </button>
          <span className="navbar__bell">🔔</span>
        </div>
      </nav>

      <div className="monitor-header">
        <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
        <div className="monitor-header__info">
          <h2>{patient.name} · {patient.gender} · {patient.age}</h2>
          <p>{patient.diagnosis} · {patient.support} · {patient.bed} · {patient.ward}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href={`tel:${patient.dutyPhone}`} className="call-btn">
            📞 Call Ward
          </a>
          <span className={`badge badge--${status}`}>
            {status === 'critical' ? '🔴 Critical' : status === 'warning' ? '🟡 Watch' : '🟢 Stable'}
          </span>
        </div>
      </div>

      <div className="monitor-body">
        {/* ── Left: video + vitals ── */}
        <div>
          <div className="video-feed">
            <div className="live-badge">
              <span className={`live-dot${!liveDot ? ' live-dot--off' : ''}`} />
              LIVE
            </div>
            <div className="video-icon">📹</div>
            <p className="video-label">{patient.ward} Camera · {patient.bed}</p>
            <p className="video-sub">Stream connected · tap to expand</p>
          </div>

          <p className="section-title">Live vitals</p>
          <div className="vitals-grid vitals-grid--3col">
            <VitalCard vital="hr"   value={patient.vitals.hr}   thresholds={patient.thresholds.hr}   />
            <VitalCard vital="spo2" value={patient.vitals.spo2} thresholds={patient.thresholds.spo2} />
            <VitalCard vital="rr"   value={patient.vitals.rr}   thresholds={patient.thresholds.rr}   />
            <VitalCard vital="sbp"  value={patient.vitals.sbp}  thresholds={patient.thresholds.sbp}  />
            <VitalCard vital="dbp"  value={patient.vitals.dbp}  thresholds={patient.thresholds.dbp}  />
            <VitalCard vital="map"  value={patient.vitals.map}  thresholds={patient.thresholds.map}  />
          </div>
        </div>

        {/* ── Right: alerts + comments + thresholds ── */}
        <div className="right-panel">
          <AlertLog alerts={patientAlerts} />
          <CommentPanel
            patientId={patient.id}
            comments={state.comments}
            onAddComment={addComment}
          />
          <ThresholdPanel patient={patient} onSetThreshold={setThreshold} />
        </div>
      </div>
    </div>
  )
}
