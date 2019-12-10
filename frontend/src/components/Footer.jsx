import React from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from './PreviewCompatibleImage'


export const Footer = () => (
    <footer className="footer">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Placeholder
                    </h3>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="tile is-content title">
                        Follow
                    </h3>
                    <div className="tile is-parent">
                        <Social href="https://www.facebook.com/strawberryfair" image="img/facebook-logo.png" alt="Facebook" />
                        <Social href="https://twitter.com/strawberry_fair" image="img/twitter-logo.png" alt="Twitter" />
                    </div>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Contact
                    </h3>
                    PO Box 1261 <br /> Cambridge <br /> CB1 0YJ <br /><br /><a href="mailto:enquiries@strawberry-fair.org.uk">enquiries@strawberry-fair.org.uk</a>
                </div>
            </div>
        </div>
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box content">
                    © Strawberry Fair 2017 | <a href="/"> Cookie policy</a>
                </div>
            </div>
        </div>
    </footer>
)

const Social = ({href, image, alt}) => (
    <div className="tile is-child">
        <a href={href} className="image is-48x48">
            <PreviewCompatibleImage imageInfo={{image: image, alt: alt}} />
        </a>
    </div>
)

Social.propTypes = {
    href: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string
}
