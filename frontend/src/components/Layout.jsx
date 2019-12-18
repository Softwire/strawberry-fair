import React from 'react'
import PropTypes from 'prop-types'

import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, heroData}) => (
    <div id = "root-layout" className="container">
        <Header heroData={heroData} />
        <main>{children}</main>
        <Footer />
    </div>
)

Layout.propTypes = {
    children: PropTypes.node,
    heroData: Header.propTypes.heroData
}
