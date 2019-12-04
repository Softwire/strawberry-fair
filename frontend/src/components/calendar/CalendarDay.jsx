import React from 'react'
//import { Link } from 'gatsby'
//import PreviewCompatibleImage from '../PreviewCompatibleImage'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dayNumber, dateToday}) => {
    const isTodayHighlight = dayNumber == new Date(dateToday).getDay()  // For now, by way of example, today is the 5th of every month
    const baseBoxClass = "box"
    const classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")
    
    return (
    <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop">
        <div className={classAfterHighlight} style={{height: "100px"}}>
            <p>{dayNumber}</p>
        </div>
    </div>
)}

export default CalendarDay
