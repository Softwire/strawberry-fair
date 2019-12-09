import React from "react"
import { graphql } from "gatsby"

export default AccessibleImage

const AccessibleImage = graphql`
    fragment AccessibleImage on Site {
        alt
        src {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`
