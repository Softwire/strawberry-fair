import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const HeaderButtons = () => {
    const data = useStaticQuery(graphql`
    query headerButtons {
            applyToTrade: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/apply-to-trade.md/"}) {
              frontmatter {
                link
                title
              }
            }
            getInvolved: markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/buttons/get-involved.md/"}) {
                frontmatter {
                  link
                  title
                }
              }
          }`
        )
    return(
            <div className="field is-grouped is-pulled-right">
                <div className="buttons">
                    <Link to={data.getInvolved.frontmatter.link} className="button is-secondary">{data.getInvolved.frontmatter.title}</Link>
                    <Link to={data.applyToTrade.frontmatter.link} className="button is-primary">{data.applyToTrade.frontmatter.title}</Link>
                </div>
            </div>
    )
}

export default HeaderButtons