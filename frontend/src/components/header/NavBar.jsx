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

  return (
      <header>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <PreviewCompatibleImage imageInfo={{ alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }} />
            </Link>
            <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} />
          </div>
          <NavMenu active={menuActive} navBarLinks={navBarLinks}/>
        </nav>
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

const NavBurger = ({target, active, setState}) => (
  <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => setState(!active)}>
    <span></span>
    <span></span>
    <span></span>
  </a>
)

const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

const NavMenu = ({active, navBarLinks}) => (
  <ul id="navigationBar" className={getClassName("navbar-menu", "is-active", active)}>
    <div className="navbar-start">
      {navBarLinks.map(generateNavBarTabs)}
    </div>
  </ul>
)

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
      />
    )
  }
}

const NavTab = ({title, link}) => {
  return (
    <li className="navbar-item has-dropdown">
      <Link to={link}>
        <button className="button" >
          {title}
        </button>
      </Link>
    </li>
  )
}

const NavDropdown = ({title, navItems}) => {
  const [active, setState] = useState(false)

  return (
    <li className={getClassName("navbar-item has-dropdown", "is-active", active)}>
      <div className="dropdown">
        <div className="dropdown-trigger">
          <OutsideClickHandler onOutsideClick={() => setState(false)}>
            <button className="button" onClick={() => setState(!active)}>
              {title}
            </button>
          </OutsideClickHandler>
        </div>
        <ul className={getClassName("navbar-dropdown", "is-hidden-touch", !active)}>
          {navItems.map((navItem, index) => <NavItem title={getTitle(navItem.pageTitle)} link={navItem.slug} key={index} />)}
        </ul>
      </div>
    </li>
  )
}

const NavItem = ({ title, link }) => (
  <li className="navbar-item">
    <Link to={link} className="dropdown-item">
      {title}
    </Link>
  </li>
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
  }).isRequired).isRequired
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
  )
}

NavBurger.propTypes = {
  target: PropTypes.string,
  active: PropTypes.bool,
  setState: PropTypes.func
}

NavBarDisplay.propTypes = {
  isPreview: PropTypes.bool
}
