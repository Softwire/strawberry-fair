import React, {useState} from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'


export const Header = () => {
    
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


const logo = { alt: "Strawberry Fair Logo", image: "img/1-line-logo.png" }


const getName = (baseName, active) => `${baseName} ${active ? "is-active" : ""}`


const NavMenu = ({children, active}) => (
    <ul id="navigationBar" className={getName("navbar-menu", active)}>
        <div className="navbar-start">
            {children}
        </div>
    </ul>
)


const NavBurger = ({target, active, setState}) => (
    <a className={getName("navbar-burger burger", active)} data-target={target} onClick={() => setState(!active)}>
        <span></span>
        <span></span>
        <span></span>
    </a>
)


const NavDropdown = ({title, children}) => {
    const [active, setState] = useState(false)

    return (
        <li className={getName("navbar-item has-dropdown", active)}>
            <button className="navbar-link" onClick={() => setState(!active)}>
                {title}
            </button>
            <ul className="navbar-dropdown">
                {children}
            </ul>
        </li>
    )
}


const NavLink = ({href, title}) => (
    <li className="navbar-item">
        <a href={href}>
            {title}
        </a>
    </li>
)