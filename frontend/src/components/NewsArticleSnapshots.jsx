import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import MainTileWithTwoStackedSideTiles from './MainTileWithTwoStackedSideTiles'
import { newsArticleValidator } from './validators'

const NewsArticleSnapshot = ({newsArticles}) => (
  <article>
    <Link to={newsArticles.node.fields.slug}>
      <PreviewCompatibleImage imageInfo={newsArticles.node.frontmatter.image}/>
      <h2 className="has-text-primary">{newsArticles.node.frontmatter.title}</h2>
    </Link>
  </article>
)

NewsArticleSnapshot.propTypes = {
  newsArticles: newsArticleValidator
}

const NewsArticleSnapshots = ({newsArticles}) => {
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
