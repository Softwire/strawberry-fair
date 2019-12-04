import React from 'react'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import NewsArticleSnapshots from '../components/NewsArticleSnapshots'
import { Layout } from '../components/Layout'


// This is used by the website and for CMS previews
export const NewsOverviewContent = ({title, subtitle, content, contentComponent, newsArticles}) => {
    const BodyComponent = contentComponent || HTMLContent
    
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-primary is-size-1">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
          <BodyComponent content={content}/>      
          <NewsArticleSnapshots newsArticles={newsArticles}/>
        </div>
      </section>
)}

const NewsOverview = ({data: {markdownRemark, allMarkdownRemark}}) => (
  <Layout>
    <NewsOverviewContent
        title={markdownRemark.frontmatter.title}
        subtitle={markdownRemark.frontmatter.subtitle}
        content={markdownRemark.html}
        newsArticles={allMarkdownRemark.edges}
    />
  </Layout>
)

export default NewsOverview

export const query = graphql`
query newsOverviewTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
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
    allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          html
        }
      }
    }
  }
`
