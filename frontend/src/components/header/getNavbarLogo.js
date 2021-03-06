import { useStaticQuery, graphql } from 'gatsby'

// This function uses a static query to load the navbar logo as a fixed-size gatsby image
export const getNavbarLogo = () => {
  const { file } = useStaticQuery(graphql`
  query navbarLogo {
    file(relativePath: {eq: "1-line-logo.png"}) {
      childImageSharp {
        fixed(width: 280, traceSVG: {background: "#fff", color: "#ae1414",  turdSize: 1}) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
  `)

  return file.childImageSharp.fixed
}
