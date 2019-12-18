import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// List of types shown near top of event
const EventTypeList = ({eventTypes}) => (
    <div className="tags">
        {eventTypes.map(eventType => <span key={eventType} className="tag">{eventType}</span>)}
    </div>
)

EventTypeList.propTypes = {
    eventTypes: PropTypes.arrayOf(PropTypes.string)
}

// used by website and CMS previews
export const EventInfo = ({title, image, dateTime, eventTypes, content, contentComponent, heroData}) => {
    const BodyComponent = contentComponent || HTMLContent

    const date = new Date(dateTime)

    const displayStyle = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }

    return (
        <Layout heroData={heroData}>
            <section>
                <h1 className="title">{title}</h1>
                <h2 className="subtitle">{date.toLocaleString("en-GB", displayStyle)}</h2>
                <EventTypeList eventTypes={eventTypes} />
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
)}

EventInfo.propTypes = {
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    eventTypes: EventTypeList.propTypes.eventTypes,
    image: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.elementType,
    heroData: Layout.propTypes.heroData
}

export default site(EventInfo)

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