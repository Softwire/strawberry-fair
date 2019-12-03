import React from 'react'
import { Link } from 'gatsby'

const NewsArticleSnapshots = ({newsArticles}) => {
    const newsArticlesLinks = newsArticles.map(newsArticles => 
      <NewsArticleSnapshot newsArticles={newsArticles}/>
    )
    return (
      <div>
        {newsArticlesLinks}
      </div>
    )
  }

const NewsArticleSnapshot = ({newsArticles}) =>
<div>
  <Link to={newsArticles.node.fields.slug}>
    {newsArticles.node.frontmatter.title}
  </Link>
</div>

export default NewsArticleSnapshots
