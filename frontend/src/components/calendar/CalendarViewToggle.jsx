import React from 'react'
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
    view: (props, propName, componentName) => {
        if (props[propName] !== 'calendar' && props[propName] !== 'upcoming') {
            return new Error(`Invalid prop '${propName}' passed to ${componentName}: must be 'upcoming' or 'calendar'.`)
        }
    }
}
