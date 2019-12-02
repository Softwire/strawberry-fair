import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = (props) => (
    <div>
        <Header />
            {props.children}
        <Footer />
    </div>
)