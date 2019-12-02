import React from 'react'
import { graphql, Link } from 'gatsby'

import { HTMLContent } from '../components/Content'


// This is used by the websitesite and for CMS previews
export const BlogPageContent = ({title, content, image, contentComponent, blogPosts}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
    <section>
        <h1>{title}</h1>
        <BodyComponent content={content} />
        <BlogPostsPreview blogPosts={blogPosts}/>
    </section>
)}

const BlogPostsPreview = ({blogPosts}) => {
  const blogPostLinks = blogPosts.map(blogPost => 
    <BlogPostPreview blogPost={blogPost}/>
  )
  return (
    <div>
      {blogPostLinks}
    </div>
  )
}

const BlogPostPreview = ({blogPost}) =>
  <div>
    <Link to={blogPost.node.fields.slug}>
      {blogPost.node.frontmatter.title}
    </Link>
  </div>


const BlogPage = ({data: {markdownRemark, allMarkdownRemark}}) => {
    return <BlogPageContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
        blogPosts={allMarkdownRemark.edges}
    />
}

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
    allMarkdownRemark(filter: {fields: {slug: {regex: "$//blog-posts//"}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
          }
          html
        }
      }
    }
  }
`
