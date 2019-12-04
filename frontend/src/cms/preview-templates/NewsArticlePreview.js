import React from 'react'
import { NewsArticleContent } from '../../templates/news-article'
import { Content } from '../../components/Content'

export default ({ entry, widgetFor, getAsset }) => (
  <NewsArticleContent
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
    image={getAsset(entry.getIn(['data', 'image']))}
    date={entry.getIn(['data', 'date'])}
    tags={entry.getIn(['data', 'tags'])}
    contentComponent={Content}
  />
)
