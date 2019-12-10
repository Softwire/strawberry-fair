import React from 'react'
import PropTypes from 'prop-types'

import BaseBlock from './BaseBlock'

const CalendarBlock = ({calendarBlock}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay upcomingEvents={calendarBlock.upcomingEvents || "Hello"}/>
  </BaseBlock>
)

CalendarBlock.propTypes = {
  calendarBlock: PropTypes.shape({
    upcomingEvents: UpcomingEventsDisplay.propTypes.upcomingEvents  // It'll be the same as below
  })
}

export default CalendarBlock

// TODO: Replace placeholder information with actual events
const UpcomingEventsDisplay = (/*{upcomingEvents}*/) => (
  <div className="columns is-multiline">
    {new Array(8).fill('hello')
      .map((x, index) => (
        <div className="column is-half" key={index}>
          <div className="box">
            {x + String(index)}
          </div>
        </div>
        )
      )
    }
  </div>
)

UpcomingEventsDisplay.propTypes = {
  upcomingEvents: PropTypes.array  // Make this more specific once implemented above
}
