import React from 'react'
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
            <div className="column is-3 upcoming-image left-column-desktop">
                <EventImage image={event.frontmatter.image} />
            </div>
            <div className="column right-column-desktop">
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
        const imageInfo = {
            alt: image.alt,
            src: _.get(image, 'srcNode.childImageSharp.fixedAspect.src', image.src)
        }

        return (
            <PreviewCompatibleImage imageInfo={imageInfo} />
        )
    }
    return null
}


const EventHeader = ({event, isMobile}) => (
    <Link to={event.fields.slug}>
        <h2 className={`title is-4 upcoming-title`}><strong>{event.frontmatter.title}</strong></h2>
        <h3 className={`subtitle is-${isMobile ? "6" : "5"} upcoming-subtitle`}><strong>{generateEventSubtitle({markdownRemark: event}, isMobile)}</strong></h3>
    </Link>
)

const EventPanelBlock = ({event}) => {
    return (
        <div className="upcoming-panel">
            <div className="container">
                <EventMediaBlock event={event} />
            </div>
        </div>
    )
}

const NoEventsFoundBlock = () => (
    <div className="upcoming-panel">
        <div className="container">
            <div className="no-events">
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
            <div>
                <EventFilterBlock filterProps={filterProps} withDivider={false} />
                <div className="upcoming is-viewport-width">
                    {eventPanels.length > 0 ? eventPanels : <NoEventsFoundBlock />}
                </div>
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
