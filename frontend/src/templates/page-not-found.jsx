import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { site } from '../util/templating'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const PageNotFound = ({image}) => {
  const style = {
    width: "100%",
    height: "100%"
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-vertical-center">
          <div className="column is-half has-text-centered has-text-weight-medium">
            <p className="is-size-2"><strong >Oh no!</strong></p>
            <p className="is-size-3 is-size-5-mobile">This page is not suitable for consumption :(</p>
          </div>
          <div className="column is-half">
            <PreviewCompatibleImage imageInfo={image} style={style}/>
          </div>
        </div>
      </div>
    </section>
)}

export default site(PageNotFound)

export const query = graphql`
query pageNotFound($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
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
      html
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`
PageNotFound.propTypes = {
  image: PropTypes.gatsbyImageSharpFluidValidator
}