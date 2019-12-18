import React from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'

import contactFormConfig from '../data/contactForm.config'

const requiredErrorMessage = 'This field is required'

const ContactForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const configFields = contactFormConfig.fields
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
    </form>
  )
}

export default ContactForm

const submitForm = data => {
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
  }).then
}

const FormField = ({label, error, children}) => {
  const newClassName = error ? children.props.className + ' is-primary' : children.props.className
  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {React.cloneElement(children, {className: newClassName})}
        <ErrorMessage error={error} />
      </div>
    </div>
  )
}

const ErrorMessage = ({error}) => {
  if (!error) return null
  return (
    <span className="has-text-primary">{error.message}</span>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  children: PropTypes.element.isRequired
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
}
