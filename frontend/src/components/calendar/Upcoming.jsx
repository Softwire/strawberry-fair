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

export const EventMediaBlock = ({event}) => (
    <div className="media">
        <div className="media-left">
            <p className="image is-64x64">
                <img src={event.frontmatter.image ? event.frontmatter.image.childImageSharp.resize.src : event.frontmatter.image} />
            </p>
        </div>
        <div className="media-content">
            <h2 className="title is-4">
                <strong><Link to={event.fields.slug}>{event.frontmatter.title}</Link></strong> - {new Date(event.frontmatter.dateTime).toLocaleDateString('en-GB')}
            </h2>
            <HTMLContentSmall content={event.excerpt} />
        </div>
    </div>
)

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

export const Upcoming = () => (
    <PreviewContext.Consumer>
        {value => <UpcomingWithContext isPreview={value} />}
    </PreviewContext.Consumer>
)

const UpcomingWithContext = ({isPreview}) => {
    const filterProps = useFilters(eventTypeList)

    // Get list of events occurring today or later
    const events = isPreview ? [] : getEventList().filter(event => isOnOrAfterDay(new Date(), new Date(event.frontmatter.dateTime)))

    const maxItems = 10

    // Construct array of list elements
    let eventPanels = filterEvents(events, filterProps.activeFilters).slice(0, maxItems).map(event => <EventPanelBlock key={event.frontmatter.title} event={event} />)

    return (
        <div className="panel">
            <h2 className="panel-heading">Upcoming</h2>
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

UpcomingWithContext.propTypes = {
    isPreview: PropTypes.bool.isRequired
}
