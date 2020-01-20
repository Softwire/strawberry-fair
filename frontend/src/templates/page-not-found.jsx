import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { site } from '../util/templating'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const PageNotFound = ({image, interjection, info}) => (
  <div className="columns is-vcentered">
    <div className="column is-offset-1 is-5 has-text-centered has-text-weight-medium">
      <p className="is-size-2"><strong >{interjection}</strong></p>
      <p className="is-size-3 is-size-5-mobile">{info}</p>
    </div>
    <div className="column is-5">
      <PreviewCompatibleImage imageInfo={image}/>
    </div>
  </div>
)

export default site(PageNotFound)

export const query = graphql`
query pageNotFound($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        interjection
        info
        image {
          alt
          srcNode {
            childImageSharp {
              fluid(traceSVG: {background: "#fff", color: "#ae1414",  turdSize: 50}) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`
PageNotFound.propTypes = {
  image: PropTypes.gatsbyImageSharpFluidValidator,
  interjection: PropTypes.string,
  info: PropTypes.string
}