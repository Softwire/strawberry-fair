import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import MainTileWithTwoStackedSideTiles from './MainTileWithTwoStackedSideTiles'
import { newsArticleValidator } from './validators'
import { HTMLContent } from './Content'

//display style of the event date
export const displayStyle = {
  day: "numeric",
  month: "long",
  year: "numeric"
}

export const NewsArticleSnapshot = ({newsArticles}) => {
  const publicationDate = new Date(newsArticles.node.frontmatter.date)

  const imageInfo = _.get(
    newsArticles.node.frontmatter.image,
    'srcNode.childImageSharp.fixedAspect',
    newsArticles.node.frontmatter.image
  )
  const imageWrapperStyle = {
    width: "100%"
  }

  return (
    <article className="news-preview">
      <Link to={newsArticles.node.fields.slug}>
        <PreviewCompatibleImage imageInfo={imageInfo} style={imageWrapperStyle} />
        <h2 className="title is-5 news-snapshot-title">{newsArticles.node.frontmatter.title}</h2>
      </Link>
      <h3 className="subtitle is-7">{publicationDate.toLocaleDateString("en-GB", displayStyle)}</h3>
      <HTMLContent content={newsArticles.node.shortExcerpt} className="news-excerpt news-excerpt-short" />
      <HTMLContent content={newsArticles.node.longExcerpt} className="news-excerpt news-excerpt-long" />
  </article>
  )
}

NewsArticleSnapshot.propTypes = {
  newsArticles: newsArticleValidator
}

const NewsArticleSnapshots = ({newsArticles, featuredArticle}) => {
  const newsArticleSnapshots = newsArticles.map(newsArticles => 
    <NewsArticleSnapshot 
      newsArticles={newsArticles}
      key={newsArticles.node.fields.slug}
    />
  )


  return (
    <MainTileWithTwoStackedSideTiles 
      mainTile={newsArticleSnapshots[0]}
      sideTopTile={newsArticleSnapshots[1]}
      sideBottomTile={newsArticleSnapshots[2]}
    />
  )
}

NewsArticleSnapshots.propTypes = {
  newsArticles: PropTypes.arrayOf(newsArticleValidator)
}

export default NewsArticleSnapshots

const getFeaturedArticle = (featuredArticleTitle, articles) => {
  featuredArticle = articles.filter(article => article.node.frontmatter.title === featuredArticleTitle )
  if(featuredArticle.length === 0) {
    console.log(`No article with title ${featuredArticleTitle} was found.`)
    return null
  }
  else if (featuredArticle.length > 1) {
    console.log(`${featuredArticle.length} articles with the title ${featuredArticleTitle} were found.`)
    return null
  }
  else return featuredArticle[0]
}