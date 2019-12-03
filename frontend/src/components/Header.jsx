import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'


// SF-15
// Replace placeholder text with navigation menu
export const Header = () => (
    <header >
        <nav class="navbar">
            <a class="navbar-brand" href="/">
                <PreviewCompatibleImage imageInfo={logo} />
            </a>
            <ul class="navbar-menu">
                <NavbarLink href="/" title="About Us" />
                <NavbarLink href="/" title="Areas" />
                <NavbarLink href="/" title="Events" />
                <NavbarLink href="/" title="News" />
                <NavbarLink href="/" title="Traders" />
                <NavbarLink href="/" title="Support the Fair" />
                <NavbarLink href="/" title="Contact" />
            </ul>
        </nav>
    </header>
)

const logo = { alt: "Strawberry Fair Logo", image: "img/1-line-logo.png" }

const NavbarLink = ({href, title}) => (
    <li>
        <a href={href}>{title}</a>
    </li>
)