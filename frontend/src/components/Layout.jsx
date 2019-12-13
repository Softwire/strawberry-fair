import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Footer } from './Footer'
import { useStaticQuery, graphql, Link } from 'gatsby'
import HeaderButtons from './headerButtons'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, revolvingHero, fixedHero}) => (
        <div id = "root-layout" className="container">
            <Header revolvingHero={revolvingHero} fixedHero={fixedHero}>
                <HeaderButtons/>
            </Header>
            <main>{children}</main>
            <Footer />
        </div>
        )


Layout.propTypes = {
    children: PropTypes.node,
    revolvingHero: Header.propTypes.revolvingHero,
    fixedHero: Header.propTypes.fixedHero
}

