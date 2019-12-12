import React from 'react'
import PropTypes from 'prop-types'

import BaseBlock from './BaseBlock'
import { getEventList } from '../calendar/getEventList'
import { EventMediaBlock } from '../calendar/Upcoming'

const CalendarBlock = ({calendarBlock}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay upcomingEvents={calendarBlock.upcomingEvents || "Hello"}/>
  </BaseBlock>
)

const UpcomingEventsDisplay = () => {
  const events = getEventList()
  
  return (
    <div className="columns is-multiline">
      {events
        .map(event => (
          <div className="column is-half" key={event.fields.slug}>
            <div className="box">
              <EventMediaBlock event={event} />
            </div>
          </div>
          )
        )
      }
    </div>
  )
}

UpcomingEventsDisplay.propTypes = {
  upcomingEvents: PropTypes.oneOfType([
    PropTypes.array,  // Make this more specific once implemented above
    PropTypes.string  // So placeholder works
  ])
}

CalendarBlock.propTypes = {
  calendarBlock: PropTypes.shape({
    upcomingEvents: UpcomingEventsDisplay.propTypes.upcomingEvents  // It'll be the same as above
  })
}

export default CalendarBlock
