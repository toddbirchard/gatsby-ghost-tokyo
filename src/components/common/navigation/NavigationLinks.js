import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const NavigationLinks = ({ data, navClass }) => (
  <>
    {data.map((navItem, i) => {
      if (navItem.url.match(/^\s?http(s?)/gi)) {
        return <a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
      } else {
        return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>
      }
    })}
  </>
)

NavigationLinks.defaultProps = {
  navClass: `site-nav-item`,
  navType: `home-nav`,
}

NavigationLinks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  navClass: PropTypes.string,
  navType: PropTypes.string,
}

export default NavigationLinks
