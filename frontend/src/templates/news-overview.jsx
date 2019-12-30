import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import NewsArticleSnapshots from '../components/NewsArticleSnapshots'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import NewsMenu from '../components/NewsMenu.jsx'


// This is used by the website and for CMS previews
export const NewsOverview = ({title, subtitle, newsArticles, heroData}) => {
  
  return (
    <Layout heroData={heroData} title={title} subtitle={subtitle}>
      <div className="columns">
        <div className = "column is-three-quarters">
          <NewsArticleSnapshots newsArticles={newsArticles}/>
        </div>
        <div className = "column">
          <NewsMenu newsArticles={newsArticles}/>
        </div>          
      </div>
    </Layout>
  )
}

NewsOverview.propTypes = {
  title: PropTypes.node,  // Only needs to be a node, not specifically a string, as it is rendered within a tag so needs only be renderable
  subtitle: PropTypes.node,
  content: PropTypes.node,
  contentComponent: PropTypes.elementType,
  newsArticles: NewsArticleSnapshots.propTypes.newsArticles,
  heroData: Layout.propTypes.heroData
}

export default site(NewsOverview, data => ({newsArticles: data.allMarkdownRemark.edges}))

export const query = graphql`
query newsOverviewTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
      }
      html
    }
    allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          ...NewsFragment
        }
      }
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`
