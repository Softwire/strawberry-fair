import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

import { PreviewContext } from '../../util/context'
import { CookieBanner, getCookieBannerDataProps } from './CookieBanner'


const googleAnalyticsProperty = "UA-63562931-2" // ID associated with new Strawberry Fair website and connected to the Fair's GA account

export const Analytics = () => (
    <PreviewContext.Consumer>
        {(isPreview) => isPreview ? null : <AnalyticsFragment />}
    </PreviewContext.Consumer>
)

const AnalyticsFragment = () => {
    const [analyticsEnabled, setAnalyticsEnabled] = useState(undefined)
    const [bannerActive, setBannerActive] = useState(false)

    useEffect(() => {
        // Initialises analyticsEnabled flag and bannerActive flag
        if (analyticsEnabled === undefined) {
            let permission = localStorage.getItem("Analytics Permission")
            setAnalyticsEnabled(permission)
            setBannerActive(permission === null)
        }
        // Synchronises localStorage with analyticsEnabled flag
        else if (analyticsEnabled !== null) {
            localStorage.setItem("Analytics Permission", analyticsEnabled)
        }
    }, [analyticsEnabled])

    if (bannerActive) {
        return (
            <React.Fragment>
                <CookieBanner {...getCookieBannerDataProps()}
                              setBannerActive={setBannerActive}
                              setAnalyticsEnabled={setAnalyticsEnabled}
                              isFixedBottom={true}
                              />
                <GoogleAnalytics analyticsEnabled={analyticsEnabled} />
            </React.Fragment>
        )
    }
    else {
        return <GoogleAnalytics analyticsEnabled={analyticsEnabled} />
    }
}

// Analytics are disabled on all production builds
const GoogleAnalytics = ({analyticsEnabled}) => {
    useEffect(() => {
        if (analyticsEnabled === "1") {
            if (!ReactGA.ga()) {
                ReactGA.initialize(googleAnalyticsProperty) // for debugging, add argument { "debug": true }
            }
            ReactGA.pageview(location.pathname)
        }
    })
    return null
}

GoogleAnalytics.propTypes = { analyticsEnabled: PropTypes.string }