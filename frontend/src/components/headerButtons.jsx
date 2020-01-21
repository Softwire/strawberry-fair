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
        <InternalLink to={data.getInvolved.frontmatter.link} className="button is-secondary">{data.getInvolved.frontmatter.text}</InternalLink>
        <InternalLink to={data.applyToTrade.frontmatter.link} className="button is-primary">{data.applyToTrade.frontmatter.text}</InternalLink>
    </div>
  )
}

function getHeaderButtonLinksAndText() {
  return useStaticQuery(graphql`
    query headerButtons {
      applyToTrade: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/red-button.md/"}) {
        frontmatter {
          link
          text
        }
      }
      getInvolved: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/black-button.md/"}) {
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
