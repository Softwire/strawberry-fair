import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import NewsArticleSnapshots from '../components/NewsArticleSnapshots'



// This is used by the website and for CMS previews
export const NewsOverviewContent = ({title, content, image, contentComponent, newsArticles}) => {
    const BodyComponent = contentComponent || HTMLContent
    
    return (
    <section>
        <h1>{title}</h1>
        <BodyComponent content={content} />
        <NewsArticleSnapshots newsArticles={newsArticles}/>
        <PreviewCompatibleImage imageInfo={image} />
    </section>
)}

const NewsOverview = ({data: {markdownRemark, allMarkdownRemark}}) => {
    return <NewsOverviewContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
        newsArticles={allMarkdownRemark.edges}
    />
}

export default NewsOverview

export const query = graphql`
query newsOverviewTemplate($id: String!) {
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
    allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
