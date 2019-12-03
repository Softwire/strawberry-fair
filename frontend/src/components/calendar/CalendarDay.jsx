import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

// CSS
import calendarStyles from './calendar.module.css'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dayNumber}) => (
    <div className={calendarStyles.calendarDay}>
        <h1>{dayNumber}</h1>
    </div>
)

export default CalendarDay
