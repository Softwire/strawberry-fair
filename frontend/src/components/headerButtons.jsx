import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { PreviewContext } from '../util/context.jsx'
import headerButtonPreviewData from '../data/headerButtonPreviewData'
import PropTypes from 'prop-types'

const HeaderButtons = ({fontSize}) => (
  <PreviewContext.Consumer>
    {value => <HeaderButtonsDisplay isPreview={value} fontSize={fontSize} />}
  </PreviewContext.Consumer>
)

export default HeaderButtons

const HeaderButtonsDisplay = ({isPreview, fontSize}) => {
  const data = isPreview ? headerButtonPreviewData : getHeaderButtonLinksAndText()

  return (
    <div className="buttons">
      <Link to={data.getInvolved.frontmatter.link} className={`button is-secondary ${fontSize}`}>{data.getInvolved.frontmatter.text}</Link>
      <Link to={data.applyToTrade.frontmatter.link} className={`button is-primary ${fontSize}`}>{data.applyToTrade.frontmatter.text}</Link>
    </div>
  )
}

function getHeaderButtonLinksAndText() {
  return useStaticQuery(graphql`
    query headerButtons {
      applyToTrade: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/apply-to-trade.md/"}) {
        frontmatter {
          link
          text
        }
      }
      getInvolved: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/get-involved.md/"}) {
          frontmatter {
            link
            text
          }
        }
    }`
  )
}

HeaderButtons.propTypes = {
  fontSize: PropTypes.string,
}

HeaderButtonsDisplay.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  fontSize: PropTypes.string,
}
