import { graphql } from 'gatsby'

// GraphQL reusable fragments

export const imageFluidFragment = graphql`
fragment ImageFluidFragment on MarkdownRemarkFrontmatter {
  image {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
}
`

export const imageFluid64x64Fragment = graphql`
fragment ImageFluid64x64Fragment on MarkdownRemarkFrontmatter {
  image {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
        editedFluid: fluid(duotone: {highlight: "ae1414", shadow: "1d1d1d", opacity: 70}) {
          ...GatsbyImageSharpFluid
        }
        resize(width: 64, height: 64) {
          src
        }
      }
    }
  }
}
`

export const HeroFragment = graphql`
fragment HeroFragment on MarkdownRemarkConnection {
  nodes {
    frontmatter {
      heroData {
        isActive
        heroImages {
          alt
          src {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`

export const eventFragment = graphql`
fragment EventFragment on MarkdownRemark {
  frontmatter {
    title
    ...ImageFluid64x64Fragment
    eventTypes
    dateTimeRange {
      startDateTime
      endDateTime
      provideEnd
    }
  }
  html
  excerpt(format: HTML, pruneLength: 150)
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
    ...ImageFluidFragment
    date
    tags
  }
  html
  fields {
    slug
  }
}
`

export const formFragment = graphql`
fragment FormFragment on MarkdownRemarkFrontmatter {
  form {
    isPublic
    link
  }
}
`