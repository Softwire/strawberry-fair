import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { eventPropTypeValidator } from './Event'
import CalendarDay from './CalendarDay'

export const Calendar = ({events}) => {
    // Set state
    const [ focusDate, setFocusDate ] = useState(new Date())

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
    // TODO: See https://codepen.io/wikiki/pen/KvqKzK for a way of making the "< December 2019 >" bit span across the whole calendar
    return (
        <div className="panel">
            <h2 className="panel-heading">Calendar</h2>
            <div className="panel-block">
                <MonthScrubber monthForward={monthForward} monthBack={monthBack} focusDate={focusDate} />
            </div>
            <div className="panel-block">
                <div className="columns is-multiline is-mobile">
                    {days.map(dayNumber => <CalendarDay
                        key={dayNumber}
                        dateTime={new Date(focusDate.getFullYear(), focusDate.getMonth(), dayNumber)}
                        events={events}
                    />)}
                </div>
            </div>
        </div>
    )
}

Calendar.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            node: eventPropTypeValidator
        })
    )
}

const MonthScrubber = ({monthForward, monthBack, focusDate}) => (
    <div className="columns is-multiline">
        <div className="column is-full">
            <div className="columns is-vcentered is-centered">
                <div className="column is-narrow">
                    <button onClick={monthBack} className="button is-white">
                        <span className="icon is-left has-text-dark">
                            <FaChevronLeft />
                        </span>
                    </button>
                </div>
                <div className="column">
                    <p>{new Date(focusDate).toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})}</p>
                </div>
                <div className="column is-narrow">
                    <button onClick={monthForward} className="button is-white">
                        <span className="icon is-right has-text-dark">
                            <FaChevronRight />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
)
