import React from "react"
import { slide as Menu } from "react-burger-menu"
import { Link } from 'gatsby'

const Hamburger = ({ data, navClass }) => (
  // Pass on our props
  <Menu right width={ `100%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` }>
    {data.map((navItem, i) => {
      if (navItem.url.match(/^\s?http(s?)/gi)) {
        return <a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
      } else {
        return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>
      }
    })}
  </Menu>)

export default Hamburger
