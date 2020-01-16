import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import NewsArticleSnapshots, { NewsArticleSnapshot } from '../components/NewsArticleSnapshots'
import { site } from '../util/templating'
import NewsMenu from '../components/NewsMenu.jsx'


// This is used by the website and for CMS previews
export const NewsOverview = ({newsArticles, featuredId}) => {
  // Only show "more news" if there are more than three news articles
  const moreNews = newsArticles.length > 3
  
  if(!!featuredId) moveArticleToTheFront(getIndexOfFeaturedArticle(featuredId, newsArticles), newsArticles)

  return (
    <React.Fragment>
      <div className="columns">
        <div className = "column is-four-fifths">
          <NewsArticleSnapshots newsArticles={newsArticles} featuredId={featuredId}/>
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
  newsArticles: NewsArticleSnapshots.propTypes.newsArticles,
  featuredId: PropTypes.string
}

export default site(NewsOverview, data => ({newsArticles: data.allMarkdownRemark.edges, featuredArticle: data.markdownRemark.frontmatter.featuredArticle}))

export const query = graphql`
query newsOverviewTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        featuredId
      }
      html
    }
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "news-article"}}}, sort: {fields: frontmatter___date, order: DESC}) {
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
const getIndexOfFeaturedArticle = (featuredId, articles) => {
  return articles.findIndex(article => article.node.frontmatter.uniqueId === featuredId)
}

const moveArticleToTheFront = (articleIndex, articles) => {
  if(articleIndex !== -1) {
    const article = articles[articleIndex]
    articles.splice(articleIndex, 1)
    articles.unshift(article)
  }
}
