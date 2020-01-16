import { useState, useEffect } from 'react'

const bulmaTabletWidthMixin = 769

export const useViewportWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    
    return width;
}

export const viewportIsMobile = () => useViewportWidth() <= bulmaTabletWidthMixin