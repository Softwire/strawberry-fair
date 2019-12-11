import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { HTMLContentSmall } from '../Content'
import { eventPropTypeValidator } from '../validators'

// TODO: Filter meetings/non-meetings
export const Upcoming = ({events}) => {
    const maxItems = 10

    // Construct array of list elements
    let eventPanels = []

    for (let i = 0; i < maxItems && i < events.length; i++) {
        const event = events[i].node
        eventPanels.push(<EventPanelBlock key={i} event={event} />)
    }

    return (
        <div className="panel">
            <h2 className="panel-heading">Upcoming</h2>
            {eventPanels}
        </div>
    )
}

Upcoming.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            node: eventPropTypeValidator
        })
    )
}

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

EventPanelBlock.propTypes = {
    event: eventPropTypeValidator
}
