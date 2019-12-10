import React from 'react'
import PropTypes from 'prop-types'

export const HTMLContent = ({ content, className }) => (
    <div className={className + " content"} dangerouslySetInnerHTML={{ __html: content }} />
)

// This component is here to make sure the HTML in a smaller frame (e.g. upcoming events) isn't too large.
// It basically renders <h1>s and <h2>s etc as <h4>s <h5>s etc.
export const HTMLContentSmall = ({ content, className }) => (
    <div className={className + " content is-small"} dangerouslySetInnerHTML={{ __html: content }} />
)

export const Content = ({ content, className }) => (
    <div className={className + " content"}>{content}</div>
)

Content.propTypes = {
    content: PropTypes.node,
    className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes
