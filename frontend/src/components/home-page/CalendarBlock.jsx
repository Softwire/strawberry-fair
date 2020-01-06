import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import BaseBlock from './BaseBlock'
import { getEventList } from '../calendar/getEventList'
import { EventMediaBlock } from '../calendar/Upcoming'
import { eventPropTypeValidator } from '../validators'
import { EventFilterTags, filterEvents } from '../calendar/EventFilter'
import { eventTypeList } from '../calendar/EventType'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'
import { isOnOrAfterDay } from '../../util/dates'

const CalendarBlock = ({calendarBlock, events}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay events={events} />
  </BaseBlock>
)

const UpcomingEventsDisplay = ({events}) => (
  <PreviewContext.Consumer>
    {value => <UpcomingEventsDisplayWithContext isPreview={value} previewEventList={events} />}
  </PreviewContext.Consumer>
)

const UpcomingEventsDisplayWithContext = ({isPreview, previewEventList}) => {
  const filterProps = useFilters(eventTypeList)

  let events = isPreview ? previewEventList : getEventList()
  events = events.filter(event => isOnOrAfterDay(new Date(), new Date(event.frontmatter.startDateTime)))
  
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
  calendarBlock: BaseBlock.propTypes.block,
  events: PropTypes.arrayOf(
    PropTypes.shape({
        node: eventPropTypeValidator
    })
)
}

UpcomingEventsDisplay.propTypes = {
  events: CalendarBlock.propTypes.events
}

UpcomingEventsDisplayWithContext.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  previewEventList: UpcomingEventsDisplay.propTypes.events
}

export default CalendarBlock
