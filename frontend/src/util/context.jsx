import React from 'react'
import PropTypes from 'prop-types'

export const PreviewContext = React.createContext(false)

export const PreviewContextWrapper = ({value, children}) => (
    <PreviewContext.Provider value={value}>
        {children}
    </PreviewContext.Provider>
)

PreviewContextWrapper.propTypes = {
    value: PropTypes.bool,
    children: PropTypes.node
}
