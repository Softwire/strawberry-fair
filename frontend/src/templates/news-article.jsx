import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import NewsArticleSideInfo from '../components/NewsArticleSideInfo'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const NewsArticle = ({title, author, content, image, date, tags, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout>
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
      </Layout>
)}

export default site(NewsArticle)

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
