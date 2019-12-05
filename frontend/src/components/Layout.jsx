import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, heroImageSrc, heroImageAlt}) => (
    <div className="container">
        <Header />
        <Hero src={heroImageSrc} alt={heroImageAlt}/>
        <main>{children}</main>
        <Footer />
    </div>
)


export const Hero = ({src, alt}) => (
    <section class="hero">
        <div class="hero-body">
            <figure class="image">
                <PreviewCompatibleImage imageInfo={{image: {src}, alt: {alt}}} />
            </figure>
        </div>
    </section>
)