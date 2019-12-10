import React from 'react'

import NewsArticleSnapshots from '../NewsArticleSnapshots'
import BaseBlock from './BaseBlock'

const NewsBlock = ({newsBlock, newsArticles}) => (
  <BaseBlock block={newsBlock}>
    <div className="columns">
      <NewsArticleSnapshots newsArticles={newsArticles || "Hello"}/>
    </div>
  </BaseBlock>
)

export default NewsBlock
