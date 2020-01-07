import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { StrawberryTiles } from '../components/StrawberryCard'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const AboutPage = ({content, contentComponent, strawberryTiles}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <div className="columns reverse-columns">
        <StrawberryTiles tileTextArray={strawberryTiles}/>
        <div className="column">
          <BodyComponent content={content} />
        </div>
      </div>
)}

AboutPage.propTypes = {
  image: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType,
  strawberryTiles: PropTypes.arrayOf(PropTypes.string)
}

export default site(AboutPage)

export const query = graphql`
query aboutPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        strawberryTiles
      }
      html
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`


