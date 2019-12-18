import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import { multiImageValidator, accessibleImageValidator } from './validators'
import NavBar from './header/NavBar'

const imageRotationIntervalMillis = 10000
const imageFadeTimeMills = 2000

export const Header = ({heroData}) => {
    if (heroData && heroData.isActive) {
        if (heroData.heroImages && heroData.heroImages.length > 0) {
            if (heroData.heroImages.length === 1) {
                return (
                    <FixedHero info={heroData.heroImages[0]}>
                        <NavBar />
                    </FixedHero>
                )
            }
            else {
                return (
                    <RevolvingHero data={heroData.heroImages}>
                        <NavBar />
                    </RevolvingHero>
                )
            }
        }
        else {
            // At present, this returns no hero, but should ultimately return a default hero (SF-14)
            return <NavBar />
        }
    }
    else {
        return <NavBar />
    }
}

const RevolvingHero = ({data, children}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageArray, setImageArray] = useState(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==0} key={i}/>))

    useEffect(() => {
        setTimeout(() => {
            setImageNum((imageNum + 1) % data.length)
            setImageArray(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==imageNum} key={i}/>))
        }, imageRotationIntervalMillis)
    })

    return (
        <section className="hero">
            <div className="hero-body">
                {children}
                <figure className="hero-container">
                    {imageArray}
                </figure>
            </div>
        </section>
    )
}

const RevolvingHeroImage = ({info: {src, alt}, visible}) => {
    
    const style = {
        opacity: (visible ? 1 : 0),
        transition: `opacity ${imageFadeTimeMills/1000}s`,
        position: "absolute",
        width: "80vw",
        height:"30vw",
        objectFit: "cover"
    }
    
    return (
        <PreviewCompatibleImage imageInfo={{image: src, alt: alt}}
                                style={style} />
    )
}

const FixedHero = ({info: {src, alt}, children}) => {
    
    console.log(alt, src)
    
    return (
    <section className="hero">
        <div className="hero-body">
            {children}
            <figure className="image">
                <PreviewCompatibleImage imageInfo={{image: src, alt: alt}} />
            </figure>
        </div>
    </section>
)}

FixedHero.propTypes = {
    info: accessibleImageValidator,
    children: PropTypes.node
}

RevolvingHero.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(FixedHero.propTypes)),  // Can reuse this code, so do
    children: PropTypes.node
}

RevolvingHeroImage.propTypes = {
    info: FixedHero.propTypes.info,
    visible: PropTypes.bool
}

Header.propTypes = {
    heroData: PropTypes.shape({
        isActive: PropTypes.bool,
        heroImages: multiImageValidator
    })
}
