import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tutorial() {
  const navigate = useNavigate()

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
          <p className="tut-hero__eyebrow">OnCallDoc · Clinical Overview</p>
          <h1 className="tut-hero__title">"I stabilized the baby.<br />Then I had to leave."</h1>
          <p className="tut-hero__sub">
            Every critical care doctor knows this moment. The patient is finally stable on the ventilator.
            But your shift ends. You have to go home. And for the next 10 hours, you depend on a phone call
            from a nurse — if they remember to call at all.
          </p>
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <section className="tut-section">
        <div className="tut-section__inner">
          <span className="tut-tag tut-tag--problem">The Problem</span>
          <h2 className="tut-section__title">Critically ill patients need their own doctor.<br />Their doctor cannot always be there.</h2>
          <div className="tut-cards-3">
            <div className="tut-card">
              <div className="tut-card__icon">😔</div>
              <h3>The duty doctor doesn't know your patient</h3>
              <p>The on-call doctor covering your NICU tonight didn't stabilize this baby. They don't know the nuances — the iNO dose, the HFO settings, the trend that matters. You do.</p>
            </div>
            <div className="tut-card">
              <div className="tut-card__icon">📵</div>
              <h3>Calls come too late</h3>
              <p>By the time a nurse calls you, the SpO₂ has been 80% for 20 minutes. The ventilator settings needed changing 30 minutes ago. The window for easy intervention has closed.</p>
            </div>
            <div className="tut-card">
              <div className="tut-card__icon">😰</div>
              <h3>You can't sleep</h3>
              <p>You're at home, lying awake, thinking about the baby on HFO. Is the MAP holding? Is the iNO working? Did the surfactant help? You have absolutely no way to know.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION ── */}
      <section className="tut-section tut-section--brand">
        <div className="tut-section__inner">
          <span className="tut-tag tut-tag--solution">The Solution</span>
          <h2 className="tut-section__title" style={{ color: '#fff' }}>
            OnCallDoc connects YOU to YOUR patient.<br />Personally. In real-time. From anywhere.
          </h2>
          <p className="tut-section__sub" style={{ color: 'rgba(255,255,255,0.8)' }}>
            A small hardware module at the patient's bedside. You watch your own patient from your phone —
            live camera, real-time vitals, instant alerts. No middlemen.
          </p>
          <div className="tut-features-grid">
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📹</span>
              <h3>Live Camera Feed</h3>
              <p>See your patient in real-time. Watch the chest rise. See the bedside monitor. Know exactly what's happening right now, from wherever you are.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📊</span>
              <h3>Real-Time Vitals</h3>
              <p>HR, SpO₂, RR, SBP, DBP, MAP — streaming every 2 seconds. Your patient's numbers on your screen.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">🚨</span>
              <h3>Two-Tier Alerts</h3>
              <p>Warning → push notification. Critical → alarm beep. You set the thresholds per vital, per patient. You decide exactly what wakes you up.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">💬</span>
              <h3>Doctor Orders</h3>
              <p>Type your instruction. It appears on the bedside display immediately. "Give adrenaline 0.1 mg/kg IV stat" — the nurse sees it and acts. Instantly.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">📞</span>
              <h3>One-Tap Call</h3>
              <p>Call the ward phone or duty nurse directly from the patient screen. No looking up numbers. One tap when every second matters.</p>
            </div>
            <div className="tut-feature-card">
              <span className="tut-feature-card__icon">🎚️</span>
              <h3>Custom Thresholds</h3>
              <p>Every patient is different. Set individual alert thresholds for each vital. A PPHN baby's MAP target is not the same as a post-op 10-year-old.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="tut-section tut-section--alt">
        <div className="tut-section__inner">
          <span className="tut-tag">Step by step</span>
          <h2 className="tut-section__title">From bedside installation to remote monitoring in under an hour</h2>
          <div className="tut-steps">
            <div className="tut-step">
              <div className="tut-step__num">1</div>
              <div className="tut-step__content">
                <h3>Install the bedside module</h3>
                <p>A compact unit goes at the patient's bedside — an IP camera aimed at the patient and the monitor, plus a tablet running the OnCallDoc ward display. Takes about 10 minutes to set up.</p>
                <div className="tut-visual-box">
                  <span style={{ fontSize: 36 }}>🖥️  📹</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center' }}>Bedside tablet (ward display) + camera pointed at patient and bedside monitor</span>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">2</div>
              <div className="tut-step__content">
                <h3>Register the patient</h3>
                <p>Add the patient to OnCallDoc on your phone or laptop — name, diagnosis, respiratory support, ward, bed number. Takes 30 seconds.</p>
                <div className="tut-visual-box" style={{ background: 'var(--brand-lt)' }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span className="badge badge--critical">PPHN</span>
                    <span className="badge badge--warning">HFO Ventilator</span>
                    <span className="badge badge--stable">NICU · Bed 3</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">3</div>
              <div className="tut-step__content">
                <h3>Set your alert thresholds</h3>
                <p>Open the patient's monitor. For each vital — HR, SpO₂, RR, SBP, DBP, MAP — set the warning and critical limits based on what matters for this patient specifically.</p>
                <div className="tut-visual-box">
                  <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.7 }}>
                    <div>SpO₂ warn low: <strong>88%</strong> → push notification</div>
                    <div>SpO₂ crit low: <strong>82%</strong> → alarm + beep 🔔</div>
                    <div>MAP crit low: <strong>35 mmHg</strong> → alarm 🚨</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">4</div>
              <div className="tut-step__content">
                <h3>Brief the ward staff</h3>
                <p>Show the duty nurse the bedside tablet. Brief them: "When you see a new message on this screen from me, read it and act immediately." That's all they need to know.</p>
                <div className="tut-visual-box" style={{ background: 'var(--brand-lt)' }}>
                  <span style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 500, textAlign: 'center' }}>📋 New order from Dr. Sunil:<br />"Increase iNO to 20 ppm now."</span>
                </div>
              </div>
            </div>
            <div className="tut-step">
              <div className="tut-step__num">5</div>
              <div className="tut-step__content">
                <h3>Leave. You're still watching.</h3>
                <p>Go home. Go to your next hospital. Your patient's vitals stream to your phone. If anything crosses a threshold — you know before the nurse does.</p>
                <div className="tut-visual-box" style={{ background: '#fff3f3', borderColor: '#f7c1c1' }}>
                  <span style={{ fontSize: 13, color: 'var(--critical)', fontWeight: 500, textAlign: 'center' }}>🚨 Baby Kiran — SpO₂ critically low: 82%<br /><span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-2)' }}>Alert fired at 11:35 PM · 2 seconds ago</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL SCENARIO ── */}
      <section className="tut-section">
        <div className="tut-section__inner">
          <span className="tut-tag">Real scenario</span>
          <h2 className="tut-section__title">Baby Kiran. 2-day-old. PPHN on HFO Ventilator.</h2>
          <div className="tut-scenario">
            <div className="tut-event">
              <span className="tut-event__time">8:00 PM</span>
              <div className="tut-event__card">
                You stabilize Baby Kiran. HFO settings: MAP 12, Hz 10, Amplitude 30. iNO at 15 ppm. SpO₂ holding at 87–90%. You install the OnCallDoc module, register the patient, set thresholds, and leave.
              </div>
            </div>
            <div className="tut-event">
              <span className="tut-event__time">11:35 PM</span>
              <div className="tut-event__card tut-event__card--alert">
                🚨 <strong>OnCallDoc alert fires on your phone</strong> — SpO₂ critically low: 82%. You wake up. You open the app. You see the live vitals AND the camera — Baby Kiran is agitated, desaturating. You act immediately.
              </div>
            </div>
            <div className="tut-event">
              <span className="tut-event__time">11:36 PM</span>
              <div className="tut-event__card tut-event__card--order">
                You type: <em>"Increase iNO to 20 ppm. Check circuit for leak. Suction if secretions visible. Call me in 10 min with update."</em> — order appears on the ward display. Duty nurse reads it and acts within 60 seconds.
              </div>
            </div>
            <div className="tut-event">
              <span className="tut-event__time">11:48 PM</span>
              <div className="tut-event__card tut-event__card--stable">
                SpO₂ recovering — 86%, 89%, 92%. MAP stable at 42. You watch on the app for 10 more minutes. Crisis managed from your bedroom. You go back to sleep.
              </div>
            </div>
          </div>
          <p className="tut-scenario__caption">
            Without OnCallDoc: the nurse might have noticed at midnight, called the duty doctor who would need 20 min to respond, and Baby Kiran could have been in severe distress for over an hour before appropriate intervention.
          </p>
        </div>
      </section>

      {/* ── SETUP GUIDE ── */}
      <section className="tut-section tut-section--alt">
        <div className="tut-section__inner">
          <span className="tut-tag">Your workflow</span>
          <h2 className="tut-section__title">You get an order to install OnCallDoc at a hospital.<br />Here's exactly what you do.</h2>
          <div className="tut-setup-steps">
            {[
              { num: '①', title: 'Arrive with the hardware kit', body: 'The OnCallDoc kit contains: 1× IP camera (Wi-Fi or PoE), 1× bedside tablet pre-installed with the ward display app, 1× SIM card router for connectivity. No hospital IT involvement needed.' },
              { num: '②', title: 'Position the camera', body: 'Mount or place the camera so it captures the patient\'s face/chest AND the bedside monitor screen in the same frame. Confirm the feed appears clearly in the OnCallDoc app on your phone.' },
              { num: '③', title: 'Connect vitals (if supported)', body: 'If the patient monitor exports via HL7, connect to OnCallDoc. If not, the nurse enters vitals manually on the ward tablet — or you run in simulation mode for a demo.' },
              { num: '④', title: 'Register the patient in the app', body: 'Open OnCallDoc on your phone. Click "+ Add patient." Enter name, diagnosis, respiratory support, ward, bed number. Patient appears in your monitoring list immediately.' },
              { num: '⑤', title: 'Set your custom thresholds', body: 'Open the patient\'s monitor page. For each vital — HR, SpO₂, RR, SBP, DBP, MAP — set warning and critical limits. These are your numbers, based on what you know about this patient.' },
              { num: '⑥', title: 'Allow browser notifications', body: 'When the app asks, allow notifications. This is how critical alerts reach your phone even when the app is in the background. On Android, add the app to your home screen as a PWA.' },
              { num: '⑦', title: 'Brief the ward staff', body: 'Show the duty nurse the bedside tablet. Simple briefing: "When you see a message on this screen from me — read it and act on it immediately. It\'s my direct order." That\'s all they need to know.' },
              { num: '⑧', title: 'Leave. You\'re still monitoring.', body: 'Open OnCallDoc on your phone. You\'ll see all your patients at a glance on the dashboard. Tap any patient for live vitals and camera. Alerts will find you no matter where you are.' },
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
          <p>Go to your dashboard, add a patient, and start watching.</p>
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
