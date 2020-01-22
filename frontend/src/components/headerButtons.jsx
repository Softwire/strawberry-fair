import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { InternalLink } from './InternalLink'
import { PreviewContext } from '../util/context.jsx'
import headerButtonPreviewData from '../data/headerButtonPreviewData'
import PropTypes from 'prop-types'

const HeaderButtons = () => (
  <PreviewContext.Consumer>
    {value => <HeaderButtonsDisplay isPreview={value} />}
  </PreviewContext.Consumer>
)

export default HeaderButtons

const HeaderButtonsDisplay = ({isPreview}) => {
  const data = isPreview ? headerButtonPreviewData : getHeaderButtonLinksAndText()

  return (
    <div className="black-and-red buttons ">
        <InternalLink to={data.blackButton.frontmatter.link} className="button is-secondary">{data.blackButton.frontmatter.text}</InternalLink>
        <InternalLink to={data.redButton.frontmatter.link} className="button is-primary">{data.redButton.frontmatter.text}</InternalLink>
    </div>
  )
}

function getHeaderButtonLinksAndText() {
  return useStaticQuery(graphql`
    query headerButtons {
      redButton: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/red-button.md/"}) {
        frontmatter {
          link
          text
        }
      }
      blackButton: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/black-button.md/"}) {
          frontmatter {
            link
            text
          }
        }
    }`
  )
}

HeaderButtonsDisplay.propTypes = {
  isPreview: PropTypes.bool.isRequired,
}
