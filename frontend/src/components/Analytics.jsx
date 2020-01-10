import React, {useEffect, useState} from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

import { PreviewContext } from '../util/context'

export const Analytics = () => (
    <React.Fragment>
        <AnalyticsPermissionModal />
        <GoogleAnalyticsWrapper />
    </React.Fragment>
)

const useAnalyticsPermissionSettings = () => {
    const [analyticsEnabled, setAnalyticsEnabled] = useState(undefined)

    // Synchronises analyticsEnabled flag with localStorage
    useEffect(() => {
        if (analyticsEnabled === undefined) {
            setAnalyticsEnabled(localStorage.getItem("Analytics Permission"))
        }
        else if (analyticsEnabled !== null) {
            localStorage.setItem("Analytics Permission", analyticsEnabled)
        }
    })

    return [analyticsEnabled, setAnalyticsEnabled]
}

const AnalyticsPermissionModal = () => {
    const [analyticsEnabled, setAnalyticsEnabled] = useAnalyticsPermissionSettings()
    const [modalActive, setModalActive] = useState(analyticsEnabled)

    useEffect(() => {
        setModalActive(analyticsEnabled === null)
    }, [analyticsEnabled])

    return (
        <div className={`modal ${(modalActive) ? "is-active" : ""}`}>
            <div className="modal-background"
                 onClick={() => setModalActive(false)} />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                </header>
                <section className="modal-card-body">
                    <p>
                        Enable blah?
                    </p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success"
                            onClick={() => setAnalyticsEnabled("1")}>
                        Yes
                    </button>
                    <button className="button"
                            onClick={() => setAnalyticsEnabled("0")}>
                        Nah
                    </button>
                </footer>
            </div>
        </div>
    )
}

const GoogleAnalyticsWrapper = () => (
    <PreviewContext.Consumer>
        {(value) => <GoogleAnalytics isPreview={value} />}
    </PreviewContext.Consumer>
)

// Analytics only runs in production mode, not build mode
const GoogleAnalytics = ({isPreview}) => {
    const [analyticsEnabled] = useAnalyticsPermissionSettings()

    useEffect(() => {
        if (analyticsEnabled === "1" && !isPreview) {
            if (!ReactGA.ga()) {
                ReactGA.initialize("UA-63562931-2") // for debugging, add argument { "debug": true }
            }
            ReactGA.pageview(location.pathname)
        }
    })

    return null
}

GoogleAnalytics.propTypes = { isPreview: PropTypes.bool }