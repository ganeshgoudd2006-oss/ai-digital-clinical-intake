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

// Names of the intake screens in the flow.
const WELCOME_SCREEN = 'welcome'
const PATIENT_INFO_SCREEN = 'patientInfo'
const SYMPTOMS_SCREEN = 'symptoms'
const AI_FOLLOWUP_SCREEN = 'aiFollowup'

// Starting values for the patient information form.
const emptyPatientInfo = {
  fullName: '',
  age: '',
  gender: '',
  phone: '',
}

// Options for the symptom questions.
const mainConcernOptions = [
  'Fever',
  'Headache',
  'Stomach pain',
  'Cough / cold',
  'General weakness',
  'Other',
]

const onsetOptions = ['Today', '1–2 days ago', '3–7 days ago', 'More than a week ago']

const severityOptions = ['Mild', 'Moderate', 'Severe']

// Starting values for the symptom form.
const emptySymptoms = {
  mainConcern: '',
  startedWhen: '',
  severity: '',
  description: '',
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

  // The values selected or typed into the symptom form.
  const [symptoms, setSymptoms] = useState(emptySymptoms)

  // Validation messages for the symptom form, keyed by field name.
  const [symptomErrors, setSymptomErrors] = useState({})

  // Runs on every keystroke or selection inside the symptom form.
  function handleSymptomsChange(event) {
    const { name, value } = event.target

    setSymptoms((previousSymptoms) => ({ ...previousSymptoms, [name]: value }))

    // Changing a field clears its old error message.
    setSymptomErrors((previousErrors) => ({ ...previousErrors, [name]: '' }))
  }

  // Runs when the symptom form is submitted (Continue button).
  function handleSymptomsSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (symptoms.mainConcern === '') {
      nextErrors.mainConcern = 'Please choose your main concern.'
    }

    if (symptoms.description.trim() === '') {
      nextErrors.description = 'Please describe your symptoms.'
    }

    setSymptomErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setScreen(AI_FOLLOWUP_SCREEN)
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
          <p className="intake-welcome__eyebrow">Step 1 of 3</p>

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
          <p className="intake-welcome__eyebrow">Step 2 of 3</p>

          <h1 className="intake-welcome__title intake-welcome__title--form">
            Symptoms
          </h1>

          <p className="intake-welcome__description">
            Tell us what you are experiencing so your care team can prepare for the
            consultation. This is a summary of your symptoms only, not a diagnosis.
          </p>

          <form className="intake-form" onSubmit={handleSymptomsSubmit} noValidate>
            <div className="intake-form__field intake-form__field--wide">
              <label className="intake-form__label" htmlFor="mainConcern">
                What is your main concern? <span aria-hidden="true">*</span>
              </label>
              <select
                id="mainConcern"
                name="mainConcern"
                className="intake-form__input intake-form__select"
                value={symptoms.mainConcern}
                onChange={handleSymptomsChange}
                required
                aria-invalid={symptomErrors.mainConcern ? 'true' : 'false'}
                aria-describedby={
                  symptomErrors.mainConcern ? 'mainConcern-error' : undefined
                }
              >
                <option value="">Select a concern</option>
                {mainConcernOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {symptomErrors.mainConcern && (
                <p className="intake-form__error" id="mainConcern-error" role="alert">
                  {symptomErrors.mainConcern}
                </p>
              )}
            </div>

            <fieldset className="intake-form__group intake-form__field--wide">
              <legend className="intake-form__legend">When did it start?</legend>
              <div className="intake-form__options">
                {onsetOptions.map((option) => (
                  <label key={option} className="intake-form__option">
                    <input
                      type="radio"
                      name="startedWhen"
                      value={option}
                      checked={symptoms.startedWhen === option}
                      onChange={handleSymptomsChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="intake-form__group intake-form__field--wide">
              <legend className="intake-form__legend">How severe is it?</legend>
              <div className="intake-form__options">
                {severityOptions.map((option) => (
                  <label key={option} className="intake-form__option">
                    <input
                      type="radio"
                      name="severity"
                      value={option}
                      checked={symptoms.severity === option}
                      onChange={handleSymptomsChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="intake-form__field intake-form__field--wide">
              <label className="intake-form__label" htmlFor="description">
                Tell us more <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className="intake-form__input intake-form__textarea"
                value={symptoms.description}
                onChange={handleSymptomsChange}
                placeholder="Describe how you feel in your own words"
                required
                aria-invalid={symptomErrors.description ? 'true' : 'false'}
                aria-describedby={
                  symptomErrors.description
                    ? 'description-error'
                    : 'description-hint'
                }
              />
              <p className="intake-form__hint" id="description-hint">
                A short description is enough. You can discuss the details during your
                consultation.
              </p>
              {symptomErrors.description && (
                <p className="intake-form__error" id="description-error" role="alert">
                  {symptomErrors.description}
                </p>
              )}
            </div>

            <div className="intake-form__buttons">
              <button
                type="button"
                className="intake-welcome__cta intake-welcome__cta--secondary"
                onClick={() => setScreen(PATIENT_INFO_SCREEN)}
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

      {screen === AI_FOLLOWUP_SCREEN && (
        <main className="intake-welcome__main">
          <p className="intake-welcome__eyebrow">Step 3 of 3</p>

          <h1 className="intake-welcome__title intake-welcome__title--form">
            AI Follow-up Questions
          </h1>

          <p className="intake-welcome__description">
            This screen is a placeholder for now. Follow-up questions based on the
            information you provided will appear here in a later step.
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
              <div className="intake-summary__row">
                <dt>Main concern</dt>
                <dd>{symptoms.mainConcern || 'Not provided'}</dd>
              </div>
              <div className="intake-summary__row">
                <dt>Started</dt>
                <dd>{symptoms.startedWhen || 'Not provided'}</dd>
              </div>
              <div className="intake-summary__row">
                <dt>Severity</dt>
                <dd>{symptoms.severity || 'Not provided'}</dd>
              </div>
              <div className="intake-summary__row intake-summary__row--stacked">
                <dt>Description</dt>
                <dd>{symptoms.description}</dd>
              </div>
            </dl>
          </section>

          <div className="intake-form__buttons">
            <button
              type="button"
              className="intake-welcome__cta intake-welcome__cta--secondary"
              onClick={() => setScreen(SYMPTOMS_SCREEN)}
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
