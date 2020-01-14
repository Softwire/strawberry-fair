import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { PreviewContext } from '../../util/context.jsx'
import { getNavbarLogo } from './getNavbarLogo'

import navBarPreviewLinks from '../../data/navBarPreviewLinks'

const separator = '/'
const navBarTabs = ['About Us', 'Areas & Events', 'News', 'Traders', 'Support the Fair', 'Contact']
const titleToLinkMap = {
  News: {
    link: '/news/',
    title: 'News',
    noDropdown: true,
  },
  Contact: {
    link: '/contact',
    title: 'Contact Us',
    noDropdown: true,
  }
}

const NavBar = (data) => (
  <PreviewContext.Consumer>
    {value => <NavBarQueryWrapper isPreview={value} CMSInput={data} />}
  </PreviewContext.Consumer>
  )

export default NavBar

const NavBarQueryWrapper = ({isPreview, CMSInput}) => {
  let logo = isPreview ? <img alt="Strawberry Fair logo" src="/img/1-line-logo.png" width="280" /> : <Img fixed={getNavbarLogo()} alt="Strawberry Fair logo" />
  let isFixedTop = isPreview ? false : true
  let links = isPreview ? (Object.keys(CMSInput).length > 0 ? getPreviewLinksFromCMSInput(CMSInput) : navBarPreviewLinks) : getNavBarLinksFromGraphqlData(navBarQuery())

  return <NavBarDisplay links={links} logo={logo} isFixedTop={isFixedTop} />
}

export const NavBarDisplay = ({links, logo, isFixedTop}) => {
  const [menuActive, setMenuState] = useState(false)

  // List holding which dropdowns are open (on mobile)
  const [dropdownsActive, setDropdownsActive] = useState(Array.from(links).fill(false))

  // Function to collapse all child dropdowns
  const collapseAll = () => {
    setDropdownsActive(dropdownsActive.fill(false))
  }

  return (
      <header>
        <OutsideClickHandler onOutsideClick={() => {collapseAll(); setMenuState(false)}} display="contents">
          <nav className={`navbar ${isFixedTop ? 'is-fixed-top' : ''}`}>
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                {logo}
              </Link>
              <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} collapseAll={collapseAll} />
            </div>
            <NavMenu active={menuActive} navBarLinks={links} collapseAll={collapseAll} dropdownsActive={dropdownsActive} setDropdownsActive={setDropdownsActive} />
          </nav>
        </OutsideClickHandler>
      </header>
  )
}

const navBarQuery = () => useStaticQuery(graphql`
  query navBarQuery {
    navBarInfo: allMarkdownRemark(filter: {fields: {slug: {regex: "$//navbar//", ne: "/navbar/"}}}) {
      edges {
        node {
          frontmatter {
            title 
            pageTitles {
              pageTitle
            }
          }
        }
      }
    }
    allPages: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`)

export const getNavBarLinksFromGraphqlData = (data) => {
  let pageTitleToSlugMap = {} 
  data.allPages.edges.forEach(edge => pageTitleToSlugMap[edge.node.frontmatter.title] = edge.node.fields.slug)
  data.navBarInfo.edges.forEach(edge => addSlugs(pageTitleToSlugMap, edge))
  return generateLinks(navBarTabs, titleToLinkMap, data.navBarInfo.edges)
}

const addSlugs = (map, graphqlEdge) => {
  graphqlEdge.node.frontmatter.pageTitles.forEach(o => o.slug = map[getTitle(o.pageTitle)])
}

const getTitle = (pageTitle) => pageTitle.split(separator)[1]

const generateLinks = (navBarTabs, titleToLinkMap, graphqlEdges) => {
  return navBarTabs.map(tabName => {
      const associatedEdge = graphqlEdges.find(edge => edge.node.frontmatter.title === tabName)
      return associatedEdge || titleToLinkMap[tabName] || undefined
    }).filter(link => link !== undefined)
}

const NavBurger = ({target, active, setState, collapseAll}) => (
  <a className={getClassName("navbar-burger burger is-large","is-active", active)} data-target={target} onClick={() => {
    if (active) {
      // If we are closing the navbar, collapse all the dropdowns
      collapseAll()
    }
    setState(!active)
  }}>
    <span></span>
    <span></span>
    <span></span>
  </a>
)

const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

const NavMenu = ({active, navBarLinks, dropdownsActive, setDropdownsActive}) => {
  const generateNavBarTabs = (tab, tabIndex) => {
    if(tab.noDropdown) {
      return (
        <NavTab link={tab.link} title={tab.title} key={tabIndex} />
      )
    } else {
      return (
        <NavDropdown 
          title={tab.node.frontmatter.title}
          key={tabIndex}
          navItems={tab.node.frontmatter.pageTitles}
          active={dropdownsActive[tabIndex]}
          toggleFunc={() => {
            let newDropdownsActive = Array.from(dropdownsActive)
            newDropdownsActive[tabIndex] = !newDropdownsActive[tabIndex]
            setDropdownsActive(newDropdownsActive)
          }}
        />
      )
    }
  }

  return (
    <div id="navigationBar" className={getClassName("navbar-menu", "is-active", active)}>
      <div className="navbar-end">
        {navBarLinks.map(generateNavBarTabs)}
      </div>
    </div>
  )
}

const NavTab = ({title, link}) => {
  return (
    <Link to={link} className="navbar-item">
      {title}
    </Link>
  )
}

const NavDropdown = ({title, navItems, active, toggleFunc}) => {
  return (
    <div className="navbar-item has-dropdown is-hoverable" onClick={toggleFunc}>
      <a className="navbar-link">
        {title}
      </a>
      <div className={`navbar-dropdown ${active ? "" : "is-hidden-touch"}`}>
        {navItems.map((navItem, index) => <NavItem title={getTitle(navItem.pageTitle)} link={navItem.slug} key={index} />)}
      </div>
    </div>
  )
}

const NavItem = ({ title, link }) => (
  <div className="navbar-item">
    <Link to={link} className="dropdown-item">
      {title}
    </Link>
  </div>
)

const getPreviewLinksFromCMSInput = (CMSInput) => (
  [{
    node: {
      frontmatter: {
        title: CMSInput.title,
        pageTitles: CMSInput.pageTitles.map(page => {
          if(!page.pageTitle) page.pageTitle = ""
          page.slug="/"
          return page
        })
      }
    }
  }]
)


NavItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
}

NavDropdown.propTypes = {
  title: PropTypes.string,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired).isRequired,
  active: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired
}

NavTab.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
}

NavMenu.propTypes = {
  active: PropTypes.bool,
  navBarLinks: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          pageTitles: NavDropdown.propTypes.navItems,
          title: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      noDropdown: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
   ]).isRequired
  ),
  dropdownsActive: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setDropdownsActive: PropTypes.func.isRequired
}

NavBurger.propTypes = {
  target: PropTypes.string,
  active: PropTypes.bool,
  setState: PropTypes.func,
  collapseAll: PropTypes.func.isRequired
}

NavBarQueryWrapper.propTypes = {
  isPreview: PropTypes.bool,
  CMSInput: PropTypes.object
}

NavBarDisplay.propTypes = {
  links: NavMenu.propTypes.navBarLinks,
  logo: PropTypes.element,
  isFixedTop: PropTypes.bool
}
