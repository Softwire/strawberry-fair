import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'

export const CookieBanner = ({primaryText, secondaryText, image, buttons, setBannerActive, setAnalyticsEnabled, isFixedBottom}) => (
    <div>
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
                                        setAnalyticsEnabled("1")
                                        setBannerActive(false)
                                    }}>
                        {buttons.accept}
                    </button>
                    <button className="button is-small cookie-button"
                            onClick={() => {
                                        setAnalyticsEnabled("0")
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
    </div>
)

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
    setBannerActive: PropTypes.func,
    setAnalyticsEnabled: PropTypes.func,
    isFixedBottom: PropTypes.bool
}