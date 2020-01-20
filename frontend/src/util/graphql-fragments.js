import { graphql } from 'gatsby'

// GraphQL reusable fragments

export const imageFluidFragment = graphql`
fragment ImageFluidFragment on MarkdownRemarkFrontmatter {
  image {
    alt
    srcNode {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
}
`

export const imageFluidFixedAspectFragment = graphql`
fragment ImageFluidFixedAspectFragment on MarkdownRemarkFrontmatter {
  image {
    alt
    srcNode {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        editedFluid: fluid(duotone: {highlight: "ae1414", shadow: "1d1d1d", opacity: 70}) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        fixedAspect: resize(width: 500, height: 400) {
          src
        }
      }
    }
    shouldDisplay
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
          srcNode {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
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
    ...ImageFluidFixedAspectFragment
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
    ...ImageFluidFixedAspectFragment
    date
    tags
    uniqueId
  }
  html
  shortExcerpt: excerpt(format: HTML, pruneLength: 50)
  longExcerpt: excerpt(format: HTML, pruneLength: 400)
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