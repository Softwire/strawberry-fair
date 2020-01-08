import React, {useEffect, useState} from 'react'

export const Analytics = () => (
    <React.Fragment>
        <AnalyticsPermissionPopUp />
        <GoogleAnalyticsInitialisation />
    </React.Fragment>
)

const useAnalyticsPermissionSettings = () => {
    const [isEnabled, setIsEnabled] = useState(localStorage.getItem("Analytics Permission"))

    useEffect(() => {
        if (isEnabled !== localStorage.getItem("Analytics Permission")) {
            localStorage.setItem("Analytics Permission", isEnabled)
        }
    })

    return [isEnabled, setIsEnabled]
}

const AnalyticsPermissionPopUp = () => {
    const [isEnabled, setIsEnabled] = useAnalyticsPermissionSettings()

    return null
    // return pop up, whose buttons call setIsEnabled with "0" or "1"
}

const GoogleAnalyticsInitialisation = () => {
    const [isEnabled] = useAnalyticsPermissionSettings()

    if (isEnabled === "1") {
        // Enable G.A.
        return null
    }
    else {
        // Perhaps we should check if GA is enabled and disable it if necessary?
        return null
    }
}