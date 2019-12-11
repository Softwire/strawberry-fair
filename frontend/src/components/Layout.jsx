import React from 'react'
import PropTypes from 'prop-types'

import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, revolvingHero, fixedHero}) => (
    <div className="container">
        <Header revolvingHero={revolvingHero} fixedHero={fixedHero} />
        <main>{children}</main>
        <Footer />
    </div>
)

Layout.propTypes = {
    children: PropTypes.node,
    revolvingHero: Header.propTypes.revolvingHero,
    fixedHero: Header.propTypes.fixedHero
}
