import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import CalendarDay from './CalendarDay'
import { areSameDay } from '../../util/dates'
import { eventTypeList } from './EventType'
import { eventPropTypeValidator } from '../validators'
import { EventFilterBlock, filterEvents } from './EventFilter'
import { getEventList } from './getEventList'
import { PreviewContext } from '../../util/context'
import { useFilters } from '../../util/filters'

export const Calendar = ({events}) => (
    <PreviewContext.Consumer>
        {value => <CalendarWithContext isPreview={value} previewEventList={events} />}
    </PreviewContext.Consumer>
)

const CalendarWithContext = ({isPreview, previewEventList}) => {
    // Set state
    const [ focusDate, setFocusDate ] = useState(new Date())
    const filterProps = useFilters(eventTypeList)

    // Get list of events
    const events = isPreview ? previewEventList : getEventList()

    // Calculate the number of days in the given month
    const monthDate = new Date(focusDate.getFullYear(), focusDate.getMonth() + 1, 0)
    const daysInFocusMonth = monthDate.getDate()

    // Function to change the month
    const monthChange = (n) => {
        // Get current month
        let newDate = new Date(focusDate)
        const month = newDate.getMonth()
        newDate.setMonth(month + n)

        // Set focus to new date
        setFocusDate(newDate)
    }

    // Function to increment the month
    const monthForward = () => {
        monthChange(1)
    }

    // Function to decrement the month
    const monthBack = () => {
        monthChange(-1)
    }

    const days = [...Array(daysInFocusMonth).keys()].map(n => n + 1)
    // TODO: Figure out how to get this to work with screenreaders
    // What would the corect semantic component for this be?
    return (
        <React.Fragment>
            <MonthScrubber monthForward={monthForward} monthBack={monthBack} focusDate={focusDate} />
            <div className="calendar panel">
                <EventFilterBlock filterProps={filterProps} />
                <div className="panel-block">
                    <div className="columns is-multiline is-mobile">
                        {days.map(dayNumber => {
                            const date = new Date(focusDate.getFullYear(), focusDate.getMonth(), dayNumber)

                            return (
                                <CalendarDay
                                    key={dayNumber}
                                    dateTime={date}
                                    events={eventsOnDate(date, filterEvents(events, filterProps.activeFilters))}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const MonthScrubber = ({monthForward, monthBack, focusDate}) => (
    <div className="month-scrubber">
        <button onClick={monthBack} className="button is-white is-centered">
            <span className="icon is-left has-text-dark is-large">
                <FaChevronLeft />
            </span>
        </button>
        <div className="calendar-month">
            <p className="title is-hidden-mobile">{new Date(focusDate).toLocaleDateString('en-GB', {year: 'numeric', month: 'long'})}</p>
            <p className="title is-hidden-tablet">{new Date(focusDate).toLocaleDateString('en-GB', {month: 'long'})}</p>
            <p className="title is-hidden-tablet">{new Date(focusDate).toLocaleDateString('en-GB', {year: 'numeric'})}</p>
        </div>
        <button onClick={monthForward} className="button is-white is-centered">
            <span className="icon is-right has-text-dark is-large">
                <FaChevronRight />
            </span>
        </button>
    </div>
)

MonthScrubber.propTypes = {
    monthForward: PropTypes.func.isRequired,
    monthBack: PropTypes.func.isRequired,
    focusDate: PropTypes.instanceOf(Date)
}

Calendar.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            node: eventPropTypeValidator
        })
    )
}

CalendarWithContext.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    previewEventList: Calendar.propTypes.events
}

function eventsOnDate(date, events) {
    // Array of events on this day, empty if none
    return events.filter(event => areSameDay(new Date(event.frontmatter.dateTimeRange.startDateTime), date))
}
