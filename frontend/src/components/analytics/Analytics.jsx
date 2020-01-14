import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

import { PreviewContext } from '../../util/context'
import { CookieBanner, getCookieBannerDataProps } from './CookieBanner'


export const Analytics = () => (
    <PreviewContext.Consumer>
        {(isPreview) => isPreview ? null : <AnalyticsFragment />}
    </PreviewContext.Consumer>
)

const AnalyticsFragment = () => {
    const [localStorageEnabled, setLocalStorageEnabled] = useState(undefined)
    const [bannerActive, setBannerActive] = useState(false)

    useEffect(() => {
        // Initialises localStorageEnabled flag and bannerActive flag
        if (localStorageEnabled === undefined) {
            let permission = localStorage.getItem("Analytics Permission")
            setLocalStorageEnabled(permission)
            setBannerActive(permission === null)
        }
        // Synchronises localStorage with localStorageEnabled flag
        else if (localStorageEnabled !== null) {
            localStorage.setItem("Analytics Permission", localStorageEnabled)
        }
    }, [localStorageEnabled])

    
    return (
        <React.Fragment>
            <CookieBanner {...getCookieBannerDataProps()}
                          bannerActive={bannerActive}
                          setBannerActive={setBannerActive}
                          setLocalStorageEnabled={setLocalStorageEnabled}
                          isFixedBottom={true}
                          />
            <GoogleAnalytics localStorageEnabled={localStorageEnabled} />
        </React.Fragment>
    )
}

// Analytics only runs in production mode, not build mode
const GoogleAnalytics = ({localStorageEnabled}) => {
    useEffect(() => {
        if (localStorageEnabled === "1") {
            if (!ReactGA.ga()) {
                ReactGA.initialize("UA-63562931-2") // for debugging, add argument { "debug": true }
            }
            ReactGA.pageview(location.pathname)
        }
    })
    return null
}

GoogleAnalytics.propTypes = { localStorageEnabled: PropTypes.string }