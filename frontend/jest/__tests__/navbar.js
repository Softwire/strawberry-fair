import React from 'react'

import { getNavBarLinksFromGraphqlData, NavBarDisplay } from '../../src/components/header/NavBar'
import { mount } from 'enzyme'
import { navbarQuery } from '../__mocks__/navbar-query'

describe ("Navbar tests", () => {

    let navbar
    beforeEach(() => {
        navbar = mount(<NavBarDisplay links={getNavBarLinksFromGraphqlData(navbarQuery)} />)
    })

    test("Dropdown menus closed on loading", () => {
        const dropdowns = navbar.find(".navbar-dropdown")
        const areVisible = dropdowns.map((node) => node.hasClass("is-hidden-touch"))
        expect(areVisible).not.toContain(false)
    })

    test("Dropdown menus open when clicked", async () => {
        const dropButton = navbar.find(".navbar-item.has-dropdown").at(0)
        const dropdown = navbar.find(".navbar-dropdown").at(0)
        dropButton.simulate("click")
        await expect(dropdown.hasClass("is-hidden-touch")).toBe(false)
    })
})