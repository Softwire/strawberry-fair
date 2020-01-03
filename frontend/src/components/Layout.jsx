import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Footer } from './Footer'
import { Titles } from './Titles'
import HeaderButtons from './headerButtons'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, heroData, title, subtitle}) => (
    <React.Fragment>
        <Header heroData={heroData}>
            <HeaderButtons/>
        </Header>
        <div id="root-layout" className="section">
            <div className="container">
                <Titles title={title} subtitle={subtitle} />
                {children}
                <Footer />
            </div>
        </div>
    </React.Fragment>
)

Layout.propTypes = {
    children: PropTypes.node,
    heroData: Header.propTypes.heroData,
    title: Titles.propTypes.title,
    subtitle: Titles.propTypes.subtitle
}

