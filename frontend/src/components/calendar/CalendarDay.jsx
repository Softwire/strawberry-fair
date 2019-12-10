import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { eventPropTypeValidator } from './Event'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const today = new Date()         // Today's date
    const isTodayHighlight = areSameDay(date, today)
    const baseBoxClass = "box calendar-day"
    let classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")

    // Event on this day
    const event = eventOnDay(date, events)
    const dateDisplayFormatOptions = {weekday: 'short', day: 'numeric'}
    if (event) {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <BackgroundImage
                        Tag='div'
                        className={baseBoxClass + ' has-text-white has-text-weight-bold'}
                        fluid={event.frontmatter.image.childImageSharp.fluid}
                    >
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                    <Link className='has-text-white' to={event.fields.slug}>{event.frontmatter.title}</Link>
                </BackgroundImage>
            </div>
        )
    } else {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <div className={classAfterHighlight}>
                    <span>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</span>
                </div>
            </div>
        )
    }
}

CalendarDay.propTypes = {
    dateTime: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(
        PropTypes.shape({
            node: eventPropTypeValidator
        })
    )
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
