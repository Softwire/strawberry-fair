import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import { eventPropTypeValidator } from '../validators'
import { areSameDay } from '../../util/dates'
import { PanelBlock } from '../Panel'
import { getEventPanelData } from './Upcoming'

// How many events' names should we write in the box, at maximum?
const maxEvents = 3

// Represents a day in the calendar. Will either be empty or contain a preview of an event.
const CalendarDay = ({dateTime, events}) => {
    const date = new Date(dateTime)  // The actual Date this CalendarDay is representing

    // Are we showing the modal?
    const [ showModal, setShowModal ] = useState(false)

    // Image setting for revolving images
    const [ currentImage, setCurrentImage ] = useState(0)

    // Revolving image hook
    const eventsWithPics = events.filter(event => event.frontmatter.image)
    const nImages = eventsWithPics.length
    const imageRotateTimeMS = 4000
    const imageFadeTimeS = 0.5

    useEffect(() => {
        if (nImages > 1) {
            const timeoutVar = setTimeout(() => {
                // Update current shown image counter
                setCurrentImage((currentImage + 1) % nImages)
            }, imageRotateTimeMS)

            // Clean up if this component unmounts
            return () => {
                clearTimeout(timeoutVar)
            }
        }
    })

    const modalOn = () => {
        setShowModal(true)
    }

    const modalOff = () => {
        setShowModal(false)
    }

    let internals

    if (eventsWithPics.length === 0) {
        // No pictures to show
        if (events.length === 0) {
            internals = (
                <React.Fragment>
                    <CalendarDayModal date={date} close={modalOff} active={showModal} />
                    <div className="box button has-text-left calendar-day" onClick={modalOn}>
                        <DayText date={date} />
                    </div>
                </React.Fragment>
            )
        } else {
            internals = (
                <React.Fragment>
                    <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                    <div className="box button has-text-left calendar-day has-text-white has-text-weight-bold is-primary-pale" onClick={modalOn}>
                        <DayDescription events={events} date={date} />
                    </div>
                </React.Fragment>
            )
        }
    } else if (eventsWithPics.length === 1) {

        const eventWithPic = eventsWithPics[0]

        internals = (
            <React.Fragment>
                <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                <div className="box button has-text-left calendar-day has-text-white has-text-weight-bold" onClick={modalOn}
                style={{
                    backgroundImage: `url(${_.get(eventWithPic.frontmatter.image, 'srcNode.childImageSharp.editedFluid.src', eventWithPic.frontmatter.image.src)})`}}>
                    <DayDescription events={events} date={date} />
                </div>
            </React.Fragment>
        )
    } else {
        internals = (
            <div style={{position: "relative"}}>
                <CalendarDayModal date={date} events={events} close={modalOff} active={showModal} />
                {eventsWithPics.map((event, index) =>
                    <div key={event.fields.slug} className="box button has-text-left calendar-day has-text-white has-text-weight-bold" onClick={modalOn} style={{
                            backgroundImage: `url(${_.get(event.frontmatter.image, 'srcNode.childImageSharp.editedFluid.src', event.frontmatter.image.src)})`,
                            opacity: index === currentImage ? 1 : 0,
                            transition: `opacity ${imageFadeTimeS}s`,
                            position: "absolute",
                            width: "100%"}}>
                        <DayDescription events={events} date={date} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="column is-half-mobile is-one-quarter-tablet is-2-desktop">
            {internals}
        </div>
    )
}
 
const EventLink = ({slug, title}) => (
    <p><Link className="has-text-white has-text-weight-medium calendar-day-text" to={slug}>{title}</Link></p>
)

const DayDescription = ({events, date}) => (
    <React.Fragment>
        <DayText date={date} />
        {events.slice(0, maxEvents).map(event => (<EventLink slug={event.fields.slug} title={event.frontmatter.title} key={event.frontmatter.title} />))}
        {events.length > maxEvents ? <p>...</p> : null}
    </React.Fragment>
)

const CalendarDayModal = ({date, events, close, active}) => {
    const panelData = events ? events.map((event) => getEventPanelData(event)) : []
    const emptyText = "No events found."
    
    return (
        <div className={`modal ${active ? "is-active" : ""}`}>
            <div className="modal-background" onClick={close} />
            <div className="modal-content">
                <div className="message">
                    <h1 className="message-header is-primary">{date.toLocaleDateString('en-GB', longDateFormatOptions)}</h1>
                    <PanelBlock panelData={panelData} emptyText={emptyText} />
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={close}></button>
        </div>
    )
}

const DayText = ({date}) => (
    <p>
        {areSameDay(date, new Date()) ? (
            // This day is today, so render a pencil circle around the day text
            <img className="pencil-circle" src="/img/pencil-circle.png" width="140" />
        ) : null}
        {date.toLocaleDateString('en-GB', dateDisplayFormatOptions)}
    </p>
)

const dateDisplayFormatOptions = {weekday: 'short', day: 'numeric'}
const longDateFormatOptions = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}

export default CalendarDay

CalendarDay.propTypes = {
    dateTime: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(
        eventPropTypeValidator
    )
}

EventLink.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

DayDescription.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.instanceOf(Date),
}

CalendarDayModal.propTypes = {
    date: PropTypes.instanceOf(Date),
    events: CalendarDay.propTypes.events,
    close: PropTypes.func,
    active: PropTypes.bool
}

DayText.propTypes = {
    date: PropTypes.instanceOf(Date)
}
