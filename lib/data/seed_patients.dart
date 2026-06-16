import '../models/vital.dart';
import '../models/patient.dart';
import '../models/comment.dart';

final _now = DateTime.now();

const _neonatalThresholds = {
  VitalType.hr: VitalThreshold(warnLow: 110, critLow: 80, warnHigh: 180, critHigh: 200),
  VitalType.spo2: VitalThreshold(warnLow: 92, critLow: 88),
  VitalType.rr: VitalThreshold(warnLow: 30, critLow: 20, warnHigh: 65, critHigh: 75),
  VitalType.sbp: VitalThreshold(warnLow: 45, critLow: 35, warnHigh: 90, critHigh: 100),
  VitalType.dbp: VitalThreshold(warnLow: 25, critLow: 18, warnHigh: 60, critHigh: 70),
  VitalType.map: VitalThreshold(warnLow: 40, critLow: 30, warnHigh: 65, critHigh: 75),
};

const defaultAdultThresholds = {
  VitalType.hr: VitalThreshold(warnLow: 50, critLow: 40, warnHigh: 120, critHigh: 150),
  VitalType.spo2: VitalThreshold(warnLow: 92, critLow: 88),
  VitalType.rr: VitalThreshold(warnLow: 10, critLow: 6, warnHigh: 25, critHigh: 30),
  VitalType.sbp: VitalThreshold(warnLow: 90, critLow: 70, warnHigh: 160, critHigh: 180),
  VitalType.dbp: VitalThreshold(warnLow: 50, critLow: 40, warnHigh: 100, critHigh: 110),
  VitalType.map: VitalThreshold(warnLow: 65, critLow: 50, warnHigh: 110, critHigh: 120),
};

final List<Patient> seedPatients = [
  Patient(
    id: '1',
    name: 'Baby Kiran',
    gender: 'M',
    age: '2 days',
    diagnosis: 'PPHN',
    support: 'HFO Ventilator',
    bed: 'Bed 3',
    ward: 'NICU',
    dutyPhone: '+911234567890',
    thresholds: Map.from(_neonatalThresholds),
    vitals: {
      VitalType.hr: 88, VitalType.spo2: 87, VitalType.rr: 48,
      VitalType.sbp: 52, VitalType.dbp: 32, VitalType.map: 39,
    },
    sim: {
      VitalType.hr: SimConfig(base: 88, range: 10, maxDrift: 28),
      VitalType.spo2: SimConfig(base: 87, range: 3, maxDrift: 9),
      VitalType.rr: SimConfig(base: 48, range: 6, maxDrift: 14),
      VitalType.sbp: SimConfig(base: 52, range: 5, maxDrift: 12),
      VitalType.dbp: SimConfig(base: 32, range: 3, maxDrift: 8),
    },
  ),
  Patient(
    id: '2',
    name: 'Mr. Arjun Kumar',
    gender: 'M',
    age: '58 years',
    diagnosis: 'Post CABG (Day 1)',
    support: 'T-piece / Noradrenaline',
    bed: 'Bed 2',
    ward: 'ICU',
    dutyPhone: '+911234567891',
    thresholds: {
      VitalType.hr: VitalThreshold(warnLow: 55, critLow: 45, warnHigh: 100, critHigh: 120),
      VitalType.spo2: VitalThreshold(warnLow: 94, critLow: 90),
      VitalType.rr: VitalThreshold(warnLow: 10, critLow: 6, warnHigh: 22, critHigh: 28),
      VitalType.sbp: VitalThreshold(warnLow: 90, critLow: 75, warnHigh: 140, critHigh: 165),
      VitalType.dbp: VitalThreshold(warnLow: 50, critLow: 40, warnHigh: 90, critHigh: 100),
      VitalType.map: VitalThreshold(warnLow: 65, critLow: 50, warnHigh: 100, critHigh: 110),
    },
    vitals: {
      VitalType.hr: 82, VitalType.spo2: 97, VitalType.rr: 16,
      VitalType.sbp: 118, VitalType.dbp: 72, VitalType.map: 87,
    },
    sim: {
      VitalType.hr: SimConfig(base: 82, range: 5, maxDrift: 15),
      VitalType.spo2: SimConfig(base: 97, range: 1, maxDrift: 3),
      VitalType.rr: SimConfig(base: 16, range: 2, maxDrift: 5),
      VitalType.sbp: SimConfig(base: 118, range: 6, maxDrift: 18),
      VitalType.dbp: SimConfig(base: 72, range: 4, maxDrift: 12),
    },
  ),
  Patient(
    id: '4',
    name: 'Mr. Rajesh Mehta',
    gender: 'M',
    age: '62 years',
    diagnosis: 'Septic Shock + ARDS (urosepsis Day 2)',
    support: 'Invasive Vent + Norad + Vasopressin',
    bed: 'Bed 4',
    ward: 'MICU',
    dutyPhone: '+911234567893',
    thresholds: {
      VitalType.hr: VitalThreshold(warnLow: 55, critLow: 45, warnHigh: 125, critHigh: 145),
      VitalType.spo2: VitalThreshold(warnLow: 90, critLow: 88),
      VitalType.rr: VitalThreshold(warnLow: 8, critLow: 6, warnHigh: 30, critHigh: 36),
      VitalType.sbp: VitalThreshold(warnLow: 90, critLow: 70, warnHigh: 160, critHigh: 180),
      VitalType.dbp: VitalThreshold(warnLow: 50, critLow: 40, warnHigh: 100, critHigh: 110),
      VitalType.map: VitalThreshold(warnLow: 65, critLow: 55, warnHigh: 100, critHigh: 110),
    },
    vitals: {
      VitalType.hr: 122, VitalType.spo2: 86, VitalType.rr: 28,
      VitalType.sbp: 78, VitalType.dbp: 44, VitalType.map: 55,
    },
    sim: {
      VitalType.hr: SimConfig(base: 122, range: 12, maxDrift: 25),
      VitalType.spo2: SimConfig(base: 86, range: 3, maxDrift: 8),
      VitalType.rr: SimConfig(base: 28, range: 4, maxDrift: 10),
      VitalType.sbp: SimConfig(base: 78, range: 10, maxDrift: 22),
      VitalType.dbp: SimConfig(base: 44, range: 6, maxDrift: 15),
    },
  ),
  Patient(
    id: '3',
    name: 'Mrs. Sunita Devi',
    gender: 'F',
    age: '28 years',
    diagnosis: 'Severe Pre-eclampsia',
    support: 'IV MgSO₄ / Hydralazine PRN',
    bed: 'LR Bed 1',
    ward: 'Labor Room',
    dutyPhone: '+911234567892',
    thresholds: {
      VitalType.hr: VitalThreshold(warnLow: 60, critLow: 50, warnHigh: 110, critHigh: 130),
      VitalType.spo2: VitalThreshold(warnLow: 94, critLow: 90),
      VitalType.rr: VitalThreshold(warnLow: 12, critLow: 8, warnHigh: 24, critHigh: 30),
      VitalType.sbp: VitalThreshold(warnLow: 100, critLow: 80, warnHigh: 155, critHigh: 170),
      VitalType.dbp: VitalThreshold(warnLow: 60, critLow: 50, warnHigh: 100, critHigh: 110),
      VitalType.map: VitalThreshold(warnLow: 70, critLow: 55, warnHigh: 110, critHigh: 120),
    },
    vitals: {
      VitalType.hr: 96, VitalType.spo2: 98, VitalType.rr: 20,
      VitalType.sbp: 158, VitalType.dbp: 104, VitalType.map: 122,
    },
    sim: {
      VitalType.hr: SimConfig(base: 96, range: 6, maxDrift: 18),
      VitalType.spo2: SimConfig(base: 98, range: 1, maxDrift: 2),
      VitalType.rr: SimConfig(base: 20, range: 2, maxDrift: 6),
      VitalType.sbp: SimConfig(base: 158, range: 8, maxDrift: 20),
      VitalType.dbp: SimConfig(base: 104, range: 5, maxDrift: 15),
    },
  ),
];

final List<Comment> seedComments = [
  Comment(id: '101', patientId: '1', text: 'Increase iNO to 20 ppm if MAP stays below 40 for more than 15 min. Call me if no improvement within 30 min.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 2)), type: 'order'),
  Comment(id: '102', patientId: '1', text: 'Echo this morning — moderate RV dysfunction, D-shaped septum. Continue sildenafil 2 mg/kg/day. iNO currently at 15 ppm.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 6)), type: 'note'),
  Comment(id: '103', patientId: '1', text: 'If SpO₂ drops below 82% — give rescue adrenaline 0.1 mg/kg IV stat and call me IMMEDIATELY. Do NOT wait.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 10)), type: 'order'),
  Comment(id: '201', patientId: '2', text: 'Noradrenaline 0.05 mcg/kg/min. Target MAP 65–90. If MAP <60 for >5 min — increase norad to 0.1 mcg/kg/min and call me.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 1, minutes: 30)), type: 'order'),
  Comment(id: '202', patientId: '2', text: 'Post-CABG Day 1. Heparin infusion 800 u/hr — recheck ACT at 0600h, target 200–250s. Aspirin 75mg + atorvastatin 40mg via NG.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 4)), type: 'note'),
  Comment(id: '203', patientId: '2', text: 'If SBP >150 or HR >110 — check pain score first. IV metoprolol 2.5mg if HR >110 with adequate BP. Do not give if SBP <100.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 6)), type: 'order'),
  Comment(id: '401', patientId: '4', text: 'Noradrenaline 0.2 mcg/kg/min + vasopressin 0.04 u/min running. TARGET MAP ≥65. If MAP <60 for >5 min — give 250mL albumin 20% bolus and increase norad by 0.05 mcg/kg/min. Call me immediately.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 2)), type: 'order'),
  Comment(id: '402', patientId: '4', text: 'Lung-protective ventilation: TV 380 mL (6 mL/kg IBW 63 kg), PEEP 10, FiO₂ 0.60, RR 20. Target SpO₂ 88–94%, plateau pressure <30 cmH₂O.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 4)), type: 'order'),
  Comment(id: '403', patientId: '4', text: 'Septic shock Day 2 — urosepsis. E. coli grown on urine culture. Meropenem 2g Q8h started. PCT 68 ng/mL, CRP 220, SOFA score 12. Lactate trending down 4.2 → 2.8.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 7)), type: 'note'),
  Comment(id: '301', patientId: '3', text: 'MgSO₄ maintenance 2g/hr IV. Monitor urine output — target >30 mL/hr. Recheck magnesium levels at 0600h.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 1)), type: 'order'),
  Comment(id: '302', patientId: '3', text: 'Target BP <155/100. If diastolic >110 or SBP >160 — give hydralazine 5 mg IV stat. Repeat after 20 min if no response.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 2, minutes: 30)), type: 'order'),
  Comment(id: '303', patientId: '3', text: 'CTG looks reassuring at last check. Fetal HR 138 — good variability. Continue continuous CTG monitoring. Call if late decelerations.', author: 'Dr. Sunil', time: _now.subtract(const Duration(hours: 3)), type: 'note'),
];
