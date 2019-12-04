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


const NavMenu = ({children, active}) => {
    const getName = () => `navbar-menu ${active ? "is-active" : ""}`
    
    return (
        <ul id="navigationBar" className={getName()}>
            <div className="navbar-start">
                {children}
            </div>
        </ul>
    )
}


const NavBurger = ({target, active, setState}) => {
    const getName = () => `navbar-burger burger ${active ? "is-active" : ""}`

    return (
        <a className={getName()} data-target={target} onClick={() => setState(!active)}>
            <span></span>
            <span></span>
            <span></span>
        </a>
    )
}


const NavDropdown = ({title, children}) => {
    const [dropActive, setDropState] = useState(false)
    const getName = () => `navbar-item has-dropdown ${dropActive ? "is-active" : ""}`
    
    return (
        <li className={getName()}>
            <button className="navbar-link" onClick={() => setDropState(!dropActive)}>
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