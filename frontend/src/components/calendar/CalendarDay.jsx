import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({events}) => {
    if (events.length > 0) {
        const event = events[0]  // Currently only support for 1
        const date = new Date(events.dateTime)

        // Construct day with image inside
        // TODO: Event name
        return <div className="calendar-day">
            <p>{date.getDay()}</p>
            <PreviewCompatibleImage imageInfo={event.image} />
        </div>
    } else {
        return <div className="calendar-day">
            <p>{date.getDay()}</p>
        </div>
    }
}

export default CalendarDay
