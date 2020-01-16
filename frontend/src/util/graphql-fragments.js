import { graphql } from 'gatsby'

// GraphQL reusable fragments

export const imageFluidFragment = graphql`
fragment ImageFluidFragment on MarkdownRemarkFrontmatter {
  image {
    alt
    srcNode {
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
    srcNode {
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

export const imageFluidSquareFragment = graphql`
fragment imageFluidSquareFragment on MarkdownRemarkFrontmatter {
  image {
    alt
    srcNode {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
        fixedAspect: resize(width: 500, height: 400) {
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
          srcNode {
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
    ...imageFluidSquareFragment
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