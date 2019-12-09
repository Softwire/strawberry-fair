import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const today = new Date()         // Today's date
    const isTodayHighlight = areSameDay(date, today)
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

    // Array of events on this day
    const eventsOnDay = events.filter(event => areSameDay(new Date(event.node.frontmatter.dateTime), date))

    // Return the first element, or null if it's an empty array
    return eventsOnDay.length > 0 ? eventsOnDay[0].node : null
}

function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they reder to the same day
}
