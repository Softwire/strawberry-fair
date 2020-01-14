import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, graphql, useStaticQuery } from 'gatsby'

export const CookieBanner = ({primaryText, secondaryText, image, buttons, bannerActive, setBannerActive, setLocalStorageEnabled, isFixedBottom}) => {
    if (bannerActive) {
        return (
            <OutsideClickHandler onOutsideClick={() => setBannerActive(false)}>
                <div className={`cookies-banner notification columns ${isFixedBottom ? "is-fixed-bottom" : ""}`}>
                    <button className="delete"
                            onClick={() => setBannerActive(false)}>
                    </button>
                    <div className="column is-1 cookie-image-column">
                        <img className="cookie-image" alt={image.alt} src={getCookieImage(image)} />
                    </div>
                    <div className="column">
                        <h2 className="is-size-4">{primaryText}</h2>
                        <p>{secondaryText}</p>
                    </div>
                    <div className="column cookie-buttons-column">
                        <div className="field is-grouped is-grouped-multiline cookie-buttons-field">
                            <button className="button is-success is-small cookie-button"
                                    onClick={() => {
                                                setLocalStorageEnabled("1")
                                                setBannerActive(false)
                                            }}>
                                {buttons.accept}
                            </button>
                            <button className="button is-small cookie-button"
                                    onClick={() => {
                                                setLocalStorageEnabled("0")
                                                setBannerActive(false)
                                            }}>
                                {buttons.decline}
                            </button>
                            <Link to="/privacy/" className="button is-small cookie-button">
                                {buttons.policy}
                            </Link>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }
    return null
}

export const getCookieBannerDataProps = () => {
    const query = cookieBannerGraphqlQuery()
    return query.cookieBanner.nodes[0].frontmatter
}

const cookieBannerGraphqlQuery = () => useStaticQuery(graphql`
    query cookieBannerQuery {
        cookieBanner: allMarkdownRemark(filter: {fields: {slug: {eq: "/privacy/cookies/"}}}) {
            nodes {
                frontmatter {
                    primaryText
                    secondaryText
                    image {
                        alt
                        srcNode {
                            publicURL
                        }
                    }
                    buttons {
                        accept
                        decline
                        policy
                    }
                }
            }
        }
    }
`)

const getCookieImage = (image) => image.src ? image.src : image.srcNode.publicURL

CookieBanner.propTypes = {
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    image: PropTypes.object,
    buttons: PropTypes.object,
    bannerActive: PropTypes.bool,
    setBannerActive: PropTypes.func,
    setLocalStorageEnabled: PropTypes.func,
    isFixedBottom: PropTypes.bool
}