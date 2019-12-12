import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Footer } from './Footer'
import { useStaticQuery, graphql, Link } from 'gatsby'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, revolvingHero, fixedHero}) => {
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
        <div id = "root-layout" className="container">
            <Header revolvingHero={revolvingHero} fixedHero={fixedHero}>
                <div className="field is-grouped is-pulled-right">
                    <div className="buttons">
                        <Link to={data.getInvolved.frontmatter.link} className="button is-secondary">{data.getInvolved.frontmatter.title}</Link>
                        <Link to={data.applyToTrade.frontmatter.link} className="button is-primary">{data.applyToTrade.frontmatter.title}</Link>
                    </div>
                </div>
            </Header>
            <main>{children}</main>
            <Footer />
        </div>
        )
    }


Layout.propTypes = {
    children: PropTypes.node,
    revolvingHero: Header.propTypes.revolvingHero,
    fixedHero: Header.propTypes.fixedHero
}

