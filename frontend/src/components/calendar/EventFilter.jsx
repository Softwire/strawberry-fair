import React from 'react'
import PropTypes from 'prop-types'

const EnabledFilterTag = ({name, remove}) => (
    <a className="tag is-primary is-light" onClick={remove}>{name}</a>
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

export const EventFilterBlock = ({allFilters, activeFilters, addFilter, removeFilter}) => (
    <div className="panel-block">
        <EventFilterTags allFilters={allFilters} activeFilters={activeFilters} addFilter={addFilter} removeFilter={removeFilter} />
    </div>
)

export const EventFilterTags = ({allFilters, activeFilters, addFilter, removeFilter}) => {
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
        <span className="tags">
            <span className="tag is-white">Filters: </span>
            {tags}
        </span>
    )
}

EventFilterTags.propTypes = {
    allFilters: PropTypes.arrayOf(PropTypes.string),
    activeFilters: PropTypes.arrayOf(PropTypes.string),
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired
}

EventFilterBlock.propTypes = EventFilterTags.propTypes

// Function to filter a list of events based on a list of types.
// We return only events for whom all types in the filter are present.
export const filterEvents = (events, eventFilters) => {
    return events.filter(event => eventFilters.every(eventType => event.frontmatter.eventTypes.includes(eventType)))
}
