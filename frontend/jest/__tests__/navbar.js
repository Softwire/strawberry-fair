import { getNavBarLinksFromGraphqlData, NavBarDisplay } from '../../src/components/header/NavBar'
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

    test("Navbar renders", () => {
        expect(navbar).toExist()
    })
    
    test("Dropdown menus have is-hidden-touch property by default", () => {        
        dropdowns().forEach((drop) => {
            expect(drop).toHaveClassName("is-hidden-touch")
        })
    })

    test("Dropdown menu classes change on click", () => {
        const dropClassesBeforeClick = dropdowns().at(0).getDOMNode().className
        topLinks().at(0).simulate("click")
        const dropClassesAfterClick = dropdowns().at(0).getDOMNode().className
        expect(dropClassesBeforeClick).not.toBe(dropClassesAfterClick)
    })

    test("Dropdown menus are populated with correct link names", () => {
        const linkNames = dropdowns().at(0).children().map(node => node.text())
        expect(linkNames).toStrictEqual(["About Item", "Flying Pig Stage", "Full width content page", "Hatters Cafe", "Hatters Cafe"])
    })

    // The .toHaveHTML() matcher is used here because Gatsby Links are mocked and cannot be queried by Enzyme in the usual way
    // More specific and descriptive matchers should be preferred
    test("Dropdown links render correctly", () => {
        const link = dropLinks().at(0)
        expect(link).toHaveHTML('<a class="dropdown-item" href="/about/about-item/">About Item</a>')
    })

    test("Navbar headings without subsections do not render a dropdown", () => {
        const news = topLevelItems().at(2)
        expect(news.children()).not.toContainMatchingElement(".navbar-dropdown")
    })
})