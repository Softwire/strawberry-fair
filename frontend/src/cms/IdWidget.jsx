import React from 'react'
import PropTypes from 'prop-types'

export class IdControl extends React.Component {
  render() {
    if(!this.props.value) {
      this.props.onChange(new Date().getTime().toString())
    }
    return null
  }
}

IdControl.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}