import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'

import contactFormConfig from '../data/contactForm.config'

const requiredErrorMessage = 'This field is required'

const SUBMISSION_STATUS = { SUBMITTED: 'SUBMITTED', UNSUBMITTED: 'UNSUBMITTED', SUBMISSION_FAILED: 'SUBMISSION_FAILED' }

const ContactForm = () => {
  const [status, setStatus] = useState(SUBMISSION_STATUS.UNSUBMITTED)

  const { register, handleSubmit, errors } = useForm()
  const configFields = contactFormConfig.fields

  if (status === SUBMISSION_STATUS.SUBMITTED) {
    return (
      <h2 className="title">
        Form submitted! We&apos;ll get back to you as soon as we can.
      </h2>
    )
  }

  return (
    <form onSubmit={handleSubmit(submitForm(setStatus))}>
      <FormField label={configFields.name.label} error={errors.name}>
        <input className="input" 
          type="text"
          placeholder="Stan Desk"
          name="name"
          ref={register({
            required: requiredErrorMessage,
            maxLength: {
              value: 80,
              message: 'Max length is 80 characters'
            }
          })}
        />
      </FormField>
      <FormField label={configFields.email.label} error={errors.email}>
        <input className="input"
          type="text" 
          placeholder="StanDesk@NoSitting.com" 
          name="email"
          ref={register({
            required: requiredErrorMessage,
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: 'Invalid email address'
            }
          })} 
        />
      </FormField>
      <FormField label={configFields.message.label} error={errors.message}>
        <textarea className="textarea"
          name="message"
          ref={register({required: requiredErrorMessage})}
        />
      </FormField>
      
      <button className="button has-background-primary has-text-white" type="submit">
        Submit
      </button>
      <FailedSubmissionError status={status} />
    </form>
  )
}

export default ContactForm

const submitForm = (setStatus) => {
  return data => {
    let formData = new FormData()
    const names = ["name", "email", "message"]
    names.forEach(id => formData.append(contactFormConfig.fields[id].key, data[id]))
  
    const queryString = new URLSearchParams(formData).toString()
  
    fetch(contactFormConfig.url, {
      method: contactFormConfig.method,
      headers: contactFormConfig.headers,
      mode: contactFormConfig.mode,
      referrerPolicy: contactFormConfig.referrerPolicy,
      body: queryString,
    })
    .then(() => setStatus(SUBMISSION_STATUS.SUBMITTED))
    .catch(() => setStatus(SUBMISSION_STATUS.SUBMISSION_FAILED))
  }
}


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
      <span className="has-text-primary">{error.message}</span>
    )
  } else { 
    return null
  } 
}

const FailedSubmissionError = ({status}) => {
  if (status === SUBMISSION_STATUS.SUBMISSION_FAILED) {
    return (
      <div className="has-text-primary">
        Your submission failed. Please try again or directly email us at a@b.c
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
