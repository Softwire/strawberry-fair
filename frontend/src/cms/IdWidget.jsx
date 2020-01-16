import React from 'react'

export class IdControl extends React.Component {
  render() {
  console.log("I'm in the IdControl render function")
  console.log(`Current value is ${this.props.value}`)
  console.log(this.props.value||new Date().toLocaleString())
  this.props.onChange(this.props.value||new Date().toLocaleString())
    return null
  }
}

