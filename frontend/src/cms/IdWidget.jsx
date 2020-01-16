import React from 'react'

export class IdControl extends React.Component {
  render() {
  console.log("I'm in the IdControl render function")
  this.props.onChange('hello')
    return null
  }
}

