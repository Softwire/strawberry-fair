import React from 'react'
import { graphql } from 'gatsby'

import NewsArticleSnapshots, { NewsArticleSnapshot } from '../components/NewsArticleSnapshots'
import { site } from '../util/templating'
import NewsMenu from '../components/NewsMenu.jsx'


// This is used by the website and for CMS previews
export const NewsOverview = ({newsArticles}) => {
  // Only show "more news" if there are more than three news articles
  const moreNews = newsArticles.length > 3
  
  return (
    <React.Fragment>
      <div className="columns">
        <div className = "column is-four-fifths">
          <NewsArticleSnapshots newsArticles={newsArticles}/>
        </div>
        <div className = "column">
          <NewsMenu newsArticles={newsArticles}/>
        </div>          
      </div>
      { moreNews &&
      (
        <React.Fragment>
          <h2 className="subtitle">More news</h2>
          <hr className="more-news-hr" />
          <div className="columns is-multiline">
            {newsArticles.slice(3, 9).map(newsArticle => (  // Show the next 1-6 articles
              <div key={newsArticle.node.fields.slug} className="column small-box is-one-third">
                <NewsArticleSnapshot newsArticles={newsArticle} />
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

NewsOverview.propTypes = {
  newsArticles: NewsArticleSnapshots.propTypes.newsArticles
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
