import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const today = new Date()         // Today's date

    const daysMatch = date.getDate() === today.getDate()             // Do the days match?
    const monthsMatch = date.getMonth() === today.getMonth()         // Do the months match?
    const yearsMatch = date.getFullYear() === today.getFullYear()    // Do the years match?
    const isTodayHighlight = daysMatch && monthsMatch && yearsMatch  // Then it's today
    const baseBoxClass = "box"
    let classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")

    // Event on this day
    const event = eventOnDay(date, events)
    const dateDisplayFormatOptions = {weekday: 'short', day: 'numeric'}
    if (event) {
        // I WISH there was a way of doing this in the stylesheet. Maybe there is.
        // TODO: Fix this awful workaround
        const backgroundImageStyle = {
            height: '100px',
            borderRadius: '6px',  // Bulma's "$radius-large"
            //filter: 'contrast(0.7) brightness(0.7)'
        }

        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <BackgroundImage
                        Tag='div'
                        className='box has-text-white has-text-weight-bold'
                        fluid={event.frontmatter.image.childImageSharp.fluid}
                        style={backgroundImageStyle}
                    >
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                    <Link className='has-text-white' to={event.fields.slug}>{event.frontmatter.title}</Link>
                </BackgroundImage>
            </div>
        )
    } else {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <div className={classAfterHighlight} style={{height: '100px'}}>
                    <span>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</span>
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
