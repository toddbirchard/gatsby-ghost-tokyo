import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ title }) => (
    <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-foot">
            <div className="footer-text">
                <span>{title} © 2019</span>
            </div>
        </footer>
    </>
)

Footer.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Footer
