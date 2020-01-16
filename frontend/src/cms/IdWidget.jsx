import React from 'react'

export class IdControl extends React.Component {
  render() {
    if(!this.props.value) {
      this.props.onChange(new Date().toLocaleString())
    }
    return null
  }
}

IdControl.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}