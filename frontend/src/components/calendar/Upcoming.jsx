import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { HTMLContentSmall } from '../Content'
import { eventTagList } from './Event'

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

const EnabledFilterTag = ({name, remove}) => (
    <a className="tag is-primary is-light" onClick={remove}>{name}</a>  // Due to this weird syntax, addFilter below must be a function that takes a string and returns a function that adds that filter. How very Haskell of me!
)

EnabledFilterTag.propTypes = {
    name: PropTypes.string,
    remove: PropTypes.func
}

const DisabledFilterTag = ({name, add}) => (
    <a className="tag" onClick={add}>{name}</a>
)

DisabledFilterTag.propTypes = {
    name: PropTypes.string,
    add: PropTypes.func
}

const UpcomingFilterBlock = ({allFilters, activeFilters, addFilter, removeFilter}) => {
    // Construct array of tag objects
    let tags = []
    for (const filter of allFilters) {
        if (activeFilters.includes(filter)) {
            tags.push(<EnabledFilterTag key={filter} name={filter} remove={removeFilter(filter)} />)
        } else {
            tags.push(<DisabledFilterTag key={filter} name={filter} add={addFilter(filter)} />)
        }
    }

    return (
        <div className="panel-block">
            <div className="tags">
                {tags}
            </div>
        </div>
    )
}

UpcomingFilterBlock.propTypes = {
    allFilters: PropTypes.arrayOf(PropTypes.string),
    activeFilters: PropTypes.arrayOf(PropTypes.string),
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired
}

export const Upcoming = ({events}) => {
    const [filters, setFilters] = useState([])  // Filter events by tags

    const addFilter = (filterName) => (
        () => {setFilters(filters.concat(filterName))}  // Gotta love functional programming
    )

    const removeFilter = (filterName) => (
        () => {setFilters(filters.filter(name => name !== filterName))}  // Set 'filters' to the existing 'filters' array, filtered (confusing) to contain only the elements not matching the given name
    )

    const maxItems = 10

    // Construct array of list elements
    let eventPanels = []

    for (let i = 0; i < maxItems && i < events.length; i++) {
        const event = events[i].node

        // Does this event have a tag that's included in the filter?
        if (filters.length == 0 || event.frontmatter.tags.some(tag => filters.includes(tag))) {  // i.e. if there are no filters OR this event has a tag we're filtering for
            eventPanels.push(<EventPanelBlock key={i} event={event} />)
        }
    }

    return (
        <div className="panel">
            <h2 className="panel-heading">Upcoming</h2>
            <UpcomingFilterBlock allFilters={eventTagList} activeFilters={filters} addFilter={addFilter} removeFilter={removeFilter} />
            {eventPanels}
        </div>
    )
}
