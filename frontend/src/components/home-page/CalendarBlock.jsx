import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import BaseBlock from './BaseBlock'
import { getEventList } from '../calendar/getEventList'
import { EventMediaBlock } from '../calendar/Upcoming'
import { EventFilterTags, filterEvents } from '../calendar/EventFilter'
import { eventTypeList } from '../calendar/EventType'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'

const CalendarBlock = ({calendarBlock}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay />
  </BaseBlock>
)

const UpcomingEventsDisplay = () => (
  <PreviewContext.Consumer>
    {value => <UpcomingEventsDisplayWithContext isPreview={value} />}
  </PreviewContext.Consumer>
)

const UpcomingEventsDisplayWithContext = ({isPreview}) => {
  const filterProps = useFilters(eventTypeList)

  const events = isPreview ? [] : getEventList()
  
  return (
    <React.Fragment>
      <EventFilterTags filterProps={filterProps} />
      <div className="columns is-multiline">
        {filterEvents(events, filterProps.activeFilters)
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
    </React.Fragment>
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

UpcomingEventsDisplayWithContext.propTypes = {
  isPreview: PropTypes.bool.isRequired
}

export default CalendarBlock
