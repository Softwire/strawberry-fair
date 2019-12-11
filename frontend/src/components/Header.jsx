import React, {useState, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import NavBar from './header/NavBar'


export const Header = ({revolvingHero, fixedHero}) => {
    if (revolvingHero) {
        return (
            <RevolvingHero data={Object.values(revolvingHero)}>
                <NavBar />
            </RevolvingHero>
        )
    }
    else if (fixedHero) {
        return (
            <FixedHero info={fixedHero}>
                <NavBar />
            </FixedHero>
        )
    }
    else {
        return <NavBar />
    }
}

const RevolvingHero = ({data, children}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageInfo, setImageInfo] = useState(data[0])

    useEffect(() => {
        setTimeout(() => {
            setImageNum((imageNum + 1) % 5)
            setImageInfo(data[imageNum])
        }, 10000)
    })

    return (
        <FixedHero info={imageInfo}>{children}</FixedHero>
    )
}


const FixedHero = ({info: {src, alt}, children}) => (
    <section className="hero">
        <div className="hero-body">
            {children}
            <figure className="image">
                <PreviewCompatibleImage imageInfo={{image: src, alt: alt}} />
            </figure>
        </div>
    </section>
)


