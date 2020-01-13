import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

import { PreviewContext } from '../../util/context'
import { useLocalStorageSettings } from './Hooks'
import { CookieBannerLive } from './CookieBanner'


export const Analytics = () => (
    <PreviewContext.Consumer>
        {(isPreview) => isPreview ? null : <AnalyticsFragment />}
    </PreviewContext.Consumer>
)

const AnalyticsFragment = () => (
    <React.Fragment>
        <CookieBannerLive />
        <GoogleAnalytics />
    </React.Fragment>
)

// Analytics only runs in production mode, not build mode
const GoogleAnalytics = () => {
    const [localStorageEnabled] = useLocalStorageSettings()

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