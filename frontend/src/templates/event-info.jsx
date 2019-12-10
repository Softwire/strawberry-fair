import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// List of tags shown near top of event
const EventTagList = ({tags}) => (
    <div className="tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
)

// used by website and CMS previews
export const EventInfo = ({title, image, dateTime, tags, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    const date = new Date(dateTime)

    return (
        <Layout>
            <section>
                <h1>{title}</h1>
                <h2>{date.toLocaleString('en-GB', {timeStyle: 'short'})}</h2>
                <EventTagList tags={tags} />
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
)}

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
            tags
            dateTime
        }
        html
    }
}
`