import React from 'react'
import { Link } from 'gatsby'

import BaseBlock from './BaseBlock'
import { getEventList } from '../calendar/getEventList'
import { EventMediaBlock } from '../calendar/Upcoming'

const CalendarBlock = ({calendarBlock}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay />
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
        ).slice(0, 4)  // Only take the first 4 events
      }
      <MoreEventsLinkBox />
    </div>
  )
}

const MoreEventsLinkBox = () => (
  <div className="column is-half">
    <Link className="box button" to="/events">See more events...</Link>
  </div>
)

CalendarBlock.propTypes = {
  calendarBlock: BaseBlock.propTypes.block
}

export default CalendarBlock
