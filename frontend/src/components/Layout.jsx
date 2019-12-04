import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
<<<<<<< HEAD
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children}) => (
    <div className="container">
        <Header />
        <main>{children}</main>
=======

export const Layout = ({children}) => (
    <div>
        <Header />
            {children}
>>>>>>> b011f1608550683daa793e33d4164698745f299f
        <Footer />
    </div>
)