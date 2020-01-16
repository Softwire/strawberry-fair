import React from 'react'

export class IdControl extends React.Component {
  render() {
    console.log(`Current value is: ${this.props.value}`)
    if(!this.props.value) {
      this.props.onChange(new Date().toLocaleString())
    }
    console.log(`Value is now: ${this.props.value}`)
    return null
  }
}

