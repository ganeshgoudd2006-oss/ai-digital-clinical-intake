import { useState } from 'react'
import './App.css'

const intakeSteps = [
  {
    id: 'basic-information',
    title: 'Share basic information',
    description:
      'Enter your name, contact details and a few essential health basics before the visit.',
  },
  {
    id: 'symptoms',
    title: 'Describe your symptoms',
    description:
      'Explain what you are experiencing, when it started and how it affects your daily routine.',
  },
  {
    id: 'consultation',
    title: 'Attend your consultation',
    description:
      'Your clinician reviews the summary beforehand, so the visit focuses on your care.',
  },
]

function App() {
  const [isIntakeStarted, setIsIntakeStarted] = useState(false)

  return (
    <div className="intake-welcome">
      <header className="intake-welcome__topbar">
        <div className="intake-welcome__brand">
          <span className="intake-welcome__brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path
                d="M12 5v14M5 12h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="intake-welcome__brand-name">Patient Intake Portal</span>
        </div>
        <p className="intake-welcome__badge">AI-assisted clinical intake</p>
      </header>

      <main className="intake-welcome__main">
        <h1 className="intake-welcome__title">
          AI-Powered Digital Clinical Intake Platform
        </h1>

        <p className="intake-welcome__description">
          Patients can provide their basic information and symptoms online before a
          clinical consultation. Your care team receives a clear summary up front, so
          the appointment can focus on the conversation that matters most.
        </p>

        <div className="intake-welcome__actions">
          <button
            type="button"
            className="intake-welcome__cta"
            onClick={() => setIsIntakeStarted(true)}
          >
            Start Patient Intake
          </button>
          <p className="intake-welcome__hint">
            Your information is only shared with your care team.
          </p>
        </div>

        {isIntakeStarted && (
          <p className="intake-welcome__status" role="status">
            The patient intake form will open here once the intake module is connected.
          </p>
        )}

        <ul className="intake-welcome__steps">
          {intakeSteps.map((step) => (
            <li key={step.id} className="intake-welcome__step">
              <h2 className="intake-welcome__step-title">{step.title}</h2>
              <p className="intake-welcome__step-text">{step.description}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="intake-welcome__footer">
        <p>
          AI-Powered Digital Clinical Intake Platform &middot; For non-emergency use. In
          an emergency, contact your local emergency services.
        </p>
      </footer>
    </div>
  )
}

export default App
