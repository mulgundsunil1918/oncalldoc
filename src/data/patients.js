export const DEFAULT_THRESHOLDS = {
  hr:   { warnLow: 110, critLow: 80,  warnHigh: 180, critHigh: 200 },
  spo2: { warnLow: 92,  critLow: 88,  warnHigh: null, critHigh: null },
  rr:   { warnLow: 30,  critLow: 20,  warnHigh: 65,  critHigh: 75  },
  bp:   { warnLow: 35,  critLow: 28,  warnHigh: null, critHigh: null },
}

export const VITAL_META = {
  hr:   { label: 'Heart Rate',   unit: 'bpm',    icon: '♥', min: 40,  max: 220 },
  spo2: { label: 'SpO₂',        unit: '%',       icon: '◉', min: 70,  max: 100 },
  rr:   { label: 'Resp. Rate',   unit: 'br/min',  icon: '≈', min: 10,  max: 100 },
  bp:   { label: 'BP systolic',  unit: 'mmHg',    icon: '↑', min: 20,  max: 120 },
}

export const INITIAL_PATIENTS = [
  {
    id: 1,
    name: 'Baby Kiran',
    gender: 'M',
    age: '2 days',
    diagnosis: 'PPHN',
    support: 'HFO Ventilator',
    bed: 'Bed 3',
    ward: 'NICU',
    thresholds: JSON.parse(JSON.stringify(DEFAULT_THRESHOLDS)),
    vitals: { hr: 88, spo2: 87, rr: 48, bp: 52 },
    sim: {
      hr:   { base: 88,  range: 10, maxDrift: 28 },
      spo2: { base: 87,  range: 3,  maxDrift: 9  },
      rr:   { base: 48,  range: 6,  maxDrift: 14 },
      bp:   { base: 52,  range: 5,  maxDrift: 12 },
    },
  },
  {
    id: 2,
    name: 'Baby Priya',
    gender: 'F',
    age: '5 days',
    diagnosis: 'RDS',
    support: 'Conv. Ventilator',
    bed: 'Bed 7',
    ward: 'NICU',
    thresholds: JSON.parse(JSON.stringify(DEFAULT_THRESHOLDS)),
    vitals: { hr: 138, spo2: 93, rr: 52, bp: 56 },
    sim: {
      hr:   { base: 138, range: 8,  maxDrift: 28 },
      spo2: { base: 93,  range: 2,  maxDrift: 7  },
      rr:   { base: 52,  range: 5,  maxDrift: 12 },
      bp:   { base: 56,  range: 4,  maxDrift: 10 },
    },
  },
  {
    id: 3,
    name: 'Baby Rohan',
    gender: 'M',
    age: '8 days',
    diagnosis: 'Neonatal Sepsis',
    support: 'CPAP',
    bed: 'Bed 12',
    ward: 'NICU',
    thresholds: JSON.parse(JSON.stringify(DEFAULT_THRESHOLDS)),
    vitals: { hr: 142, spo2: 96, rr: 45, bp: 58 },
    sim: {
      hr:   { base: 142, range: 5,  maxDrift: 16 },
      spo2: { base: 96,  range: 1,  maxDrift: 4  },
      rr:   { base: 45,  range: 4,  maxDrift: 10 },
      bp:   { base: 58,  range: 3,  maxDrift: 8  },
    },
  },
]
