import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { StrawberryTiles } from '../components/StrawberryCard'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const AboutPage = ({title, subtitle, content, contentComponent, strawberryTiles, heroData}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout heroData={heroData} title={title} subtitle={subtitle}>
        <div className="columns reverse-columns">
          <StrawberryTiles tileTextArray={strawberryTiles}/>
          <div className="column">
            <BodyComponent content={content} />
          </div>
        </div>
      </Layout>
)}

AboutPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType,
  strawberryTiles: PropTypes.arrayOf(PropTypes.string),
  heroData: Layout.propTypes.heroData
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


