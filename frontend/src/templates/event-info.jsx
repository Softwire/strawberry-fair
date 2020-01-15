import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
// Allow "download" <a> attribute to work in IE11
import 'dwnld-attr-polyfill'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
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
export const EventInfo = ({image, slug, eventTypes, content, contentComponent}) => (
    <PreviewContext.Consumer>
        {value => <EventInfoWithContext isPreview={value} image={image} slug={slug}
        eventTypes={eventTypes} content={content} contentComponent={contentComponent} />}
    </PreviewContext.Consumer>
)

const EventInfoWithContext = ({isPreview, image, slug, eventTypes, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
        <React.Fragment>
            <EventTypeList eventTypes={eventTypes} />
            {!isPreview && slug ? (
                <a className="button event-download-button" href={`/ics${slug.slice(0, -1)}.ics`} download>
                    Add to Calendar
                </a>
            ) : null}
            <BodyComponent content={content} />
            <PreviewCompatibleImage imageInfo={image} />
        </React.Fragment>
    )
}

EventInfoWithContext.propTypes = {
    isPreview: PropTypes.bool,
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