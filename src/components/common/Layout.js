import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Link, StaticQuery, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/free-solid-svg-icons'

import Img from 'gatsby-image'

import { Navigation, Sidebar } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

library.add(fab, faRss, faTag)

const DefaultLayout = ({ data, children, bodyClass, isHome, isTag, template }) => {
    const site = data.allGhostSettings.edges[0].node

    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={template} />
        </Helmet>

        <div className="viewport">
            { isHome &&
                <div>
                    <Link to="/" className="mobile-logo">
                        {site.logo ? <img src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
                    </Link>
                </div> }
            <Navigation data={site.navigation} navClass="site-nav-item" navType="home-nav" logo={site.icon} url={site.url} />
            <div className={ isHome ? "home-container" : "container" }>
                {/* All the main content gets inserted here, index.js, post.js */}
                { isHome ? <Sidebar /> : null}
                {children}
            </div>

            {/* The footer at the very bottom of the screen */}
            <footer className="site-foot">
                <div className="footer-text">
                    <Link to="/">{site.title}</Link> © 2019 &mdash;
                </div>
            </footer>
        </div>

    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        allGhostTag: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                allGhostTag(sort: {order: DESC, fields: postCount}) {
                  edges {
                    node {
                      name
                      slug
                      url
                      postCount
                    }
                  }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
