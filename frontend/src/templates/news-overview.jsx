import React from 'react'
import { graphql } from 'gatsby'

import NewsArticleSnapshots from '../components/NewsArticleSnapshots'
import { site } from '../util/templating'
import NewsMenu from '../components/NewsMenu.jsx'


// This is used by the website and for CMS previews
export const NewsOverview = ({newsArticles, featuredTitle}) => {
  return (
    <div className="columns">
      <div className = "column is-four-fifths">
        <NewsArticleSnapshots newsArticles={newsArticles} featuredTitle={featuredTitle}/>
      </div>
      <div className = "column">
        <NewsMenu newsArticles={newsArticles}/>
      </div>          
    </div>
  )
}

NewsOverview.propTypes = {
  newsArticles: NewsArticleSnapshots.propTypes.newsArticles
}

export default site(NewsOverview, data => ({newsArticles: data.allMarkdownRemark.edges, featuredArticle: data.markdownRemark.frontmatter.featuredArticle}))

export const query = graphql`
query newsOverviewTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        featuredTitle
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
