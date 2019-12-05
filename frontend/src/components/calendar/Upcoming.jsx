import React from 'react'

// TODO: Filter meetings/non-meetings
const Upcoming = ({events}) => {
    const maxItems = 10

    // Construct array of list elements
    let eventPanels = []

    for (let i = 0; i < maxItems && i < events.length; i++) {
        const event = events[i].node
        eventPanels.push(<EventPanelBlock key={i} event={event} />)
    }

    return (
        <div className="panel">
            <p className="panel-heading">Upcoming</p>
            {eventPanels}
        </div>
    )
}

const EventPanelBlock = ({event}) => {
    return (
        <p className="panel-block">{event.frontmatter.title}</p>
    )
}

export default Upcoming
