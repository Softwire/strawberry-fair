import { graphql } from 'gatsby'

// GraphQL reusable fragments

export const imageFluidFragment = graphql`
fragment ImageFluidFragment on MarkdownRemarkFrontmatter {
  image {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export const imageFluid64x64Fragment = graphql`
fragment ImageFluid64x64Fragment on MarkdownRemarkFrontmatter {
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
}
`

export const HeroFragment = graphql`
fragment HeroFragment on MarkdownRemarkConnection {
  nodes {
    frontmatter {
      hero {
        mode
        fixed_hero {
          alt
          src {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        revolving_hero {
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
