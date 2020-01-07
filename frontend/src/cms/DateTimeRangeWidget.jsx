import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'
import { queryObjectChild } from './queryNestedWidgets'
import PropTypes from 'prop-types'

const ObjectControl = CMS.getWidget("object").control

export class DateTimeRangeControl extends React.Component {  // Must use a class, as widgets don't (currently) support React hooks
  render() {    
    return <ObjectControl {...this.props} onChange={value => this.handleChange(value)} field={this.getFields()} />
  }

  handleChange(value) {
    this.props.value = value
    this.props.field = this.getFields()
  }

  getFields() {
    const fields = {
      fields: [
        new Map({
          label: "Event start time",
          name: "startDateTime",
          widget: "datetime",
          hint: "The date and time at which this event is due to start."
        }),
        new Map({
          label: "Provide end time",
          name: "provideEnd",
          widget: "boolean",
          hint: "Tick this box if you want to set an end time for this event."
        })
      ]
    }

    // Do they want to provide an end time?
    if (queryObjectChild(this.props.value, "provideEnd")) {
      fields.fields.push(new Map({
        label: "Event end time",
        name: "endDateTime",
        widget: "datetime",
        hint: "The date and time at which this event is due to end."
      }))
    }

    return new Map(fields)
  }
}

DateTimeRangeControl.propTypes = {
  value: PropTypes.object,
  field: PropTypes.instanceOf(Map)
}
