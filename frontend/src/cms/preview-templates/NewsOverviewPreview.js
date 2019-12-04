import React from 'react'
import { NewsOverviewContent } from '../../templates/news-overview'
import { Content } from '../../components/Content'

export default ({ entry, widgetFor, getAsset }) => {
  
  const placeholderArticle = {
      node: {
        fields: {
          slug: '/'
        },
        frontmatter: {
          image: {
            image: '/img/strawberry.jpg'
          },
          title: 'Placeholder'
        }
      }
  }

  const placeholderArticles = new Array(3).fill(placeholderArticle)

  return (
    <NewsOverviewContent
      title={entry.getIn(['data', 'title'])}
      subtitle={entry.getIn(['data', 'subtitle'])}
      content={widgetFor('body')}
      image={getAsset(entry.getIn(['data', 'image']))}
      contentComponent={Content}
      newsArticles={placeholderArticles}
    />
  )
}
