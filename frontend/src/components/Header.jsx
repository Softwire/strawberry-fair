import React, {useState, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import OutsideClickHandler from 'react-outside-click-handler'


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


const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`


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
                    {[
                        <NavDropdown title="About Us">
                            {[
                                <NavLink href="/" title="Frequently Asked Questions"/>,
                                <NavLink href="/" title="About the Fair"/>,
                                <NavLink href="/" title="Organisation"/>,
                                <NavLink href="/" title="History"/>,
                                <NavLink href="/" title="Environment"/>,
                                <NavLink href="/" title="Bucket Collection Partners"/>,
                                <NavLink href="/" title="Get Involved"/>
                            ]}
                        </NavDropdown>,
                        <NavDropdown href="/" title="Areas &amp; Events">
                            {[
                                <NavLink href="/calendar" title="Calendar" />
                            ]}
                        </NavDropdown>,
                        <NavDropdown href="/" title="News">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Traders">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Support the Fair">

                        </NavDropdown>,
                        <NavDropdown href="/" title="Contact">

                        </NavDropdown>
                    ]}
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


const NavBurger = ({target, active, setState}) => (
    <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => setState(!active)}>
        <span></span>
        <span></span>
        <span></span>
    </a>
)


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


const NavLink = ({href, title}) => (
    <li className="navbar-item">
        <a href={href} className="dropdown-item">
            {title}
        </a>
    </li>
)


const logo = { alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }