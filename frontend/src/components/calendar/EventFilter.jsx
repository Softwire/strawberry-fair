import React from 'react'
import PropTypes from 'prop-types'

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

export const EventFilterBlock = ({allFilters, activeFilters, addFilter, removeFilter}) => {
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

EventFilterBlock.propTypes = {
    allFilters: PropTypes.arrayOf(PropTypes.string),
    activeFilters: PropTypes.arrayOf(PropTypes.string),
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired
}

// Function to filter a list of events based on a list of types.
// We return only events for whom all types in the filter are present.
export const filterEvents = (events, eventFilters) => {
    return events.filter(event => eventFilters.every(eventType => event.node.frontmatter.eventTypes.includes(eventType)))
}
