import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, revolvingHero, fixedHero}) => (
    <div className="container">
        <Header />
        {revolvingHero ? <RevolvingHero data={Object.values(revolvingHero)} /> : null}
        {fixedHero ? <FixedHero info={fixedHero} /> : null}
        <main>{children}</main>
        <Footer />
    </div>
)

export const RevolvingHero = ({data}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageInfo, setImageInfo] = useState(data[0])

    useEffect(() => {
        setTimeout(() => {
            setImageNum((imageNum + 1) % 5)
            setImageInfo(data[imageNum])
        }, 10000)
    })

    console.log(imageInfo)

    return (
        <FixedHero info={imageInfo} />
    )
}


export const FixedHero = ({info: {src, alt}}) => (
    <section className="revolvingHero">
        <div className="revolvingHero-body">
            <figure className="image">
                <PreviewCompatibleImage imageInfo={{image: src, alt: alt}} />
            </figure>
        </div>
    </section>
)