import React, { useState } from 'react'
import { Link } from 'gatsby'

import { HTMLContentSmall } from '../Content'
import { EventFilterBlock, filterEvents } from './EventFilter'
import { eventTypeList } from './EventType'

const EventPanelBlock = ({event}) => {
    return (
        <div className="panel-block">
            <div className="media">
                <div className="media-left">
                    <p className="image is-64x64">
                        <img src={event.frontmatter.image.childImageSharp.resize.src} />
                    </p>
                </div>
                <div className="media-content">
                    <h2 className="title is-4">
                        <strong><Link to={event.fields.slug}>{event.frontmatter.title}</Link></strong> - {new Date(event.frontmatter.dateTime).toLocaleDateString('en-GB')}
                    </h2>
                    <HTMLContentSmall content={event.html} />
                </div>
            </div>
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

export const Upcoming = ({events}) => {
    const [filters, setFilters] = useState([])  // Filter events by type

    const addFilter = (filterName) => (
        () => {setFilters(filters.concat(filterName))}  // Gotta love functional programming
    )

    const removeFilter = (filterName) => (
        () => {setFilters(filters.filter(name => name !== filterName))}  // Set 'filters' to the existing 'filters' array, filtered (confusing) to contain only the elements not matching the given name
    )

    const maxItems = 10

    // Construct array of list elements
    let eventPanels = filterEvents(events, filters).slice(0, maxItems).map(event => <EventPanelBlock key={event.node.frontmatter.title} event={event.node} />)

    return (
        <div className="panel">
            <h2 className="panel-heading">Upcoming</h2>
            <EventFilterBlock allFilters={eventTypeList} activeFilters={filters} addFilter={addFilter} removeFilter={removeFilter} />
            {eventPanels.length > 0 ? eventPanels : <NoEventsFoundBlock />}
        </div>
    )
}
