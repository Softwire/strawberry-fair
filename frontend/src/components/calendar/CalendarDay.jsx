import React from 'react'
import BackgroundImage from 'gatsby-background-image'

import PreviewCompatibleImage from '../PreviewCompatibleImage'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const isTodayHighlight =
            (date.getDate() === new Date().getDay()) &&
            (date.getMonth() === new Date().getMonth()) &&
            (date.getFullYear() === new Date().getFullYear())  // only highlight if this month is the current month, and the days match up
    const baseBoxClass = "box"
    let classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")

    // Event on this day
    const event = eventOnDay(date, events)
    if (event) {
        // I WISH there was a way of doing this in the stylesheet. Maybe there is.
        // TODO: Fix this awful workaround
        const backgroundImageStyle = {
            height: '100px',
            borderRadius: '6px',  // Bulma's "$radius-large"
            filter: 'contrast(0.7) brightness(0.7)'
        }

        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <BackgroundImage
                        Tag='div'
                        className='box has-text-white'
                        fluid={event.frontmatter.image.childImageSharp.fluid}
                        style={backgroundImageStyle}
                    >
                    <p>{date.getDate()}</p>
                    <p>{event ? event.frontmatter.title : ""}</p>
                </BackgroundImage>
            </div>
        )
    } else {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <div className={classAfterHighlight} style={{height: '100px'}}>
                    <p>{date.getDate()}</p>
                    <p>{event ? event.frontmatter.title : ""}</p>
                </div>
            </div>
        )
    }
}

export default CalendarDay

function eventOnDay(date, events) {
    // Returns the event on the given day. Returns null if there isn't one.
    // TODO: Multiple events on one day

    // Check if any events match the given day
    for (let i = 0; i < events.length; i++) {
        const event = events[i].node
        const eventDate = new Date(event.frontmatter.dateTime)
        if ((eventDate.getDate() === date.getDate()) &&
            (eventDate.getMonth() === date.getMonth()) &&
            (eventDate.getFullYear() === date.getFullYear())) {
            return event
        }
    }

    // If we get to this point, no event matches
    return null
}
