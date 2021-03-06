import React from 'react'
import PropTypes from 'prop-types'

import { toDateString } from '../util/dates'

const NewsArticleSideInfo = ({author, tags, date}) => {
  const formattedDate = toDateString(new Date(date))
  const formattedTags = tags && tags.join(', ')

  return (
    <div className="news-article-info">
      <h4 className="is-capitalized has-text-primary is-size-5">{author}</h4>
      <hr className="divider" />
      <div className="bottom-section">
        <div className="has-text-primary is-capitalized">{formattedTags}</div>
        <div>{formattedDate}</div>
      </div>
    </div>
  )
}

NewsArticleSideInfo.propTypes = {
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string
}

export default NewsArticleSideInfo
