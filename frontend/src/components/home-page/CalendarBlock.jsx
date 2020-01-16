import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import BaseBlock from './BaseBlock'
import { Panel } from '../Panel'
import { getEventPanelData } from '../calendar/Upcoming'
import { getEventList } from '../calendar/getEventList'
import { eventPropTypeValidator } from '../validators'
import { EventFilterTags, filterEvents } from '../calendar/EventFilter'
import { eventTypeList } from '../calendar/EventType'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'
import { isOnOrAfterDay } from '../../util/dates'
import { generateEventSubtitle } from '../../templates/event-info'
import { HTMLContentSmall } from '../Content'
import { viewportIsMobile } from '../../util/useViewportWidth'

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
  const isMobile = viewportIsMobile()
  
  const filterProps = useFilters(eventTypeList)

  let events = isPreview ? previewEventList : getEventList()
  events = events.filter(event => isOnOrAfterDay(new Date(), new Date(event.frontmatter.dateTimeRange.provideEnd ? event.frontmatter.dateTimeRange.endDateTime : event.frontmatter.dateTimeRange.startDateTime)))

  return (
    <React.Fragment>
      <EventFilterTags filterProps={filterProps} />
      <div className="columns is-multiline">
        {filterEvents(events, filterProps.activeFilters)
          .map(event => (
            <div className="column is-half calendar-block-column" key={event.fields.slug}>
              <div className="box calendar-block-box">
                <Panel {...getEventPanelData(event)} isMobile={isMobile} />
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

export const EventMediaBlock = ({event}) => {
  const eventUrl = event.fields.slug

  return (
  <div className="media event">
      <div className="media-left">
          <Link to={eventUrl} className="image is-64x64">
              {event.frontmatter.image ? <img src={_.get(event.frontmatter.image, 'srcNode.childImageSharp.fixedAspect.src', event.frontmatter.image.src)}
                                              alt={event.frontmatter.image.alt} /> : null}
          </Link>
      </div>
      <div className="media-content">
          <Link to={eventUrl}>
              <h2 className="title is-4"><strong>{event.frontmatter.title}</strong></h2>
              <h3 className="subtitle is-5">{generateEventSubtitle({markdownRemark: event})}</h3>
          </Link>
          <HTMLContentSmall className="add-margin-top" content={event.excerpt} />
      </div>
  </div>
  )
}

const MoreEventsLinkBox = () => (
  <div className="calendar-block-column column is-half">
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

EventMediaBlock.propTypes = {
  event: PropTypes.object
}

UpcomingEventsDisplay.propTypes = {
  events: CalendarBlock.propTypes.events
}

UpcomingEventsDisplayWithContext.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  previewEventList: UpcomingEventsDisplay.propTypes.events
}

export default CalendarBlock
