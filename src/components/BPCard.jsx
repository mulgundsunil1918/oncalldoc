import React from 'react'

function getBPStatus(vitals, thresholds) {
  const { sbp, dbp, map } = vitals
  const t = thresholds
  if (t.sbp?.critLow  && sbp <= t.sbp.critLow)   return { sev: 'critical', msg: `SBP critically low · ${sbp} mmHg` }
  if (t.map?.critLow  && map <= t.map.critLow)    return { sev: 'critical', msg: `MAP critically low · ${map} mmHg` }
  if (t.dbp?.critLow  && dbp <= t.dbp.critLow)    return { sev: 'critical', msg: `DBP critically low · ${dbp} mmHg` }
  if (t.sbp?.critHigh && sbp >= t.sbp.critHigh)   return { sev: 'critical', msg: `SBP critically high · ${sbp} mmHg` }
  if (t.map?.critHigh && map >= t.map.critHigh)    return { sev: 'critical', msg: `MAP critically high · ${map} mmHg` }
  if (t.dbp?.critHigh && dbp >= t.dbp.critHigh)    return { sev: 'critical', msg: `DBP critically high · ${dbp} mmHg` }
  if (t.sbp?.warnLow  && sbp <= t.sbp.warnLow)   return { sev: 'warning',  msg: `SBP below limit · ${sbp} mmHg` }
  if (t.map?.warnLow  && map <= t.map.warnLow)    return { sev: 'warning',  msg: `MAP below limit · ${map} mmHg` }
  if (t.dbp?.warnLow  && dbp <= t.dbp.warnLow)    return { sev: 'warning',  msg: `DBP below limit · ${dbp} mmHg` }
  if (t.sbp?.warnHigh && sbp >= t.sbp.warnHigh)   return { sev: 'warning',  msg: `SBP above limit · ${sbp} mmHg` }
  if (t.map?.warnHigh && map >= t.map.warnHigh)    return { sev: 'warning',  msg: `MAP above limit · ${map} mmHg` }
  if (t.dbp?.warnHigh && dbp >= t.dbp.warnHigh)    return { sev: 'warning',  msg: `DBP above limit · ${dbp} mmHg` }
  return { sev: 'stable', msg: 'All within range' }
}

export default function BPCard({ vitals, thresholds }) {
  const { sbp, dbp, map } = vitals
  const { sev, msg } = getBPStatus(vitals, thresholds)

  return (
    <div className={`vital-card vital-card--${sev}`}>
      <div className="vital-card__label">↑↓ Blood Pressure</div>
      <div className="bp-main">
        <span className="bp-sbpdbp">{sbp}<span className="bp-slash">/</span>{dbp}</span>
      </div>
      <div className="bp-map-row">
        <span className="bp-map-label">MAP</span>
        <span className="bp-map-val">{map}</span>
        <span className="bp-map-unit">mmHg</span>
      </div>
      <div className="vital-card__status">
        {sev !== 'stable' ? `↓ ${msg}` : 'All within range'}
      </div>
    </div>
  )
}
