import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Link, StaticQuery, graphql } from 'gatsby'


const Footer = ({ title }) => {

    return (
    <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-foot">
            <div className="footer-text">
                <Link to="/">{title}</Link> © 2019 &mdash;
            </div>
        </footer>
    </>
    )
}


export default Footer
