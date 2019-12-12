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

// used by website and CMS previews
export const EventInfo = ({title, image, dateTime, eventTypes, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    const date = new Date(dateTime)

    return (
        <Layout>
            <section>
                <h1>{title}</h1>
                <h2>{date.toLocaleString('en-GB', {timeStyle: 'short'})}</h2>
                <EventTypeList eventTypes={eventTypes} />
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
)}

EventInfo.propTypes = {
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.elementType
}

export default site(EventInfo)

export const query = graphql`
query eventInfoTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
        frontmatter {
            title
            image {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            eventTypes
            dateTime
        }
        html
    }
}
`