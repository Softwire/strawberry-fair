import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { graphql, Link, useStaticQuery } from 'gatsby'

import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { PreviewContext } from '../../util/context.jsx'

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

const NavBar = () => (
  <PreviewContext.Consumer>
    {value => <NavBarDisplay isPreview={value} />}
  </PreviewContext.Consumer>
)

export default NavBar

const NavBarDisplay = ({isPreview}) => {
  const [menuActive, setMenuState] = useState(false)
  const navBarLinks = isPreview ? navBarPreviewLinks : getNavBarLinksFromGraphqlData()

  // List holding which dropdowns are open (on mobile)
  const [dropdownsActive, setDropdownsActive] = useState(Array.from(navBarLinks).fill(false))

  // Function to collapse all child dropdowns
  const collapseAll = () => {
    setDropdownsActive(dropdownsActive.fill(false))
  }

  return (
      <header>
        <OutsideClickHandler onOutsideClick={() => {collapseAll(); setMenuState(false)}} display="contents">
          <nav className="navbar">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <PreviewCompatibleImage imageInfo={{ alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }} />
              </Link>
              <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} collapseAll={collapseAll} />
            </div>
            <NavMenu active={menuActive} navBarLinks={navBarLinks} collapseAll={collapseAll} dropdownsActive={dropdownsActive} setDropdownsActive={setDropdownsActive} />
          </nav>
        </OutsideClickHandler>
      </header>
  )
}

const getNavBarLinksFromGraphqlData = () => {
  const data = useStaticQuery(graphql`
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
    }`)

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
  <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => {
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
      <div className="navbar-start">
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

NavBarDisplay.propTypes = {
  isPreview: PropTypes.bool
}
