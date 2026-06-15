const _now = Date.now()

// ── Neonatal thresholds (used for Baby Kiran) ──
const NEONATAL_THRESHOLDS = {
  hr:   { warnLow: 110, critLow: 80,  warnHigh: 180, critHigh: 200 },
  spo2: { warnLow: 92,  critLow: 88,  warnHigh: null, critHigh: null },
  rr:   { warnLow: 30,  critLow: 20,  warnHigh: 65,  critHigh: 75  },
  sbp:  { warnLow: 45,  critLow: 35,  warnHigh: 90,  critHigh: 100 },
  dbp:  { warnLow: 25,  critLow: 18,  warnHigh: 60,  critHigh: 70  },
  map:  { warnLow: 40,  critLow: 30,  warnHigh: 65,  critHigh: 75  },
}

// ── Adult defaults — doctor should always customize per patient ──
export const DEFAULT_THRESHOLDS = {
  hr:   { warnLow: 50,  critLow: 40,   warnHigh: 120, critHigh: 150 },
  spo2: { warnLow: 92,  critLow: 88,   warnHigh: null, critHigh: null },
  rr:   { warnLow: 10,  critLow: 6,    warnHigh: 25,  critHigh: 30  },
  sbp:  { warnLow: 90,  critLow: 70,   warnHigh: 160, critHigh: 180 },
  dbp:  { warnLow: 50,  critLow: 40,   warnHigh: 100, critHigh: 110 },
  map:  { warnLow: 65,  critLow: 50,   warnHigh: 110, critHigh: 120 },
}

export const VITAL_META = {
  hr:   { label: 'Heart Rate',    unit: 'bpm',   icon: '♥', min: 20,  max: 250 },
  spo2: { label: 'SpO₂',         unit: '%',      icon: '◉', min: 50,  max: 100 },
  rr:   { label: 'Resp. Rate',    unit: 'br/min', icon: '≈', min: 4,   max: 100 },
  sbp:  { label: 'BP systolic',   unit: 'mmHg',   icon: '↑', min: 30,  max: 240 },
  dbp:  { label: 'BP diastolic',  unit: 'mmHg',   icon: '↓', min: 10,  max: 150 },
  map:  { label: 'MAP',           unit: 'mmHg',   icon: '~', min: 20,  max: 180 },
}

export const INITIAL_PATIENTS = [
  // ── NICU ──────────────────────────────────────────────
  {
    id: 1,
    name: 'Baby Kiran',
    gender: 'M',
    age: '2 days',
    diagnosis: 'PPHN',
    support: 'HFO Ventilator',
    bed: 'Bed 3',
    ward: 'NICU',
    dutyPhone: '+911234567890',
    thresholds: JSON.parse(JSON.stringify(NEONATAL_THRESHOLDS)),
    vitals: { hr: 88, spo2: 87, rr: 48, sbp: 52, dbp: 32, map: 39 },
    sim: {
      hr:   { base: 88,  range: 10, maxDrift: 28 },
      spo2: { base: 87,  range: 3,  maxDrift: 9  },
      rr:   { base: 48,  range: 6,  maxDrift: 14 },
      sbp:  { base: 52,  range: 5,  maxDrift: 12 },
      dbp:  { base: 32,  range: 3,  maxDrift: 8  },
    },
  },
  // ── ICU — Post-op ─────────────────────────────────────
  {
    id: 2,
    name: 'Mr. Arjun Kumar',
    gender: 'M',
    age: '58 years',
    diagnosis: 'Post CABG (Day 1)',
    support: 'T-piece / Noradrenaline',
    bed: 'Bed 2',
    ward: 'ICU',
    dutyPhone: '+911234567891',
    thresholds: {
      hr:   { warnLow: 55,  critLow: 45,   warnHigh: 100, critHigh: 120 },
      spo2: { warnLow: 94,  critLow: 90,   warnHigh: null, critHigh: null },
      rr:   { warnLow: 10,  critLow: 6,    warnHigh: 22,  critHigh: 28  },
      sbp:  { warnLow: 90,  critLow: 75,   warnHigh: 140, critHigh: 165 },
      dbp:  { warnLow: 50,  critLow: 40,   warnHigh: 90,  critHigh: 100 },
      map:  { warnLow: 65,  critLow: 50,   warnHigh: 100, critHigh: 110 },
    },
    vitals: { hr: 82, spo2: 97, rr: 16, sbp: 118, dbp: 72, map: 87 },
    sim: {
      hr:   { base: 82,  range: 5,  maxDrift: 15 },
      spo2: { base: 97,  range: 1,  maxDrift: 3  },
      rr:   { base: 16,  range: 2,  maxDrift: 5  },
      sbp:  { base: 118, range: 6,  maxDrift: 18 },
      dbp:  { base: 72,  range: 4,  maxDrift: 12 },
    },
  },
  // ── Labor Room ────────────────────────────────────────
  {
    id: 3,
    name: 'Mrs. Sunita Devi',
    gender: 'F',
    age: '28 years',
    diagnosis: 'Severe Pre-eclampsia',
    support: 'IV MgSO₄ / Hydralazine PRN',
    bed: 'LR Bed 1',
    ward: 'Labor Room',
    dutyPhone: '+911234567892',
    thresholds: {
      hr:   { warnLow: 60,  critLow: 50,   warnHigh: 110, critHigh: 130 },
      spo2: { warnLow: 94,  critLow: 90,   warnHigh: null, critHigh: null },
      rr:   { warnLow: 12,  critLow: 8,    warnHigh: 24,  critHigh: 30  },
      sbp:  { warnLow: 100, critLow: 80,   warnHigh: 155, critHigh: 170 },
      dbp:  { warnLow: 60,  critLow: 50,   warnHigh: 100, critHigh: 110 },
      map:  { warnLow: 70,  critLow: 55,   warnHigh: 110, critHigh: 120 },
    },
    vitals: { hr: 96, spo2: 98, rr: 20, sbp: 158, dbp: 104, map: 122 },
    sim: {
      hr:   { base: 96,  range: 6,  maxDrift: 18 },
      spo2: { base: 98,  range: 1,  maxDrift: 2  },
      rr:   { base: 20,  range: 2,  maxDrift: 6  },
      sbp:  { base: 158, range: 8,  maxDrift: 20 },
      dbp:  { base: 104, range: 5,  maxDrift: 15 },
    },
  },
]

export const INITIAL_COMMENTS = [
  // Baby Kiran — NICU
  {
    id: 101,
    patientId: 1,
    text: 'Increase iNO to 20 ppm if MAP stays below 40 for more than 15 min. Call me if no improvement within 30 min.',
    author: 'Dr. Sunil',
    time: new Date(_now - 2 * 3600000).toISOString(),
    type: 'order',
  },
  {
    id: 102,
    patientId: 1,
    text: 'Echo this morning — moderate RV dysfunction, D-shaped septum. Continue sildenafil 2 mg/kg/day. iNO currently at 15 ppm.',
    author: 'Dr. Sunil',
    time: new Date(_now - 6 * 3600000).toISOString(),
    type: 'note',
  },
  {
    id: 103,
    patientId: 1,
    text: 'If SpO₂ drops below 82% — give rescue adrenaline 0.1 mg/kg IV stat and call me IMMEDIATELY. Do NOT wait.',
    author: 'Dr. Sunil',
    time: new Date(_now - 10 * 3600000).toISOString(),
    type: 'order',
  },
  // Mr. Arjun Kumar — ICU
  {
    id: 201,
    patientId: 2,
    text: 'Noradrenaline 0.05 mcg/kg/min. Target MAP 65–90. If MAP <60 for >5 min — increase norad to 0.1 mcg/kg/min and call me.',
    author: 'Dr. Sunil',
    time: new Date(_now - 1.5 * 3600000).toISOString(),
    type: 'order',
  },
  {
    id: 202,
    patientId: 2,
    text: 'Post-CABG Day 1. Heparin infusion 800 u/hr — recheck ACT at 0600h, target 200–250s. Aspirin 75mg + atorvastatin 40mg via NG.',
    author: 'Dr. Sunil',
    time: new Date(_now - 4 * 3600000).toISOString(),
    type: 'note',
  },
  {
    id: 203,
    patientId: 2,
    text: 'If SBP >150 or HR >110 — check pain score first. IV metoprolol 2.5mg if HR >110 with adequate BP. Do not give if SBP <100.',
    author: 'Dr. Sunil',
    time: new Date(_now - 6 * 3600000).toISOString(),
    type: 'order',
  },
  // Mrs. Sunita Devi — Labor Room
  {
    id: 301,
    patientId: 3,
    text: 'MgSO₄ maintenance 2g/hr IV. Monitor urine output — target >30 mL/hr. Recheck magnesium levels at 0600h.',
    author: 'Dr. Sunil',
    time: new Date(_now - 1 * 3600000).toISOString(),
    type: 'order',
  },
  {
    id: 302,
    patientId: 3,
    text: 'Target BP <155/100. If diastolic >110 or SBP >160 — give hydralazine 5 mg IV stat. Repeat after 20 min if no response.',
    author: 'Dr. Sunil',
    time: new Date(_now - 2.5 * 3600000).toISOString(),
    type: 'order',
  },
  {
    id: 303,
    patientId: 3,
    text: 'CTG looks reassuring at last check. Fetal HR 138 — good variability. Continue continuous CTG monitoring. Call if late decelerations.',
    author: 'Dr. Sunil',
    time: new Date(_now - 3 * 3600000).toISOString(),
    type: 'note',
  },
]
