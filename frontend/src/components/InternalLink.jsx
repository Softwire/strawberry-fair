import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

export const InternalLink = (props) => (
  <Link {...props} to={removeIndexEnding(props.to)} />
)

const removeIndexEnding = link => link.replace(/\/index$/, "")

InternalLink.propTypes = {
  to: PropTypes.string.isRequired
}