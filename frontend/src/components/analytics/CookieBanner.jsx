import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { useLocalStorageSettings, useCookieBannerSettings } from './Hooks'


export const CookieBannerLive = () => (
    <CookieBanner localStorageHook={useLocalStorageSettings}
                  bannerActiveHook={useCookieBannerSettings}
                  data={cookieBannerGraphqlQuery().cookieBanner.nodes[0].frontmatter}
                  isFixedBottom={true} />
)

export const CookieBannerPreview = ({entry}) => (
    <CookieBanner localStorageHook={() => [null, () => null]}
                  bannerActiveHook={() => [true, () => null]} // dummy hooks generated for preview
                  data={entry.getIn(["data"]).toJS()}
                  isFixedBottom={false} />
)

const CookieBanner = ({localStorageHook, bannerActiveHook, data, isFixedBottom}) => {
    const [_, setLocalStorageEnabled] = localStorageHook()
    const [bannerActive, setBannerActive] = bannerActiveHook()

    if (bannerActive) {
        return (
            <OutsideClickHandler onOutsideClick={() => setBannerActive(false)}>
                <div className={`cookies-banner notification columns ${isFixedBottom ? "is-fixed-bottom" : ""}`}>
                    <button className="delete"
                            onClick={() => setBannerActive(false)}>
                    </button>
                    <div className="column is-1 cookie-image-column">
                        <img className="cookie-image" alt={data.image.alt} src={getCookieImage(data)} />
                    </div>
                    <div className="column">
                        <h2 className="is-size-4">{data.primaryText}</h2>
                        <p>{data.secondaryText}</p>
                    </div>
                    <div className="column cookie-buttons-column">
                        <div className="field is-grouped is-grouped-multiline cookie-buttons-field">
                            <button className="button is-success is-small cookie-button"
                                    onClick={() => setLocalStorageEnabled("1")}>
                                {data.buttons.accept}
                            </button>
                            <button className="button is-small cookie-button"
                                    onClick={() => setLocalStorageEnabled("0")}>
                                {data.buttons.decline}
                            </button>
                            <Link to="/privacy/" className="button is-small cookie-button">
                                {data.buttons.policy}
                            </Link>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }
    return null
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

const getCookieImage = (data) => data.image.src ? data.image.src : data.image.srcNode.publicURL

CookieBannerPreview.propTypes = {
    entry: PropTypes.object,
    widgetFor: PropTypes.func,
    widgetsFor: PropTypes.func,
    getAsset: PropTypes.func
}

CookieBanner.propTypes = {
    localStorageHook: PropTypes.func,
    bannerActiveHook: PropTypes.func,
    data: PropTypes.object
}