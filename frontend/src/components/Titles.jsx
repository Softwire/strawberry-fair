import React from 'react'
import PropTypes from 'prop-types'

// Subtitle is rendered as <p> rather than <h2> due to instructions at
// https://www.w3.org/TR/html52/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines
export const Titles = ({title, subtitle}) => {
  return (
    <div>
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  )
}

Titles.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node
}
