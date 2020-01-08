import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import { generateEventICS } from '../util/generateEventICS'
import { downloadBlob } from '../util/downloadBlob'
import { areSameDay } from '../util/dates'
import { PreviewContext } from '../util/context'

//display style of the event date
export const displayStyle = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
}

// List of types shown near top of event
const EventTypeList = ({eventTypes}) => {
    if (eventTypes) {
        return (
            <div className="tags">
                {eventTypes.map(eventType => <span key={eventType} className="tag">{eventType}</span>)}
            </div>
        )
    } else {
        return null
    }
}

EventTypeList.propTypes = {
    eventTypes: PropTypes.arrayOf(PropTypes.string)
}

// used by website and CMS previews
export const EventInfo = ({title, image, dateTimeRange, eventTypes, content, contentComponent}) => (
    <PreviewContext.Consumer>
        {value => <EventInfoWithContext isPreview={value} title={title} image={image} dateTimeRange={dateTimeRange}
        eventTypes={eventTypes} content={content} contentComponent={contentComponent} />}
    </PreviewContext.Consumer>
)

const EventInfoWithContext = ({isPreview, title, image, dateTimeRange, eventTypes, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
        <React.Fragment>
            <EventTypeList eventTypes={eventTypes} />
            <button className="button event-download-button" onClick={isPreview ? null : () => generateAndDownloadEvent(
                title,
                dateTimeRange.startDateTime,
                dateTimeRange.provideEnd ? dateTimeRange.endDateTime : dateTimeRange.startDateTime,
                content)}>
                Add to Calendar
            </button>
            <BodyComponent content={content} />
            <PreviewCompatibleImage imageInfo={image} />
        </React.Fragment>
    )
}

const generateAndDownloadEvent = (title, startDateTime, endDateTime, content) => {
    const eventBlob = generateEventICS(title, startDateTime, endDateTime, content)
    downloadBlob(eventBlob, `${title}.ics`)
}

EventInfoWithContext.propTypes = {
    isPreview: PropTypes.bool,
    title: PropTypes.string.isRequired,
    dateTimeRange: PropTypes.shape({
        startDateTime: PropTypes.string.isRequired,
        provideEnd: PropTypes.bool.isRequired,
        endDateTime: PropTypes.string
    }),
    eventTypes: EventTypeList.propTypes.eventTypes,
    image: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.elementType
}

EventInfo.propTypes = EventInfoWithContext.propTypes

export const generateEventSubtitle = (data) => {
    const dateTimeRange = data.markdownRemark.frontmatter.dateTimeRange

    const startDate = new Date(dateTimeRange.startDateTime)
    const endDate = new Date(dateTimeRange.endDateTime)
    const start = startDate.toLocaleDateString("en-GB", displayStyle)

    if (!dateTimeRange.provideEnd) {
        return start
    } else if (areSameDay(startDate, endDate)) {
        return start + `–${endDate.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})}`
    } else {
        return start + ` – ${endDate.toLocaleDateString("en-GB", displayStyle)}`
    }
    // This allows for events to go on overnight / over multiple days
}

export default site(EventInfo, data => ({subtitle: generateEventSubtitle(data)}))

export const query = graphql`
query eventInfoTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
        ...EventFragment
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
        ...HeroFragment
    }
}
`