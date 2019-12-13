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
      editedFluid: fluid(duotone: {highlight: "ae1414", shadow: "1d1d1d", opacity: 70}) {
        src
      }
      resize(width: 64, height: 64) {
        src
      }
    }
  }
}
`

export const revolvingHeroImageFluidFragment = graphql`
fragment RevolvingHeroImageFluidFragment on MarkdownRemarkFrontmatterRevolvingHero {
  image1 {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  image2 {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  image3 {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  image4 {
    alt
    src {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  image5 {
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
