import React from 'react'
import PropTypes from 'prop-types'

// Subtitle is rendered as <p> rather than <h2> due to instructions at
// https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines
export const Titles = ({title, subtitle}) => {
  if (title || subtitle) {
    return (
      <div className="titles">
        <h1 className="title is-2 is-spaced">{title}</h1>
        <p className="subtitle is-5">{subtitle}</p>
      </div>
    )
  } else {
    return null
  }
}

Titles.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node
}
