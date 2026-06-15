import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tutorial() {
  const navigate = useNavigate()
  const [activeScenario, setActiveScenario] = useState('nicu')

  return (
    <div className="tut-page">
      <nav className="navbar">
        <div className="navbar__brand">
          <span className="navbar__logo">OnCallDoc</span>
          <span className="navbar__tag">How it works</span>
        </div>
        <button className="btn-back" onClick={() => navigate('/')}>← Dashboard</button>
      </nav>

      {/* ── HERO ── */}
      <div className="tut-hero">
        <div className="tut-section__inner">
          <p className="tut-hero__eyebrow">OnCallDoc · Universal Patient Monitoring</p>
          <h1 className="tut-hero__title">Any patient.<br />Any ward.<br />Your eyes on them — from anywhere.</h1>
          <p className="tut-hero__sub">
            Whether your patient is a neonate on HFO in the NICU, a post-CABG man in the ICU,
            a high-risk mother in the labor room, or a dengue patient in the general ward —
            OnCallDoc lets you personally monitor them in real-time, from wherever you are.
          </p>
          <div className="tut-hero__wards">
            {['ICU', 'NICU', 'PICU', 'Post-op', 'Labor Room', 'HDU', 'General Ward', 'Emergency'].map(w => (
              <span key={w} className="ward-chip">{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="tut-section">
        <div className="tut-section__inner">
          <span className="tut-tag tut-tag--problem">The Problem</span>
          <h2 className="tut-section__title">Every treating doctor faces the same moment.<br />You have to leave. Your patient can't.</h2>
          <p style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.7 }}>
            This happens dozens of times a day, in every specialty, in every hospital in India. The doctor stabilizes, optimizes, writes orders — then hands over to a team that doesn't know the patient as well. The gap between the doctor who knows and the team that's present is where things go wrong.
          </p>
          <div className="tut-cards-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="tut-card">
              <div className="tut-card__icon">🫀</div>
              <h3>ICU — Post-op cardiac</h3>
              <p>You close after an 8-hour CABG. Your patient is on vasopressors, MAP 68. You leave at 10 PM. The duty resident doesn't know his specific targets. If MAP drops to 52 at 2 AM — how long before anyone calls you?</p>
            </div>
            <div className="tut-card">
              <div className="tut-card__icon">👶</div>
              <h3>NICU — Critical neonate</h3>
              <p>Your PPHN baby is on iNO and HFO, SpO₂ holding at 87–90%. You leave after a 14-hour shift. One desaturation at night and the window for easy intervention is minutes — not the 20 minutes it takes to reach the hospital.</p>
            </div>
            <div className="tut-card">
              <div className="tut-card__icon">🤰</div>
              <h3>Labor Room — High-risk obstetrics</h3>
              <p>Your severe pre-eclampsia patient is on MgSO₄, BP 158/104. You're managing 3 other wards. The nurse is watching 4 patients. BP spikes to 172/116 at midnight — she calls 15 minutes later.</p>
            </div>
            <div className="tut-card">
              <div className="tut-card__icon">🏥</div>
              <h3>General Ward — Deteriorating patient</h3>
              <p>Your dengue patient had platelets of 40,000 yesterday. He starts bleeding internally at 3 AM. The ward boy notices something wrong at 4:30. BP has already crashed. The window for platelet transfusion has closed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION ── */}
      <section className="tut-section tut-section--brand">
        <div className="tut-section__inner">
          <span className="tut-tag tut-tag--solution">The Solution</span>
          <h2 className="tut-section__title" style={{ color: '#fff' }}>
            OnCallDoc gives you a second pair of eyes<br />at the bedside — yours.
          </h2>
          <p className="tut-section__sub" style={{ color: 'rgba(255,255,255,0.82)' }}>
            A small hardware module at the patient's bedside. You monitor from your phone.
            No hospital IT department involved. Installs in under an hour. Works in any ward.
          </p>
          <div className="tut-features-grid">
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📹</span>
              <h3>Live Camera</h3>
              <p>See your patient in real-time. Watch the chest rise, see the bedside monitor, know the clinical picture from wherever you are.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📊</span>
              <h3>Real-Time Vitals</h3>
              <p>HR, SpO₂, RR, SBP, DBP, MAP — streaming every 2 seconds. Your patient's numbers, on your screen.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">🚨</span>
              <h3>Two-Tier Alerts</h3>
              <p>Warning → push notification. Critical → alarm beep. You set the thresholds per vital per patient. You decide what wakes you up.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">💬</span>
              <h3>Instant Orders</h3>
              <p>Type your instruction — it appears on the bedside display. "Give hydralazine 5mg IV stat" — the nurse sees it and acts immediately.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📞</span>
              <h3>One-Tap Call</h3>
              <p>Call the ward phone directly from the patient screen. No searching for numbers when every second counts.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">🎚️</span>
              <h3>Custom Thresholds</h3>
              <p>Every patient is different. A PPHN neonate's MAP target is not the same as a post-CABG man's. Set them individually.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="tut-section tut-section--alt">
        <div className="tut-section__inner">
          <span className="tut-tag">Step by step</span>
          <h2 className="tut-section__title">From any ward to your phone — in under an hour</h2>
          <div className="tut-steps">
            <div className="tut-step">
              <div className="tut-step__num">1</div>
              <div className="tut-step__content">
                <h3>Arrive at the ward with the module</h3>
                <p>The OnCallDoc kit: 1× IP camera (WiFi/PoE, 1080p, night vision), 1× bedside tablet running the ward display app, 1× SIM card router. No hospital IT involvement needed. Works on its own 4G connection.</p>
                <div className="tut-visual-box">
                  <span style={{ fontSize: 32 }}>📹  🖥️  📶</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center' }}>Camera · Bedside tablet · 4G router — your complete kit</span>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">2</div>
              <div className="tut-step__content">
                <h3>Position camera, register patient</h3>
                <p>Camera angle: capture the patient's face/chest AND the bedside monitor screen in one frame. Then open OnCallDoc, tap "+ Add patient," fill in the details. Patient appears in your list in 30 seconds.</p>
                <div className="tut-visual-box" style={{ background: 'var(--brand-lt)' }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[['Post CABG', 'ICU'], ['PPHN', 'NICU'], ['Pre-eclampsia', 'Labor Room'], ['Dengue', 'Ward']].map(([dx, w]) => (
                      <div key={dx} style={{ textAlign: 'center' }}>
                        <span className="badge badge--stable" style={{ display: 'block', marginBottom: 3 }}>{dx}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">3</div>
              <div className="tut-step__content">
                <h3>Set your thresholds for this patient</h3>
                <p>Open the patient monitor. For each vital, set warning and critical limits based on what matters for this specific patient and diagnosis. A post-CABG patient needs MAP ≥65. A pre-eclampsia mother needs SBP &lt;155. Set it exactly.</p>
                <div className="tut-visual-box">
                  <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.8 }}>
                    <div><strong>Post-CABG:</strong> MAP warn &lt;65 → crit &lt;50</div>
                    <div><strong>NICU baby:</strong> SpO₂ warn &lt;88 → crit &lt;82</div>
                    <div><strong>Pre-eclampsia:</strong> SBP warn &gt;155 → crit &gt;170</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">4</div>
              <div className="tut-step__content">
                <h3>Brief the ward staff</h3>
                <p>Show the duty nurse the bedside tablet. One sentence: "When you see a new message on this screen from me — act on it immediately." Get written consent from patient/guardian (required). Done.</p>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">5</div>
              <div className="tut-step__content">
                <h3>Leave. You're still watching.</h3>
                <p>Go home. Go to your next hospital. Go to your OPD. Your patient's vitals stream to your phone. Any crossing of threshold — you know before the nurse does. Open the app, see, decide, order.</p>
                <div className="tut-visual-box" style={{ background: '#fff3f3', borderColor: '#f7c1c1' }}>
                  <span style={{ fontSize: 13, color: 'var(--critical)', fontWeight: 500, textAlign: 'center' }}>
                    🚨 Mr. Arjun Kumar — MAP critically low: 52 mmHg<br />
                    <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-2)' }}>Alert fired · 11:22 PM · ICU Bed 2</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL SCENARIOS ── */}
      <section className="tut-section">
        <div className="tut-section__inner">
          <span className="tut-tag">Real scenarios</span>
          <h2 className="tut-section__title">See how it works across different wards</h2>

          <div className="scenario-tabs">
            <button className={`scenario-tab${activeScenario === 'nicu' ? ' scenario-tab--active' : ''}`} onClick={() => setActiveScenario('nicu')}>
              👶 NICU — PPHN
            </button>
            <button className={`scenario-tab${activeScenario === 'icu' ? ' scenario-tab--active' : ''}`} onClick={() => setActiveScenario('icu')}>
              🫀 ICU — Post-CABG
            </button>
            <button className={`scenario-tab${activeScenario === 'labor' ? ' scenario-tab--active' : ''}`} onClick={() => setActiveScenario('labor')}>
              🤰 Labor Room
            </button>
          </div>

          {activeScenario === 'nicu' && (
            <div>
              <p className="scenario-context">Baby Kiran · 2-day-old · PPHN on HFO Ventilator · NICU Bed 3</p>
              <div className="tut-scenario">
                <div className="tut-event">
                  <span className="tut-event__time">8:00 PM</span>
                  <div className="tut-event__card">You stabilize Baby Kiran after a 12-hour shift. HFO: MAP 12, Hz 10, Amplitude 30. iNO at 15 ppm. SpO₂ 87–90%. You install the module, set thresholds (SpO₂ crit &lt;82%, MAP crit &lt;30), brief the nurse, and leave.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:35 PM</span>
                  <div className="tut-event__card tut-event__card--alert">🚨 <strong>OnCallDoc alert fires</strong> — SpO₂ critically low: 82%. You wake up. You open the app. Live camera shows Baby Kiran is agitated. Vitals: SpO₂ 82%, MAP 36, HR 108. You act in under 60 seconds of the alert.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:36 PM</span>
                  <div className="tut-event__card tut-event__card--order">You type: <em>"Increase iNO to 20 ppm now. Check ventilator circuit for leak. Suction if secretions. Call me in 10 min."</em> — appears on ward tablet. Nurse acts immediately.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:48 PM</span>
                  <div className="tut-event__card tut-event__card--stable">SpO₂ recovering — 86%, 89%, 92%. MAP stable at 41. You watch for 10 more minutes on the app. Crisis managed. You go back to sleep.</div>
                </div>
              </div>
              <p className="tut-scenario__caption">Without OnCallDoc: nurse noticed at midnight, called duty resident who needed 20 min to respond, Baby Kiran could have been in severe distress for over an hour before correct intervention.</p>
            </div>
          )}

          {activeScenario === 'icu' && (
            <div>
              <p className="scenario-context">Mr. Arjun Kumar · 58Y M · Post-CABG Day 1 · ICU Bed 2 · On Noradrenaline</p>
              <div className="tut-scenario">
                <div className="tut-event">
                  <span className="tut-event__time">7:00 PM</span>
                  <div className="tut-event__card">Surgery ends after 7 hours. You close, hand over to ICU team. MAP 74, HR 82, norad 0.05 mcg/kg/min, cardiac output adequate. You install the OnCallDoc module, set thresholds (MAP crit &lt;50, SBP warn &lt;90), type your standing orders, and leave.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:22 PM</span>
                  <div className="tut-event__card tut-event__card--alert">🚨 <strong>Alert fires</strong> — MAP critically low: 52. You open the app. Camera shows patient is diaphoretic. HR 110, SBP 88/52, MAP 52. Vasopressor need increasing — and you need to rule out tamponade.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:23 PM</span>
                  <div className="tut-event__card tut-event__card--order">You type: <em>"Increase norad to 0.1 mcg/kg/min immediately. If MAP &lt;50 in 10 min — add vasopressin 0.04 u/min. Get urgent bedside echo to rule out tamponade. Call me with echo result."</em></div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:40 PM</span>
                  <div className="tut-event__card tut-event__card--stable">MAP recovering — 60, 67, 74. Echo by resident: no tamponade, mild hypovolemia. You order 250mL albumin bolus via the orders panel. Patient stabilized. You review vitals for 20 min and sleep.</div>
                </div>
              </div>
              <p className="tut-scenario__caption">Without OnCallDoc: the resident might have noticed the MAP drop 30 minutes later during routine rounds, by which point end-organ hypoperfusion would already have occurred for 30+ minutes post-CABG.</p>
            </div>
          )}

          {activeScenario === 'labor' && (
            <div>
              <p className="scenario-context">Mrs. Sunita Devi · 28Y F · Severe Pre-eclampsia · Labor Room · 36 weeks</p>
              <div className="tut-scenario">
                <div className="tut-event">
                  <span className="tut-event__time">9:00 PM</span>
                  <div className="tut-event__card">Patient admitted with BP 158/104. Started MgSO₄ loading + maintenance 2g/hr. You set OnCallDoc thresholds: SBP warn &gt;155 / crit &gt;170, DBP warn &gt;100 / crit &gt;110. You leave for another ward. Camera on patient, CTG visible on screen.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:50 PM</span>
                  <div className="tut-event__card tut-event__card--alert">⚠️ <strong>Warning alert</strong> — SBP above limit: 162. You check the app. Camera shows patient is restless, complaining of headache. BP 162/108. MAP 126. This needs immediate antihypertensive.</div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">11:51 PM</span>
                  <div className="tut-event__card tut-event__card--order">You type: <em>"Give hydralazine 5mg IV stat now. Recheck BP in 20 min. If still &gt;155/100 — repeat hydralazine 5mg. Check fetal HR on CTG. Call me immediately if she has seizure or BP &gt;170."</em></div>
                </div>
                <div className="tut-event">
                  <span className="tut-event__time">12:18 AM</span>
                  <div className="tut-event__card tut-event__card--stable">BP 144/94. MAP 110. Patient less restless. Fetal HR normal. You add a note: "Good response. Continue MgSO₄. Next hydralazine only if SBP &gt;155 again." Crisis averted before it escalated.</div>
                </div>
              </div>
              <p className="tut-scenario__caption">The alert fired within 2 seconds of the threshold crossing. Without OnCallDoc: nurse would have taken the next BP reading at the scheduled time — possibly 30 minutes later. Uncontrolled hypertension for 30 minutes in a pre-eclamptic patient carries real risk of stroke and placental abruption.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SETUP GUIDE ── */}
      <section className="tut-section tut-section--alt">
        <div className="tut-section__inner">
          <span className="tut-tag">Your workflow</span>
          <h2 className="tut-section__title">You get an order to install OnCallDoc.<br />Here's exactly what you do — in any ward.</h2>
          <div className="tut-setup-steps">
            {[
              { num: '①', title: 'Arrive with the hardware kit', body: 'Kit contains: 1× IP WiFi camera (1080p, IR night vision, ONVIF), 1× Android tablet (ward display app pre-installed), 1× 4G SIM router. No hospital WiFi needed, no IT department needed.' },
              { num: '②', title: 'Get ward permission & patient consent', body: 'Verbal permission from the ward in-charge. Written informed consent from patient or guardian — covering camera monitoring, remote access, digital orders, and data storage. This protects you legally.' },
              { num: '③', title: 'Position the camera', body: 'Mount so it captures: patient\'s face/chest AND the bedside monitor screen in the same frame. Night vision must cover the patient (ICU/NICU lights are dimmed). Check the feed in your app before proceeding.' },
              { num: '④', title: 'Connect vitals (if available)', body: 'If the monitor supports HL7 output (Mindray, Philips, GE): connect Raspberry Pi → pull vitals automatically. If not: nurse enters vitals on the tablet, or use simulation mode for demos.' },
              { num: '⑤', title: 'Register the patient in OnCallDoc', body: 'Tap "+ Add patient." Name, age, sex, diagnosis, support, ward, bed. Patient appears in your monitoring dashboard immediately. Takes under a minute.' },
              { num: '⑥', title: 'Set thresholds for this specific patient', body: 'This is the clinical step. Open the patient monitor. For each vital, set your warning and critical limits based on the diagnosis, treatment targets, and what you know about this patient. These are YOUR numbers.' },
              { num: '⑦', title: 'Write your standing orders', body: 'Use the "Orders & Notes" panel to type your standing instructions. "If MAP drops below 60 — increase vasopressor and call me." This sits on the ward display so any nurse on any shift knows exactly what to do.' },
              { num: '⑧', title: 'Brief the ward staff and leave', body: 'Show the nurse the tablet. Brief them: "Any new message on this screen from me — read it and act immediately. It is a direct order." Then go. OnCallDoc is now your bedside presence.' },
            ].map(s => (
              <div key={s.num} className="tut-setup-step">
                <span className="tut-setup-step__num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tut-cta">
        <div className="tut-section__inner" style={{ textAlign: 'center' }}>
          <h2>Ready to monitor your first patient?</h2>
          <p>Add any patient — ICU, NICU, labor room, post-op, any ward — and start watching.</p>
          <button className="btn-tut-big btn-tut-big--cta" onClick={() => navigate('/')}>
            <span className="btn-tut-big__icon">📋</span>
            <span>
              <span className="btn-tut-big__title">Go to Dashboard</span>
              <span className="btn-tut-big__sub">Add a patient and start monitoring</span>
            </span>
            <span className="btn-tut-big__arrow">→</span>
          </button>
        </div>
      </section>
    </div>
  )
}
