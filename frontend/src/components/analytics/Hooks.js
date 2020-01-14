import {useEffect, useState} from 'react'


export const useLocalStorageSettings = () => {
    const [localStorageEnabled, setLocalStorageEnabled] = useState(undefined)

    // Synchronises localStorageEnabled flag with localStorage
    useEffect(() => {
        if (localStorageEnabled === undefined) {
            setLocalStorageEnabled(localStorage.getItem("Analytics Permission"))
        }
        else if (localStorageEnabled !== null) {
            localStorage.setItem("Analytics Permission", localStorageEnabled)
        }
    }, [localStorageEnabled])

    return [localStorageEnabled, setLocalStorageEnabled]
}

export const useCookieBannerSettings = () => {
    const [localStorageEnabled] = useLocalStorageSettings()
    const [bannerActive, setBannerActive] = useState(false)

    useEffect(() => {
        setBannerActive(localStorageEnabled === null)
    }, [localStorageEnabled])

    return [bannerActive, setBannerActive]
}