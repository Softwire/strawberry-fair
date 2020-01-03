import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
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
    
    return(
            <div className="field is-grouped is-pulled-right">
                <div className="buttons">
                    <Link to={data.getInvolved.frontmatter.link} className="button is-secondary">{data.getInvolved.frontmatter.text}</Link>
                    <Link to={data.applyToTrade.frontmatter.link} className="button is-primary">{data.applyToTrade.frontmatter.text}</Link>
                </div>
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

HeaderButtonsDisplay.propTypes = {
  isPreview: PropTypes.bool.isRequired
}