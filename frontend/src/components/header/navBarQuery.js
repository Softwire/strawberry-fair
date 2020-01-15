import { useStaticQuery, graphql } from 'gatsby'

export const navBarQuery = () => useStaticQuery(graphql`
  query navBarQuery {
    navBarInfo: allMarkdownRemark(filter: {fields: {slug: {regex: "$//navbar//", ne: "/navbar/"}}}) {
      edges {
        node {
          frontmatter {
            title 
            pageTitles {
              pageTitle
            }
          }
        }
      }
    }
    allPages: allMarkdownRemark {
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
`)
