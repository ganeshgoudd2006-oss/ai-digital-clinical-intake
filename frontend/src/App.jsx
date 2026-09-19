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

// Names of the three screens in the intake flow.
const WELCOME_SCREEN = 'welcome'
const PATIENT_INFO_SCREEN = 'patientInfo'
const SYMPTOMS_SCREEN = 'symptoms'

// Starting values for the patient information form.
const emptyPatientInfo = {
  fullName: '',
  age: '',
  gender: '',
  phone: '',
}

function App() {
  // Which screen is visible right now.
  const [screen, setScreen] = useState(WELCOME_SCREEN)

  // The values typed into the patient information form.
  const [patientInfo, setPatientInfo] = useState(emptyPatientInfo)

  // Validation messages, keyed by field name.
  const [errors, setErrors] = useState({})

  // Runs on every keystroke or selection inside the form.
  function handlePatientInfoChange(event) {
    const { name, value } = event.target

    setPatientInfo((previousInfo) => ({ ...previousInfo, [name]: value }))

    // Typing in a field clears its old error message.
    setErrors((previousErrors) => ({ ...previousErrors, [name]: '' }))
  }

  // Runs when the patient information form is submitted (Continue button).
  function handlePatientInfoSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (patientInfo.fullName.trim() === '') {
      nextErrors.fullName = 'Please enter your full name.'
    }

    if (patientInfo.age.trim() === '') {
      nextErrors.age = 'Please enter your age.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setScreen(SYMPTOMS_SCREEN)
  }

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

      {screen === WELCOME_SCREEN && (
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
              onClick={() => setScreen(PATIENT_INFO_SCREEN)}
            >
              Start Patient Intake
            </button>
            <p className="intake-welcome__hint">
              Your information is only shared with your care team.
            </p>
          </div>

          <ul className="intake-welcome__steps">
            {intakeSteps.map((step) => (
              <li key={step.id} className="intake-welcome__step">
                <h2 className="intake-welcome__step-title">{step.title}</h2>
                <p className="intake-welcome__step-text">{step.description}</p>
              </li>
            ))}
          </ul>
        </main>
      )}

      {screen === PATIENT_INFO_SCREEN && (
        <main className="intake-welcome__main">
          <p className="intake-welcome__eyebrow">Step 1 of 2</p>

          <h1 className="intake-welcome__title intake-welcome__title--form">
            Patient information
          </h1>

          <p className="intake-welcome__description">
            Please provide a few basic details before your consultation. Fields marked
            with an asterisk are required.
          </p>

          <form className="intake-form" onSubmit={handlePatientInfoSubmit} noValidate>
            <div className="intake-form__field intake-form__field--wide">
              <label className="intake-form__label" htmlFor="fullName">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="intake-form__input"
                value={patientInfo.fullName}
                onChange={handlePatientInfoChange}
                placeholder="e.g. Priya Sharma"
                autoComplete="name"
                required
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p className="intake-form__error" id="fullName-error" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="intake-form__field">
              <label className="intake-form__label" htmlFor="age">
                Age <span aria-hidden="true">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                inputMode="numeric"
                min="0"
                max="120"
                className="intake-form__input"
                value={patientInfo.age}
                onChange={handlePatientInfoChange}
                placeholder="e.g. 34"
                autoComplete="off"
                required
                aria-invalid={errors.age ? 'true' : 'false'}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              {errors.age && (
                <p className="intake-form__error" id="age-error" role="alert">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="intake-form__field">
              <label className="intake-form__label" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="intake-form__input intake-form__select"
                value={patientInfo.gender}
                onChange={handlePatientInfoChange}
              >
                <option value="">Select an option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="intake-form__field intake-form__field--wide">
              <label className="intake-form__label" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="intake-form__input"
                value={patientInfo.phone}
                onChange={handlePatientInfoChange}
                placeholder="e.g. +91 98765 43210"
                autoComplete="tel"
              />
            </div>

            <div className="intake-form__buttons">
              <button
                type="button"
                className="intake-welcome__cta intake-welcome__cta--secondary"
                onClick={() => setScreen(WELCOME_SCREEN)}
              >
                Back
              </button>
              <button type="submit" className="intake-welcome__cta">
                Continue
              </button>
            </div>
          </form>
        </main>
      )}

      {screen === SYMPTOMS_SCREEN && (
        <main className="intake-welcome__main">
          <p className="intake-welcome__eyebrow">Step 2 of 2</p>

          <h1 className="intake-welcome__title intake-welcome__title--form">
            Symptoms
          </h1>

          <p className="intake-welcome__description">
            This screen is a placeholder for now. The symptom questions will be added
            here in the next step of the intake flow.
          </p>

          <section className="intake-summary" aria-labelledby="summary-heading">
            <h2 className="intake-summary__heading" id="summary-heading">
              Information collected so far
            </h2>
            <dl className="intake-summary__list">
              <div className="intake-summary__row">
                <dt>Full Name</dt>
                <dd>{patientInfo.fullName}</dd>
              </div>
              <div className="intake-summary__row">
                <dt>Age</dt>
                <dd>{patientInfo.age}</dd>
              </div>
              <div className="intake-summary__row">
                <dt>Gender</dt>
                <dd>{patientInfo.gender || 'Not provided'}</dd>
              </div>
              <div className="intake-summary__row">
                <dt>Phone Number</dt>
                <dd>{patientInfo.phone || 'Not provided'}</dd>
              </div>
            </dl>
          </section>

          <div className="intake-form__buttons">
            <button
              type="button"
              className="intake-welcome__cta intake-welcome__cta--secondary"
              onClick={() => setScreen(PATIENT_INFO_SCREEN)}
            >
              Back
            </button>
          </div>
        </main>
      )}

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
