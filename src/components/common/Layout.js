import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Tags } from '@tryghost/helpers-gatsby'

import { Link, StaticQuery, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faRss, faTag } from '@fortawesome/free-solid-svg-icons'

import Img from 'gatsby-image'

import { Navigation } from '.'
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

library.add(fab, faCheckSquare, faCoffee, faRss, faTag)

const DefaultLayout = ({ data, children, bodyClass, isHome, tags }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const publicTags = data.allGhostTag.edges


    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">
            { isHome ? <Navigation data={site.navigation} navClass="site-nav-item" navType="home-nav" /> : <Navigation data={site.navigation} navClass="site-nav-item" navType="post-nav" />}
            <div className={ isHome ? "home-container" : "container" }>
                {/* All the main content gets inserted here, index.js, post.js */}
                { isHome ?
                    <aside className="sidebar">
                        <div className="widget about">
                            <a href="{site.url}" className="about-logo-link">
                                {site.logo ? <img className="site-logo" src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
                            </a>
                            <p className="description">{site.description}</p>
                        </div>

                        <div className="widget social">
                            <a href={ twitterUrl } className="twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            <a href="https://angel.co/todd-birchard?public_profile=1" className="angellist"><FontAwesomeIcon icon={['fab', 'angellist']} /></a>
                            <a href="https://www.linkedin.com/in/toddbirchard/" className="linkedin"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                            <a href="https://github.com/toddbirchard" className="github"><FontAwesomeIcon icon={['fab', 'github']} /></a>
                            <a href="https://www.quora.com/profile/Todd-Birchard" className="quora"><FontAwesomeIcon icon={['fab', 'quora']} /></a>
                            <a href="{{@site.url}}/rss/" className="rss"><FontAwesomeIcon icon='rss' /></a>
                        </div>

                        <div className="widget tags">
                            {publicTags.map(({ node }) => (
                                <a href="{ node.url }" className="tag" key="{ node.name }">{ node.name }</a>
                            ))}
                        </div>
                    </aside> :
                    null}

                {children}
            </div>

            {/* The footer at the very bottom of the screen */}
            <footer className="site-foot">
                <div className="site-foot-nav container">
                    <div className="site-foot-nav-left">
                        <Link to="/">{site.title}</Link> © 2019 &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" rel="noopener noreferrer">Ghost</a>
                    </div>
                    <div className="site-foot-nav-right">
                        <Navigation data={site.navigation} navclassName="site-foot-nav-item" />
                    </div>
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
