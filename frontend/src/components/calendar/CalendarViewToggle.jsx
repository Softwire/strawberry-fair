import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarViewToggle = ({view}) => (
    <div className="tabs is-centered is-boxed">
        <ul>
            <li className={view == 'calendar' ? 'is-active' : ''}>
                <Link to="/calendar">
                <span className="icon is-small"><FaCalendar /></span>Calendar
                </Link>
            </li>
            <li className={view == 'upcoming' ? 'is-active' : ''}>
                <Link to="/events">
                <span className="icon is-small"><FaListUl /></span>Upcoming events
                </Link>
            </li>
        </ul>
    </div>
)

CalendarViewToggle.propTypes = {
    view: PropTypes.oneOf(['calendar', 'upcoming'])
}
