import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'


export const Footer = () => (
    <footer className="footer">
        <nav>
            <span id="social-media">
                <Social href="https://www.facebook.com/strawberryfair" image="img/facebook-logo.png" alt="Facebook" />
                <Social href="https://twitter.com/strawberry_fair" image="img/twitter-logo.png" alt="Twitter" />
            </span>
            <p>
                <a href="/">Cookie policy</a>
            </p>
            <p>
                © Strawberry Fair 2017 
            </p>
            <p>
                PO BOX 1261 <br /> Cambridge <br /> CB1 0YJ
            </p>
            <p>
                <a href="mailto:enquiries@strawberry-fair.org.uk">enquiries@strawberry-fair.org.uk</a>
            </p>
        </nav>
    </footer>
)

const Social = ({href, image, alt}) => (
    <a href={href}>
        <PreviewCompatibleImage imageInfo={{image: image, alt: alt}} />
    </a>
)