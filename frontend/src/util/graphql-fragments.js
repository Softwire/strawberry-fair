import { graphql } from 'gatsby'

// GraphQL reusable fragments

export const eventFragment = graphql`
fragment EventFragment on MarkdownRemark {
  frontmatter {
    title
    image {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
        resize(width: 64, height: 64) {
          src
        }
      }
    }
    eventTypes
    dateTime
  }
  html
  fields {
    slug
  }
}
`

export const newsFragment = graphql`
fragment NewsFragment on MarkdownRemark {
  frontmatter {
    title
    subtitle
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
  fields {
    slug
  }
}
`
