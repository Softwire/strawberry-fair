import React, {useEffect, useState} from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'

import { PreviewContext } from '../util/context'

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

    useEffect(() => {
        setBannerActive(cookiesEnabled === null)
    }, [cookiesEnabled])

    if (bannerActive && !isPreview) {
        return (
            <OutsideClickHandler onOutsideClick={() => setBannerActive(false)}>
                <div className="cookies-banner notification">
                    <button className="delete"
                            onClick={() => setBannerActive(false)} />
                    Enable blah?
                    <footer>
                        <button className="button is-success"
                                onClick={() => setCookiesEnabled("1")}>
                            Yes
                        </button>
                        <button className="button"
                                onClick={() => setCookiesEnabled("0")}>
                            Nah
                        </button>
                    </footer>
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

AnalyticsFragment.propTypes = { isPreview: PropTypes.bool }
CookieBanner.propTypes = { isPreview: PropTypes.bool }
GoogleAnalytics.propTypes = { isPreview: PropTypes.bool }