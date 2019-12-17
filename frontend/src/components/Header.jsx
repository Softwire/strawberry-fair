import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import { childImageSharpValidator } from './validators'
import NavBar from './header/NavBar'

const imageRotationIntervalMillis = 10000
const imageFadeTimeMills = 2000

export const Header = ({revolvingHero, fixedHero}) => {
    if (revolvingHero) {
        return (
            <React.Fragment>
                <NavBar />
                <RevolvingHero data={Object.values(revolvingHero)} />
            </React.Fragment>
        )
    }
    else if (fixedHero) {
        return (
            <React.Fragment>
                <NavBar />
                <FixedHero info={fixedHero} />
            </React.Fragment>
        )
    }
    else {
        return <NavBar />
    }
}

const RevolvingHero = ({data}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageArray, setImageArray] = useState(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==0} key={i}/>))

    useEffect(() => {
        setTimeout(() => {
            setImageNum((imageNum + 1) % data.length)
            setImageArray(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==imageNum} key={i}/>))
        }, imageRotationIntervalMillis)
    })

    return (
        <section className="hero has-background">
            {imageArray}
        </section>
    )
}

const RevolvingHeroImage = ({info: {src, alt}, visible}) => {
    
    const style = {
        opacity: (visible ? 1 : 0),
        transition: `opacity ${imageFadeTimeMills/1000}s`
    }
    
    return (
        <img alt={alt} className="hero-background" src={src.childImageSharp ? src.childImageSharp.fluid.src : src} style={style} />
    )
}

const FixedHero = ({info: {src, alt}}) => (
    <section className="hero has-background">
        <img alt={alt} className="hero-background" src={src.childImageSharp ? src.childImageSharp.fluid.src : src} />
    </section>
)

FixedHero.propTypes = {
    info: PropTypes.shape({
        src: PropTypes.oneOfType([
            PropTypes.string,
            childImageSharpValidator
        ]).isRequired,
        alt: PropTypes.string
    }),
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
    revolvingHero: PropTypes.objectOf(FixedHero.propTypes.info),
    fixedHero: FixedHero.propTypes.info     // Can reuse these two for validation
}
