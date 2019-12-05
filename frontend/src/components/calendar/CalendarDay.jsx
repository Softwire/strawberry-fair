import React from 'react'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dayNumber, focusDate, event}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const isTodayHighlight =
            (dayNumber === new Date().getDay()) &&
            (new Date(focusDate).getMonth() === new Date().getMonth()) &&
            (new Date(focusDate).getFullYear() === new Date().getFullYear())  // only highlight if this month is the current month, and the days match up
    const baseBoxClass = "box"
    const classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")
    
    return (
    <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop">
        <div className={classAfterHighlight} style={{height: "100px"}}>
            <p>{dayNumber}</p>
            <p>{event ? event.frontmatter.title : ""}</p>
        </div>
    </div>
)}

export default CalendarDay
