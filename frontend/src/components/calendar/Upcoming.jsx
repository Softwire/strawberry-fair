import React from 'react'

import BackgroundImage from 'gatsby-background-image'

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
        <div className="panel-block">
            <div className="media">
                <div className="media-left">
                    <BackgroundImage
                            fluid={event.frontmatter.image.childImageSharp.fluid}
                        >
                        <p class="image is-64x64" />
                    </BackgroundImage>
                </div>
                <div className="media-content">
                    <p>
                        <strong>{event.frontmatter.title}</strong> - {new Date(event.frontmatter.dateTime).toLocaleDateString('en-GB')}
                        <br />
                        {event.html}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Upcoming
