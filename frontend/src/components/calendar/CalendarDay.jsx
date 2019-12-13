import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { eventPropTypeValidator } from '../validators'
import { EventMediaBlock } from './Upcoming'

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
// Later will have to add support for multiple events.
const CalendarDay = ({dateTime, events}) => {
    // TODO: Change the method of indicating it's "today", so as still to be visible when there's an event today
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing
    const today = new Date()         // Today's date
    const isTodayHighlight = areSameDay(date, today)
    const baseBoxClass = "box calendar-day"
    let classAfterHighlight = baseBoxClass + (isTodayHighlight ? " has-background-primary has-text-white" : "")

    // Are we showing the modal?
    const [ showModal, setShowModal ] = useState(false)

    const modalOn = () => {
        setShowModal(true)
    }

    const modalOff = () => {
        setShowModal(false)
    }

    let internals = null

    if (events.length > 0) {
        internals = (
            <React.Fragment>
                <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                <div className="box button has-text-left calendar-day has-text-white has-text-weight-bold" onClick={modalOn} style={events.length > 0 ? {
                        backgroundImage: `url(${events[0].frontmatter.image.childImageSharp.editedFluid.src})`,
                        backgroundSize: "cover"} : null}>
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                    {events.map(event => <p key={event.fields.slug}><Link className="has-text-white has-text-weight-medium" to={event.fields.slug}>{event.frontmatter.title}</Link></p>)}
                </div>
            </React.Fragment>
        )
    } else {
        internals = (
            <React.Fragment>
                <NoEventsModal date={date} close={modalOff} active={showModal} />
                <div className="box button has-text-left calendar-day" onClick={modalOn}>
                    <p>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</p>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop">
            {internals}
        </div>
    )

    /*
    if (events.length > 0) {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <CalendarDayModal dateTime={dateTime} events={events} close={modalOff} active={showModal}/>
                <BackgroundImage
                        Tag='div'
                        className={baseBoxClass + ' has-text-white has-text-weight-bold'}
                        fluid={events[0].frontmatter.image.childImageSharp.fluid}
                    >
                    <a className="has-text-white" onClick={modalOn}>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</a>
                    <p><Link className='has-text-white' to={events[0].fields.slug}>{events[0].frontmatter.title}</Link></p>
                    {events.length > 1 ? <p>...</p> : null}
                </BackgroundImage>
            </div>
        )
    } else {
        return (
            <div className='column is-half-mobile is-one-quarter-tablet is-2-desktop'>
                <div className={classAfterHighlight}>
                    <span>{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</span>
                </div>
            </div>
        )
    }
    */
}

/*
const CalendarDayModal = ({date, events, close, active}) => {
    if (events.length > 0) {
        return (
            <div className={"modal" + (active ? " is-active" : "")}>
                <div className="modal-background" onClick={close}></div>
                <div className="modal-content">
                    <BackgroundImage
                            Tag="div"
                            className="box has-text-white has-text-weight-bold"
                            fluid={events[0].frontmatter.image.childImageSharp.fluid}
                        >
                        <h2 className="title is-2">{date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}</h2>
                        {events.map(event => <p key={event.fields.slug}><Link className='has-text-white' to={event.fields.slug}>{event.frontmatter.title}</Link></p>)}
                    </BackgroundImage>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={close}></button>
            </div>
        )
    } else {
        return null
    }
}
*/

const CalendarDayModal = ({date, events, close, active}) => {
    if (events.length > 0) {
        return (
            <div className={"modal" + (active ? " is-active" : "")}>
                <div className="modal-background" onClick={close}></div>
                <div className="modal-content">
                    <div className="message">
                        <h1 className="message-header is-primary">{date.toLocaleDateString('en-GB', longDateFormatOptions)}</h1>
                        <div className="message-body">
                            {events.map(event => <EventMediaBlock key={event.fields.slug} event={event} />)}
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={close}></button>
            </div>
        )
    } else {
        return null
    }
}

const NoEventsModal = ({date, close, active}) => (
    <div className={"modal" + (active ? " is-active" : "")}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-content">
            <div className="notification">
                <p>No events on {date.toLocaleDateString('en-GB', longDateFormatOptions)}.</p>
            </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={close}></button>
    </div>
)

const dateDisplayFormatOptions = {weekday: 'short', day: 'numeric'}
const longDateFormatOptions = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}

export default CalendarDay

export function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they render to the same day
}

CalendarDay.propTypes = {
    dateTime: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(
        eventPropTypeValidator
    )
}

CalendarDayModal.propTypes = {
    date: PropTypes.instanceOf(Date),
    events: CalendarDay.propTypes.events,
    close: PropTypes.func,
    active: PropTypes.bool
}

NoEventsModal.propTypes = {
    date: PropTypes.instanceOf(Date),
    close: PropTypes.func,
    active: PropTypes.bool
}
