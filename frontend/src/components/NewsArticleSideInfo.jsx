import React from 'react'
import PropTypes from 'prop-types'

const NewsArticleSideInfo = ({author, tags, date}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-UK', {year: 'numeric', month: 'long', day: 'numeric'});
  const formattedTags = tags && tags.join(', ')

  return (
    <div className="tile is-ancestor has-text-centered">
      <div className="tile is-vertical is-parent">
        <div className="tile is-child box">
          <h4 className="is-capitalized has-text-primary">{author}</h4>
          <h6 className="is-capitalized">volunteer</h6>
        </div>
        <div className="tile is-child box">
          <div className="has-text-primary is-capitalized">{formattedTags}</div>
          <div>{formattedDate}</div>
          <p></p>
        </div>
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
