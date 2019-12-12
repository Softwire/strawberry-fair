import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import { childImageSharpValidator } from './validators'
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

Header.propTypes = {
    revolvingHero: PropTypes.objectOf(FixedHero.propTypes.info),
    fixedHero: FixedHero.propTypes.info     // Can reuse these two for validation
}
