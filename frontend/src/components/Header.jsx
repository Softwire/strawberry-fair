import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage, { childImageSharpValidator } from './PreviewCompatibleImage'
import OutsideClickHandler from 'react-outside-click-handler'

const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

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
        ]),
        alt: PropTypes.string
    }),
    children: PropTypes.node
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

RevolvingHero.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(FixedHero.propTypes)),  // Can reuse this code, so do
    children: PropTypes.node
}

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

Header.propTypes = {
    revolvingHero: PropTypes.objectOf(FixedHero.propTypes.info),
    fixedHero: FixedHero.propTypes.info     // Can reuse these two for validation
}

const NavBar = () => {
    
    const [menuActive, setMenuState] = useState(false)

    return (
        <header>
            <nav className="navbar is-fixed-top">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <PreviewCompatibleImage imageInfo={logo} />
                    </a>
                    <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} />
                </div>
                <NavMenu active={menuActive}>
                        <NavDropdown title="About Us">
                            <NavLink href="/" title="Frequently Asked Questions"/>,
                            <NavLink href="/" title="About the Fair"/>,
                            <NavLink href="/" title="Organisation"/>,
                            <NavLink href="/" title="History"/>,
                            <NavLink href="/" title="Environment"/>,
                            <NavLink href="/" title="Bucket Collection Partners"/>,
                            <NavLink href="/" title="Get Involved"/>
                        </NavDropdown>,
                        <NavDropdown href="/" title="Areas &amp; Events">
                            <NavLink href="/calendar" title="Calendar" />
                        </NavDropdown>,
                        <NavDropdown href="/" title="News">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Traders">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Support the Fair">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Contact">

                        </NavDropdown>
                </NavMenu>
            </nav>
        </header>
    )
}


const NavMenu = ({children, active}) => (
    <ul id="navigationBar" className={getClassName("navbar-menu", "is-active", active)}>
        <div className="navbar-start">
            {children}
        </div>
    </ul>
)

NavMenu.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool
}

const NavBurger = ({target, active, setState}) => (
    <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => setState(!active)}>
        <span></span>
        <span></span>
        <span></span>
    </a>
)

NavBurger.propTypes = {
    target: PropTypes.string,
    active: PropTypes.bool,
    setState: PropTypes.func
}

const NavDropdown = ({title, children}) => {
    const [active, setState] = useState(false)

    return (
        <li className={getClassName("navbar-item has-dropdown", "is-active", active)}>
            <div className="dropdown">
                <div className="dropdown-trigger">
                    <OutsideClickHandler onOutsideClick={() => setState(false)}>
                        <button className="button" onClick={() => setState(!active)}>
                            {title}
                        </button>
                    </OutsideClickHandler>
                </div>
                <ul className={getClassName("navbar-dropdown", "is-hidden-touch", !active)}>
                    {children}
                </ul>
            </div>
        </li>
    )
}

NavDropdown.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

const NavLink = ({href, title}) => (
    <li className="navbar-item">
        <a href={href} className="dropdown-item">
            {title}
        </a>
    </li>
)

NavLink.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string
}

const logo = { alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }