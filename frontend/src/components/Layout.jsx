import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import '../styling/styles.sass'

export const Layout = ({children}) => (
    <div>
        <Header />
            {children}
        <Footer />
    </div>
)