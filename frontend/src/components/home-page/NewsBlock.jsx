import React from 'react'
import PropTypes from 'prop-types'

import NewsArticleSnapshots from '../NewsArticleSnapshots'
import BaseBlock from './BaseBlock'

const NewsBlock = ({newsBlock, newsArticles}) => (
  <BaseBlock block={newsBlock}>
    <div className="columns">
      <NewsArticleSnapshots newsArticles={newsArticles || "Hello"}/>
    </div>
  </BaseBlock>
)

NewsBlock.propTypes = {
  newsBlock: BaseBlock.propTypes.block,  // Reuse same validator
  newsArticles: PropTypes.oneOfType([
    NewsArticleSnapshots.propTypes.newsArticles,  // Reuse validator
    PropTypes.string  // Placeholder "Hello"
  ])
}

export default NewsBlock
