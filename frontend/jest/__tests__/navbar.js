import React from 'react'

import { getNavBarLinksFromGraphqlData, NavBarDisplay } from '../../src/components/header/NavBar'
import { mount } from 'enzyme'
import { navbarQuery } from '../__mocks__/navbar-query'

describe ("Navbar tests", () => {
    
    let navbar
    const topLevelItems = () => navbar.findWhere(node => node.is(".navbar-item") && node.parent().is(".navbar-end"))
    const topLinks = () => navbar.find(".navbar-link")
    const dropdowns = () => navbar.find(".navbar-dropdown")
    const dropLinks = () => navbar.find(".dropdown-item")
    
    beforeEach(() => {
        navbar = mount(<NavBarDisplay links={getNavBarLinksFromGraphqlData(navbarQuery)} />)
    })
    
    test("Dropdown menus have is-hidden-touch property by default", () => {        
        const areHidden = dropdowns().map(drop => drop.is(".is-hidden-touch"))
        expect(areHidden).not.toContain(false)
    })

    test("Dropdown menu classes change on click", () => {
        topLinks().at(0).simulate("click")
        const dropdown = dropdowns().at(0)
        expect(dropdown.is(".is-hidden-touch")).toBe(false)
    })

    test("Dropdown menus are populated with correct link names", () => {
        const linkNames = dropdowns().at(0).children().map(node => node.text())
        expect(linkNames).toStrictEqual(["About Item", "Flying Pig Stage", "Full width content page", "Hatters Cafe", "Hatters Cafe"])
    })

    test("Dropdown links render correctly", () => {
        const link = dropLinks().at(0)
        expect(link.html()).toBe('<a class="dropdown-item" href="/about/about-item/">About Item</a>')
    })

    test("Navbar headings without subsections do not render a dropdown", () => {
        const news = topLevelItems().at(2)
        expect(news.children().find("navbar-dropdown")).toHaveLength(0)
    })
})