import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dayNumber}) => (
    <div className="column is-half-mobile is-one-quarter-tablet is-1-desktop">
        <div className="box">
            <p>{dayNumber}</p>
        </div>
    </div>
)

export default CalendarDay
