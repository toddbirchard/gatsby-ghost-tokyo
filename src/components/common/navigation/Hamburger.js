import React from "react"
import { slide as Menu } from "react-burger-menu"
import { Link } from 'gatsby'
import { NavigationLinks } from '.'


const Hamburger = ({ data, navClass, props }) => {
    return (
    // Pass on our props
        <Menu {...props}>
            {data.map((navItem, i) => {
                if (navItem.url.match(/^\s?http(s?)/gi)) {
                    return <a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
                } else {
                    return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>
                }
            })}
        </Menu>)
}

export default Hamburger
