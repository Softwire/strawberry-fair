import React, {useEffect, useState} from 'react'

export const Analytics = () => (
    <React.Fragment>
        <AnalyticsPermissionPopUp />
        <GoogleAnalyticsInitialisation />
    </React.Fragment>
)

const useAnalyticsPermissionSettings = () => {
    const [isEnabled, setIsEnabled] = useState(null)

    useEffect(() => {
        if (isEnabled === null) {
            setIsEnabled(localStorage.getItem("Analytics Permission"))
        }
        else if (isEnabled !== localStorage.getItem("Analytics Permission")) {
            localStorage.setItem("Analytics Permission", isEnabled)
        }
    })

    return [isEnabled, setIsEnabled]
}

const AnalyticsPermissionPopUp = () => {
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
                    <button className="button is-failure"
                            onClick={() => setIsEnabled("0")}>
                        Nah
                    </button>
                </footer>
            </div>
        </div>
    )
}

const GoogleAnalyticsInitialisation = () => {
    const [isEnabled] = useAnalyticsPermissionSettings()

    if (isEnabled === "1") {
        // Enable G.A.
        return null
    }
    return null
}