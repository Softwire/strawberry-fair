import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarViewToggle = ({view}) => (
    <React.Fragment>
        {['is-large is-hidden-touch', 'is-hidden-desktop'].map(modifier => (
            <div className={`tabs is-centered is-boxed ${modifier}`} key={modifier}>
                <ul>
                    <li className={view == 'calendar' ? 'is-active' : ''}>
                        <Link to="/calendar">
                            <span className="icon is-small"><FaCalendar /></span><h1>Calendar</h1>
                        </Link>
                    </li>
                    <li className={view == 'upcoming' ? 'is-active' : ''}>
                        <Link to="/events">
                            <span className="icon is-small"><FaListUl /></span><h1>Upcoming events</h1>
                        </Link>
                    </li>
                </ul>
            </div>
        ))}
    </React.Fragment>
)

CalendarViewToggle.propTypes = {
    view: PropTypes.oneOf(['calendar', 'upcoming'])
}
