import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { PanelBlock } from '../Panel'
import { eventPropTypeValidator } from '../validators'
import { EventFilterBlock, filterEvents } from './EventFilter'
import { eventTypeList } from './EventType'
import { getEventList } from './getEventList'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'
import { isOnOrAfterDay } from '../../util/dates'
import { generateEventSubtitle } from '../../templates/event-info'


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

    // Construct array of event panel data
    const panelData = filterEvents(events, filterProps.activeFilters).slice(0, maxItems).map(event => getPanelData(event))

    const emptyText = "No events match the selected filters."

    return (
        <React.Fragment>
            <h1 className="title">Upcoming Events</h1>
            <div>
                <EventFilterBlock filterProps={filterProps} withDivider={false} />
                <PanelBlock panelData={panelData} emptyText={emptyText} isViewportWidthDesktop={true}/>
            </div>
        </React.Fragment>
    )
}

const getPanelData = (event) => {
    return {
        image: event.frontmatter.image,
        slug: event.fields.slug,
        title: event.frontmatter.title,
        subtitle: generateEventSubtitle({markdownRemark: event}, false),
        mobileSubtitle: generateEventSubtitle({markdownRemark: event}, true),
        excerpt: event.excerpt
    }
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
