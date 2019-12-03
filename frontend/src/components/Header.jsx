import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'


export const Header = () => (
    <header >
        <nav className="navbar is-fixed-top">
            <div className="navbar-brand">
                <a className="navbar-burger burger" data-target="navigationBar">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <a className="navbar-item" href="/">
                    <PreviewCompatibleImage imageInfo={logo} />
                </a>
            </div>
            <NavMenu>
                {[
                    <NavCategory title="About Us">
                        {[
                            <NavLink href="/" title="Frequently Asked Questions" />,
                            <NavLink href="/" title="About the Fair" />,
                            <NavLink href="/" title="Organisation" />,
                            <NavLink href="/" title="History" />,
                            <NavLink href="/" title="Environment" />,
                            <NavLink href="/" title="Bucket Collection Partners" />,
                            <NavLink href="/" title="Get Involved" />
                        ]}
                    </NavCategory>,
                    <NavCategory href="/" title="Areas &amp; Events">
                        
                    </NavCategory>,
                    <NavCategory href="/" title="News">

                    </NavCategory>,
                    <NavCategory href="/" title="Traders">

                    </NavCategory>,
                    <NavCategory href="/" title="Support the Fair">

                    </NavCategory>,
                    <NavCategory href="/" title="Contact">

                    </NavCategory>
                ]}
            </NavMenu>
        </nav>
    </header>
)


/* Elements */

const logo = { alt: "Strawberry Fair Logo", image: "img/1-line-logo.png" }



/* Classes */

const NavMenu = ({children}) => (
    <ul id="navigationBar" className="navbar-menu">
        <div className="navbar-start">
            {children}
        </div>
    </ul>
)

const NavDropdown = ({title, children}) => (
    <li className="navbar-item has-dropdown">
        <button className="navbar-link">
            {title}
        </button>
        <ul className="navbar-dropdown">
            {children}
        </ul>
    </li>
)

const NavLink = ({href, title}) => (
    <li className="navbar-item">
        <a href={href}>{title}</a>
    </li>
)

const NavCategory = NavDropdown || NavLink