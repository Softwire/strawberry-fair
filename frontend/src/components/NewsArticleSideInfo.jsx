import React from 'react'
import PropTypes from 'prop-types'

const NewsArticleSideInfo = ({author, tags, date}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-UK', {year: 'numeric', month: 'long', day: 'numeric'});
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
