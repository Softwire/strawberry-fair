import React, { useState } from 'react'

import PreviewCompatibleImage from '../PreviewCompatibleImage'
import OutsideClickHandler from 'react-outside-click-handler'
import { useStaticQuery, graphql, Link } from 'gatsby'

const NavBar = () => {
  const [menuActive, setMenuState] = useState(false)
    
  const data = useStaticQuery(graphql`
    query navBarQuery {
      navBar: allMarkdownRemark(filter: {fields: {slug: {regex: "$//navbar//", ne: "/navbar/"}}}) {
        edges {
          node {
            frontmatter {
              title 
              pageTitles
            }
          }
        }
      }
    }`
  )

  return (
    <header>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <a className="navbar-item" to="/">
            <PreviewCompatibleImage imageInfo={{ alt: "Strawberry Fair Logo", image: "/img/1-line-logo.png" }} />
          </a>
          <NavBurger target="navigationBar" active={menuActive} setState={setMenuState} />
        </div>
        {generateNavMenu(data.navBar.edges, menuActive)}
      </nav>
    </header>
  )
}

const generateNavMenu = (navBar, menuActive) => (
  <NavMenu active={menuActive}>
    {navBar.map(generateNavDropdown)}
  </NavMenu>
)

const generateNavDropdown = (tab, tabIndex) => (
  <NavDropdown title={tab.node.frontmatter.title} key={tabIndex}>
    {tab.node.frontmatter.pageTitles.map(generateNavItems)}
  </NavDropdown>
)

const generateNavItems = (item, itemIndex) => <NavLink to={sanitizeSlug(item)} title={item.split('/')[1]} key={itemIndex}/>

export default NavBar

const NavBurger = ({target, active, setState}) => (
  <a className={getClassName("navbar-burger burger","is-active", active)} data-target={target} onClick={() => setState(!active)}>
    <span></span>
    <span></span>
    <span></span>
  </a>
)

const getClassName = (baseName, toggleName, active) => `${baseName} ${active ? toggleName : ""}`

const NavMenu = ({children, active}) => (
  <ul id="navigationBar" className={getClassName("navbar-menu", "is-active", active)}>
    <div className="navbar-start">
      {children}
    </div>
  </ul>
)

const NavDropdown = ({title, children}) => {
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
          {children}
        </ul>
      </div>
    </li>
  )
}

const NavLink = ({to, title}) => (
  <li className="navbar-item">
    <Link to={to} className="dropdown-item">
      {title}
    </Link>
  </li>
)

// TODO: Improve slug sanitiser. Possible way is to take 
const sanitizeSlug = slug => slug.toLocaleLowerCase().replace(/\s+/g, '-')