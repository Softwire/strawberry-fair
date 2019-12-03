import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

// This is used by the website and for CMS previews
export const NewsArticleContent = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <section className="section">
      <h1 className="title has-text-primary">{title}</h1>
      <div className="image is-128x128 is-pulled-right">
        <PreviewCompatibleImage imageInfo={image}/>
      </div>
      <BodyComponent content={content} />
    </section>
)}

const NewsArticle = ({data: {markdownRemark}}) => (
    <NewsArticleContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
)

export default NewsArticle

export const query = graphql`
query newsArticleTemplate($id: String!) {
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
      }
      html
    }
  }
`
