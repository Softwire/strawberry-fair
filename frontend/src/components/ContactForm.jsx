import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import contactFormConfig from '../data/contactForm.config'

const requiredErrorMessage = 'This field is required'

const SUBMISSION_STATUS = { SUBMITTED: 'SUBMITTED', UNSUBMITTED: 'UNSUBMITTED', SUBMISSION_FAILED: 'SUBMISSION_FAILED' }

const ContactForm = () => {
  const [status, setStatus] = useState(SUBMISSION_STATUS.UNSUBMITTED)

  const [name, nameError, setName] = useValidatedState("", {
    required: requiredErrorMessage,
    maxLength: {
      value: 80,
      message: 'Max length is 80 characters',
    }
  })
  
  const [email, emailError, setEmail] = useValidatedState("", {
    required: requiredErrorMessage,
    pattern: {
      value: /^\S+@\S+\.\S+$/i,
      message: 'Invalid email address'
    }
  })

  const [message, messageError, setMessage] = useValidatedState("", {required: requiredErrorMessage})

  const configFields = contactFormConfig.fields

  if (status === SUBMISSION_STATUS.SUBMITTED) {
    return (
      <h2 className="title">
        Form submitted! We&apos;ll get back to you as soon as we can.
      </h2>
    )
  }

  return (
    <form onSubmit={event => {
        setName(name)
        setEmail(email)
        setMessage(message)
        
        const data = {name, email, message}
        const errors = {nameError, emailError, messageError}
        submitForm(event, data, errors, setStatus)
      }}>
      <FormField label={configFields.name.label} error={nameError}>
        <input className="input" 
          type="text"
          placeholder="Stan Desk"
          name="name"
          onChange={event => setName(event.target.value)}
        />
      </FormField>
      <FormField label={configFields.email.label} error={emailError}>
        <input className="input"
          type="text" 
          placeholder="StanDesk@NoSitting.com" 
          name="email"
          onChange={event => setEmail(event.target.value)}
        />
        </FormField>
      <FormField label={configFields.message.label} error={messageError}>
        <textarea className="textarea"
          name="message"
          onChange={event => setMessage(event.target.value)}
        />
      </FormField>
      <button className="button has-background-primary has-text-white" type="submit">
        Submit
      </button>
      <FailedSubmissionError status={status} />
    </form>
  )
}

/**
 * Helper function for setting state with validation
 * @param {Any} initialState 
 * @param {Object} validationOptions
 * @returns {Array} [state, errorMessage, setValidatedState]
 */
const useValidatedState = (initialState, validationOptions) => {
  const [state, setState] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState("")

  const setValidatedState = (newState) => {
    setState(newState)
    if (validationOptions.required && !newState) {
      setErrorMessage(_.get(validationOptions.required, "message", validationOptions.required))

    } else if (newState.length > _.get(validationOptions, 'maxLength.value')) {
      setErrorMessage(validationOptions.maxLength.message)

    } else if (_.get(validationOptions, 'pattern.value', '') instanceof RegExp && !validationOptions.pattern.value.test(newState)) {
      setErrorMessage(validationOptions.pattern.message)

    } else {
      setErrorMessage("")
    }
  }

  return [state, errorMessage, setValidatedState]
}

export default ContactForm

const submitForm = (event, data, errors, setStatus) => {
  event.preventDefault() // Prevents submission from redirecting the page

  if (
    Object.values(errors).filter(e => e !== "").length > 0 || 
    Object.values(data).filter(v => v === "").length > 0 // This is required to handle race conditions with setState
  ) {
    return console.error(errors)
  }

  let postBody = {}

  Object.keys(data).forEach(label =>  postBody[contactFormConfig.fields[label].key] = data[label])
  const queryString = toQueryString(postBody)

  try {
    fetch(contactFormConfig.url, {
      method: contactFormConfig.method,
      headers: contactFormConfig.headers,
      mode: contactFormConfig.mode,
      referrerPolicy: contactFormConfig.referrerPolicy,
      body: queryString,
    })
    .then(() => setStatus(SUBMISSION_STATUS.SUBMITTED))
    .catch(() => setStatus(SUBMISSION_STATUS.SUBMISSION_FAILED))
  } catch (error) {
    console.error(error)
    setStatus(SUBMISSION_STATUS.SUBMISSION_FAILED)
  }
}

const toQueryString = (obj) =>
  Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')

const FormField = ({label, error, children}) => {
  const newClassName = error ? children.props.className + ' is-primary' : children.props.className
  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {React.cloneElement(children, {className: newClassName})}
        <InvalidInputError error={error} />
      </div>
    </div>
  )
}

const InvalidInputError = ({error}) => {
  if (error) {
    return (
      <span className="has-text-primary">{error}</span>
    )
  } else { 
    return null
  } 
}

const FailedSubmissionError = ({status}) => {
  if (status === SUBMISSION_STATUS.SUBMISSION_FAILED) {
    return (
      <div className="has-text-primary">
        Your submission failed. Please try again or directly email us at enquiries@strawberry-fair.org.uk
      </div>
    )
  } else {
    return null
  }
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  children: PropTypes.element.isRequired
}

InvalidInputError.propTypes = {
  error: PropTypes.object
}

FailedSubmissionError.propTypes = {
  status: PropTypes.oneOf(Object.values(SUBMISSION_STATUS))
}
