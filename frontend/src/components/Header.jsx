import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { multiImageValidator, accessibleImageValidator, gatsbyImageSharpFluidValidator } from './validators'
import NavBar from './header/NavBar'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { getDefaultBannerImageFluids } from './header/getDefaultBannerImageFluids'
import { PreviewContext } from '../util/context'

const imageRotationIntervalMillis = 10000
const imageFadeTimeMills = 2000

const previewDefaultBannerUrl = "https://res.cloudinary.com/strawberryfair/image/upload/v1578398228/Banner/gareths-gate-slide_agpjto.jpg"

export const Header = ({heroData, children}) => (
    <PreviewContext.Consumer>
        {value => <HeaderWithContext isPreview={value} heroData={heroData} >{children}</HeaderWithContext>}
    </PreviewContext.Consumer>
)

const HeaderWithContext = ({isPreview, heroData, children}) => {
    if (heroData && heroData.isActive) {
        if (heroData.heroImages && heroData.heroImages.length > 0) {
            if (heroData.heroImages.length === 1) {
                return (
                    <React.Fragment>
                        <NavBar />
                        <FixedHero info={heroData.heroImages[0]} />
                        {children}
                    </React.Fragment>
                )
            }
            else {
                return (
                    <React.Fragment>
                        <NavBar />
                        <RevolvingHero data={heroData.heroImages} />
                        {children}
                    </React.Fragment>
                )
            }
        }
        else {
            // Use default images from static query
            let defaultBannerFluids
            if (!isPreview) {
                defaultBannerFluids = getDefaultBannerImageFluids()
            }

            return (
                <React.Fragment>
                    <NavBar />
                    {isPreview ?
                    <FixedHero info={{src: previewDefaultBannerUrl, alt: "Default banner placeholder"}} /> :
                    <RandomDefaultHero imageFluids={defaultBannerFluids} />
                    }
                    {children}
                </React.Fragment>
            )
        }
    }
    else {
        return (
            <React.Fragment>
                <NavBar />
                {children}
            </React.Fragment>
        )
    }
}

const RevolvingHero = ({data}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageArray, setImageArray] = useState(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==0} key={i}/>))

    useEffect(() => {
        const timeoutVar = setTimeout(() => {
            setImageNum((imageNum + 1) % data.length)
            setImageArray(data.map((info, i) => <RevolvingHeroImage info={info} visible={i==imageNum} key={i}/>))
        }, imageRotationIntervalMillis)

        // Clean up on unmount
        return () => {
            clearTimeout(timeoutVar)
        }
    })

    return (
        <section className="hero has-background">
            {imageArray}
        </section>
    )
}

const RevolvingHeroImage = ({info: {src, srcNode, alt}, visible}) => {
    const style = {
        opacity: (visible ? 1 : 0),
        transition: `opacity ${imageFadeTimeMills/1000}s`,
        position: "absolute",
        objectFit: "cover",
        width: "100%",
        height: "100%"
    }
    
    return <PreviewCompatibleImage imageInfo={{alt: alt, image: srcNode || src}} style={style} />
}

const FixedHero = ({info: {src, srcNode, alt}}) => {
    const style = {
        position: "absolute",
        objectFit: "cover",
        width: "100%",
        height: "100%"
    }

    return (
        <section className="hero has-background">
            <PreviewCompatibleImage imageInfo={{alt: alt, image: srcNode || src}} style={style} />
        </section>
    )
}

const RandomDefaultHero = ({imageFluids}) => {
    // Pick at random
    if (!imageFluids || imageFluids.length === 0) {
        return null
    }
    const randomIndex = Math.floor(Math.random() * imageFluids.length)
    const chosenFluid = imageFluids[randomIndex]

    const style = {
        position: "absolute",
        objectFit: "cover",
        width: "100%",
        height: "100%"
    }

    return (
        <section className="hero has-background">
            <Img fluid={chosenFluid} style={style} />
        </section>
    )
}

RandomDefaultHero.propTypes = {
    imageFluids: PropTypes.arrayOf(gatsbyImageSharpFluidValidator)
}

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
    }),
    children: PropTypes.node
}

HeaderWithContext.propTypes = {
    isPreview: PropTypes.bool,
    heroData: Header.propTypes.heroData,
    children: Header.propTypes.children
}
