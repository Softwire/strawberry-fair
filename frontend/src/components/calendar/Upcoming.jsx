import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { HTMLContentSmall } from '../Content'
import { eventPropTypeValidator } from '../validators'
import { EventFilterBlock, filterEvents } from './EventFilter'
import { eventTypeList } from './EventType'
import { getEventList } from './getEventList'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'
import { isOnOrAfterDay } from '../../util/dates'
import { displayStyle } from '../../templates/event-info'

export const EventMediaBlock = ({event}) => {
    const date = new Date(event.frontmatter.dateTime)
    const eventUrl = event.fields.slug

    return (
    <div className="media event">
        <div className="media-left">
            <Link to={eventUrl} className="image is-64x64">
                {event.frontmatter.image ? <img src={(event.frontmatter.image.src.childImageSharp ? event.frontmatter.image.src.childImageSharp.resize.src : event.frontmatter.image.src)}
                                                alt={event.frontmatter.image.alt} /> : null}
            </Link>
        </div>
        <div className="media-content">
            <Link to={eventUrl}>
                <h2 className="title is-4"><strong>{event.frontmatter.title}</strong></h2>
                <h3 className="subtitle is-5">{date.toLocaleString("en-GB", displayStyle)}</h3>
            </Link>
            <HTMLContentSmall className="add-margin-top" content={event.excerpt} />
        </div>
    </div>
    )
}

const EventPanelBlock = ({event}) => {
    return (
        <div className="panel-block">
            <EventMediaBlock event={event} />
        </div>
    )
}

const NoEventsFoundBlock = () => (
    <div className="panel-block">
        <div className="media">
            <div className="media-content">
                <p><strong>No events match the selected filters.</strong></p>
            </div>
        </div>
    </div>
)

export const Upcoming = ({events}) => (  // 'events' is only used if it is a preview, otherwise it uses a static query
    <PreviewContext.Consumer>
        {value => <UpcomingWithContext isPreview={value} previewEventList={events} />}
    </PreviewContext.Consumer>
)

const UpcomingWithContext = ({isPreview, previewEventList}) => {
    const filterProps = useFilters(eventTypeList)

    // Get list of events occurring today or later
    let events = isPreview ? previewEventList : getEventList()
    events = events.filter(event => isOnOrAfterDay(new Date(), new Date(event.frontmatter.dateTime)))

    const maxItems = 5

    // Construct array of list elements
    let eventPanels = filterEvents(events, filterProps.activeFilters).slice(0, maxItems).map(event => <EventPanelBlock key={event.frontmatter.title} event={event} />)

    return (
        <div className="upcoming panel">
            <EventFilterBlock filterProps={filterProps} />
            {eventPanels.length > 0 ? eventPanels : <NoEventsFoundBlock />}
        </div>
    )
}

EventMediaBlock.propTypes = {
    event: eventPropTypeValidator
}

EventPanelBlock.propTypes = {
    event: EventMediaBlock.propTypes.event
}

Upcoming.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            node: eventPropTypeValidator
        })
    )
}

UpcomingWithContext.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    previewEventList: Upcoming.propTypes.events
}
