import React, {useEffect, useState} from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { PreviewContext } from '../util/context'
import PreviewCompatibleImage from './PreviewCompatibleImage'

export const Analytics = () => (
    <PreviewContext.Consumer>
        {(value) => <AnalyticsFragment isPreview={value} />}
    </PreviewContext.Consumer>
)

const AnalyticsFragment = ({isPreview}) => (
    <React.Fragment>
        <CookieBanner isPreview={isPreview} />
        <GoogleAnalytics isPreview={isPreview}/>
    </React.Fragment>
)

const useCookieSettings = () => {
    const [cookiesEnabled, setCookiesEnabled] = useState(undefined)

    // Synchronises cookiesEnabled flag with localStorage
    useEffect(() => {
        if (cookiesEnabled === undefined) {
            setCookiesEnabled(localStorage.getItem("Analytics Permission"))
        }
        else if (cookiesEnabled !== null) {
            localStorage.setItem("Analytics Permission", cookiesEnabled)
        }
    })

    return [cookiesEnabled, setCookiesEnabled]
}

const CookieBanner = ({isPreview}) => {
    const [cookiesEnabled, setCookiesEnabled] = useCookieSettings()
    const [bannerActive, setBannerActive] = useState(cookiesEnabled)
    const data = getCookieBannerData()

    useEffect(() => {
        setBannerActive(cookiesEnabled === null)
    }, [cookiesEnabled])

    if (bannerActive && !isPreview) {
        return (
            <OutsideClickHandler onOutsideClick={() => setBannerActive(false)}>
                <div className="cookies-banner notification">
                    <button className="delete"
                            onClick={() => setBannerActive(false)} />
                    <p>
                        {data.primaryText}
                    </p>
                    <p>
                        {data.secondaryText}
                    </p>
                    <PreviewCompatibleImage imageInfo={data.image} />
                    <button className="button is-success"
                            onClick={() => setCookiesEnabled("1")}>
                        {data.buttons.accept}
                    </button>
                    <button className="button is-danger"
                            onClick={() => setCookiesEnabled("0")}>
                        {data.buttons.decline}
                    </button>
                    <button className="button">
                        {data.buttons.policy}
                    </button>
                    <Link to="/privacy">
                        blah
                    </Link>
                </div>
            </OutsideClickHandler>
        )
    }
    return null
}

// Analytics only runs in production mode, not build mode
const GoogleAnalytics = ({isPreview}) => {
    const [cookiesEnabled] = useCookieSettings()

    useEffect(() => {
        if (cookiesEnabled === "1" && !isPreview) {
            if (!ReactGA.ga()) {
                ReactGA.initialize("UA-63562931-2") // for debugging, add argument { "debug": true }
            }
            ReactGA.pageview(location.pathname)
        }
    })

    return null
}

const getCookieBannerData = () => {
    const data = cookieBannerQuery()
    return data.cookieBanner.nodes[0].frontmatter
}

const cookieBannerQuery = () => useStaticQuery(graphql`
    query cookieBannerQuery {
        cookieBanner: allMarkdownRemark(filter: {fields: {slug: {eq: "/privacy/cookies/"}}}) {
            nodes {
                frontmatter {
                    primaryText
                    secondaryText
                    ...ImageFluidFragment
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

AnalyticsFragment.propTypes = { isPreview: PropTypes.bool }
CookieBanner.propTypes = { isPreview: PropTypes.bool }
GoogleAnalytics.propTypes = { isPreview: PropTypes.bool }