import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import NewsArticleSideInfo from '../components/NewsArticleSideInfo'
import { Layout } from '../components/Layout'

// This is used by the website and for CMS previews
export const NewsArticleContent = ({title, author, content, image, date, tags, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <section className="section">
        <h1 className="title has-text-primary is-size-1">{title}</h1>
        <figure className="image">
          {image && <PreviewCompatibleImage imageInfo={image}/>} 
        </figure>
        <br/>
        <div className="columns">
          <div className="column is-one-quarter">
            <NewsArticleSideInfo author={author} date={date} tags={tags}/>
          </div>
          <div className="column">
            <BodyComponent content={content} />
          </div>
        </div>
      </section>
    
)}

const NewsArticle = ({data: {markdownRemark}}) => (
  <Layout>
    <NewsArticleContent
        title={markdownRemark.frontmatter.title}
        author={markdownRemark.frontmatter.author}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
        date={markdownRemark.frontmatter.date}
        tags={markdownRemark.frontmatter.tags}
    />
  </Layout>
)

export default NewsArticle

export const query = graphql`
query newsArticleTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        author
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        date
        tags
      }
      html
    }
  }
`
