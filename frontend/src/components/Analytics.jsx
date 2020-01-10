import React, {useEffect, useState} from 'react'
import ReactGA from 'react-ga'

export const Analytics = () => (
    <React.Fragment>
        <AnalyticsPermissionModal />
        <GoogleAnalytics />
    </React.Fragment>
)

const useAnalyticsPermissionSettings = () => {
    const [isEnabled, setIsEnabled] = useState(null)

    // Synchronises isEnabled flag with localStorage
    useEffect(() => {
        if (isEnabled !== localStorage.getItem("Analytics Permission")) {
            if (isEnabled === null) {
                setIsEnabled(localStorage.getItem("Analytics Permission"))
            }
            else {
                localStorage.setItem("Analytics Permission", isEnabled)
            }
        }
    })

    return [isEnabled, setIsEnabled]
}

const AnalyticsPermissionModal = () => {
    const [isEnabled, setIsEnabled] = useAnalyticsPermissionSettings()

    return (
        <div className={`modal ${(isEnabled === null) ? "is-active" : ""}`}>
            <div className="modal-background"></div>
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
                            onClick={() => setIsEnabled("1")}>
                        Yes
                    </button>
                    <button className="button"
                            onClick={() => setIsEnabled("0")}>
                        Nah
                    </button>
                </footer>
            </div>
        </div>
    )
}

// Analytics only runs in production mode, not build mode
const GoogleAnalytics = () => {
    const [isEnabled] = useAnalyticsPermissionSettings()

    useEffect(() => {
        if (isEnabled === "1") {
            if (!ReactGA.ga()) {
                ReactGA.initialize("UA-63562931-2") // for debugging, add argument { "debug": true }
            }
            ReactGA.pageview(location.pathname)
        }
    })

    return null
}