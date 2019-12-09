import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.scss'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, revolvingHero, fixedHero}) => (
    <div className="container">
        <section class="section">
            <Header revolvingHero={revolvingHero} fixedHero={fixedHero} />
            <main>{children}</main>
        </section>
        <Footer />
    </div>
)