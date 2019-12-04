import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, heroImage}) => (
    <div className="container">
        <Header />
        <section class="hero">
            <div class="hero-body">
                <figure class="image">
                    <img src="img/test-banner.jpg" alt="as-yet-untitled"></img>
                </figure>
            </div>
        </section>
        <main>{children}</main>
        <Footer />
    </div>
)