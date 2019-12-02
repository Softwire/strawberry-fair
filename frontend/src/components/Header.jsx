import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'


export const Header = (props) => (
    <header>
        <nav>
            <a href="/">
                <PreviewCompatibleImage imageInfo={logo} />
            </a>
            <span>About Us | Areas &amp; Events | News | Traders | Support the Fair | Contact</span>
        </nav>
    </header>
)

const logo = { alt: "Strawberry Fair Logo", image: "img/1-line-logo.png" }
