import React from 'react'
import { graphql, Link } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'


// This is used by the websitesite and for CMS previews
export const BlogPageContent = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <section>
        <h1>{title}</h1>
        <BodyComponent content={content} />
        <Link to="/blog-post-1/">Blog Post 1</Link>
    </section>
)}

const BlogPage = ({data: {markdownRemark}}) => (
    <BlogPageContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
)

export default BlogPage

export const query = graphql`
query blogPageTemplate($id: String!) {
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
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
          }
        }
      }
    }
  }
`
