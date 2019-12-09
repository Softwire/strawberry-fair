import React from 'react'
import PropTypes from 'prop-types'

export const HTMLContent = ({ content, className }) => (
    <div className={className + " content"} dangerouslySetInnerHTML={{ __html: content }} />
)

export const Content = ({ content, className }) => (
    <div className={className}>{content}</div>
)

Content.propTypes = {
    content: PropTypes.node,
    className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes
