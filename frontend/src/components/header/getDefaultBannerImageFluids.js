import { useStaticQuery, graphql } from 'gatsby'

// A static query to extract the default banner images as Gatsby fluid images
// Not named "getDefaultBannerImages" so as not to clash with the function in ../../scripts/get-banner-images.js
export const getDefaultBannerImageFluids = () => {
  const { defaultBannerImagesParent } = useStaticQuery(graphql`
  query defaultBanner {
    defaultBannerImagesParent {
      children {
        children {
          ... on ImageSharp {
            fluid(maxWidth: 2000, traceSVG: {background: "#fff", color: "#ae1414",  turdSize: 50}) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
  `)

  // Then map to extract the fluid data
  return defaultBannerImagesParent.children.map(child => child.children[0].fluid)
}
