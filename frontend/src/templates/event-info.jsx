import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import { generateEventICS } from '../util/generateEventICS'
import { downloadBlob } from '../util/downloadBlob'

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
export const EventInfo = ({title, image, dateTimeRange, eventTypes, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
        <React.Fragment>
            <EventTypeList eventTypes={eventTypes} />
            <button className="button" onClick={() => generateAndDownloadEvent(
                title,
                dateTimeRange.startDateTime,
                dateTimeRange.provideEnd ? dateTimeRange.endDateTime : dateTimeRange.startDateTime,
                content)}>
                Download
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

EventInfo.propTypes = {
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

export default site(EventInfo, data => ({subtitle: new Date(data.markdownRemark.frontmatter.dateTime).toLocaleString("en-GB", displayStyle)}))

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