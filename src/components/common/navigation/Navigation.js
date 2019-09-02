import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Hamburger, NavigationLinks } from '.'


/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/

const Navigation = ({ data, navClass, logo, isHome }) => (
    <>
        <nav className="navigation">
            <Link to="/" className="nav-logo"><img src={logo} alt="logo" /></Link>
            <div className="navigation-links">
                <NavigationLinks data={data} navClass={navClass} />
            </div>
        </nav>
        { isHome ? null : <Hamburger right data={data} navClass={navClass} />}

    </>
)

Navigation.defaultProps = {
    navClass: `site-nav-item`,
    navType: `home-nav`,
}

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    logo: PropTypes.string.isRequired,
    navClass: PropTypes.string,
    navType: PropTypes.string,
}

export default Navigation
