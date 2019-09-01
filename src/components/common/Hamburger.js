import React from "react"
import { slide as Menu } from "react-burger-menu"
import { NavigationLinks } from '.'

export default props => {
    return (
    // Pass on our props
    <Menu {...props}>
        <a className="menu-item" href="/">
            Home
        </a>

        <a className="menu-item" href="/burgers">
            Burgers
        </a>

        <a className="menu-item" href="/pizzas" displayName="pizzas">
            Pizzas
        </a>

        <a className="menu-item" href="/desserts">
            Desserts
        </a>
    </Menu>);
};
