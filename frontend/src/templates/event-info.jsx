import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import _ from 'lodash'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import { areSameDay, areCurrentYear, toDateTimeString } from '../util/dates'
import { PreviewContext } from '../util/context'



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
            <PreviewCompatibleImage imageInfo={image ? {src: _.get(image, 'srcNode.childImageSharp.fixedAspect.src', image.src),
                                                        alt: image.alt} : null} />
            <BodyComponent content={content} />
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

export const generateEventSubtitle = (data, isMobile=false) => {
    const dateTimeRange = data.markdownRemark.frontmatter.dateTimeRange

    const startDate = new Date(dateTimeRange.startDateTime)
    const endDate = new Date(dateTimeRange.endDateTime)
    
    const bothCurrentYear = areCurrentYear(startDate, endDate)

    const start = toDateTimeString(startDate, {isShort: isMobile, withYear: !bothCurrentYear})
    
    if (!dateTimeRange.provideEnd) {
        return start
    } else if (areSameDay(startDate, endDate)) {
        return start + `–${endDate.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})}`
    } else {
        return start + ` – ${toDateTimeString(endDate, {isShort: isMobile, withYear: !bothCurrentYear})}`
    }
    // This allows for events to go on overnight / over multiple days
}

const extractor = (data) => ({subtitle: generateEventSubtitle(data)})

export default site(EventInfo, { additionalPropsExtractor: extractor, isNarrow: true })

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