import React from 'react'
import { Link } from 'gatsby'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import MainTileWithTwoStackedSideTiles from './MainTileWithTwoStackedSideTiles'

const NewsArticleSnapshots = ({newsArticles}) => {
    const newsArticleSnapshots = newsArticles.map(newsArticles => 
      <NewsArticleSnapshot 
        newsArticles={newsArticles}
        key={newsArticles.node.fields.slug}
        />)
      return (
        <MainTileWithTwoStackedSideTiles 
          mainTile={newsArticleSnapshots[0]}
          sideTopTile={newsArticleSnapshots[1]}
          sideBottomTile={newsArticleSnapshots[2]}
        />
        )
  }

const NewsArticleSnapshot = ({newsArticles}) => (
  <article>
    <Link to={newsArticles.node.fields.slug}>
      <PreviewCompatibleImage imageInfo={newsArticles.node.frontmatter.image}/>
      <h2 className="has-text-primary">{newsArticles.node.frontmatter.title}</h2>
      <h3 className="has-text-primary">{newsArticles.node.frontmatter.date}</h3>
    </Link>
  </article>
)

export default NewsArticleSnapshots
