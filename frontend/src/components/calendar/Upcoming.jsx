import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import { useViewportWidth } from '../../util/useViewportWidth'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { HTMLContentSmall } from '../Content'
import { eventPropTypeValidator } from '../validators'
import { EventFilterBlock, filterEvents } from './EventFilter'
import { eventTypeList } from './EventType'
import { getEventList } from './getEventList'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'
import { isOnOrAfterDay } from '../../util/dates'
import { generateEventSubtitle } from '../../templates/event-info'


const bulmaTabletWidthMixin = 769

export const EventMediaBlock = ({event}) => {
    
    const viewportWidth = useViewportWidth()

    if (viewportWidth <= bulmaTabletWidthMixin) {
        return (
            <div className="columns is-mobile is-multiline upcoming-block">
                <div className="column is-full upcoming-header">
                    <EventHeader event={event} isMobile={true} />
                </div>
                {event.frontmatter.image && <div className="column is-full upcoming-image">
                                                <EventImage image={event.frontmatter.image} />
                                            </div>}
                <div className="column is-full upcoming-excerpt">
                    <EventExcerpt excerpt={event.excerpt} />
                </div>
            </div>
        )
    }
    else {
        return (
        <div className="columns upcoming-block">
            <div className="column is-2 upcoming-image">
                <EventImage image={event.frontmatter.image} />
            </div>
            <div className="column">
                <div className="columns is-multiline">
                    <div className="column is-full upcoming-header">
                        <EventHeader event={event} isMobile={false} />
                    </div>
                    <div className="column is-full upcoming-excerpt">
                        <EventExcerpt excerpt={event.excerpt} />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const EventImage = ({image}) => {
    if (image) {
        return (
            <PreviewCompatibleImage imageInfo={image} />
        )
    }
    return null
}

const EventHeader = ({event, isMobile}) => (
    <Link to={event.fields.slug}>
        <h2 className={`title is-${isMobile ? "4" : "3"} upcoming-title`}><strong>{event.frontmatter.title}</strong></h2>
        <h3 className={`subtitle is-${isMobile ? "6" : "5"} upcoming-subtitle`}><strong>{generateEventSubtitle({markdownRemark: event}, isMobile)}</strong></h3>
    </Link>
)

const EventExcerpt = ({excerpt}) => (
    <HTMLContentSmall className="add-margin-top" content={excerpt} />
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

export const Upcoming = ({events}) => (  // 'events' is only used if it is a preview, otherwise it uses a static query
    <PreviewContext.Consumer>
        {value => <UpcomingWithContext isPreview={value} previewEventList={events} />}
    </PreviewContext.Consumer>
)

const UpcomingWithContext = ({isPreview, previewEventList}) => {
    const filterProps = useFilters(eventTypeList)

    // Get list of events occurring today or later
    let events = isPreview ? previewEventList : getEventList()
    events = events.filter(event => isOnOrAfterDay(new Date(), new Date(event.frontmatter.dateTimeRange.provideEnd ? event.frontmatter.dateTimeRange.endDateTime : event.frontmatter.dateTimeRange.startDateTime)))

    const maxItems = 5

    // Construct array of list elements
    let eventPanels = filterEvents(events, filterProps.activeFilters).slice(0, maxItems).map(event => <EventPanelBlock key={event.frontmatter.title} event={event} />)

    return (
        <React.Fragment>
            <h1 className="title">Upcoming Events</h1>
            <div className="upcoming panel">
                <EventFilterBlock filterProps={filterProps} />
                {eventPanels.length > 0 ? eventPanels : <NoEventsFoundBlock />}
            </div>
        </React.Fragment>
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
