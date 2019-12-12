import React from 'react'

export const PreviewContext = React.createContext(false)

export const previewContextWrapper = (value, children) => (
    <PreviewContext.Provider value={value}>
        {children}
    </PreviewContext.Provider>
)