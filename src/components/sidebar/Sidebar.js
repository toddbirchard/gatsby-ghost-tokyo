import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/free-solid-svg-icons'
import { TwitterWidget } from './'

library.add(fab, faRss, faTag)

const Sidebar = ({ data }) => {
  const site = data.allGhostSettings.edges[0].node
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  const publicTags = data.allGhostTag.edges

  return (
    <>
      <aside className="sidebar">
        <div className="widget about">
          <Link to="/" className="about-logo-link">
            {site.logo ? <img className="site-logo" src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
          </Link>
          <p className="description">{site.description}</p>
        </div>

        <div className="widget social">
          <a href={ twitterUrl } className="twitter"><FontAwesomeIcon icon={[`fab`, `twitter`]} /></a>
          <a href="https://angel.co/todd-birchard?public_profile=1" className="angellist"><FontAwesomeIcon icon={[`fab`, `angellist`]} /></a>
          <a href="https://www.linkedin.com/in/toddbirchard/" className="linkedin"><FontAwesomeIcon icon={[`fab`, `linkedin`]} /></a>
          <a href="https://github.com/toddbirchard" className="github"><FontAwesomeIcon icon={[`fab`, `github`]} /></a>
          <a href="https://www.quora.com/profile/Todd-Birchard" className="quora"><FontAwesomeIcon icon={[`fab`, `quora`]} /></a>
          <a href="{{@site.url}}/rss/" className="rss"><FontAwesomeIcon icon="rss" /></a>
        </div>

        <div className="widget tags">
          {publicTags.map(({ node }) => (
            <Link to={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</Link>
          ))}
        </div>

        <TwitterWidget />
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    allGhostSettings: PropTypes.object.isRequired,
    allGhostTag: PropTypes.object.isRequired,
  }).isRequired,
}

const SidebarQuery = props => (
  <StaticQuery
    query={graphql`
            query SidebarGQL {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
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
    render={data => <Sidebar data={data} {...props} />}
  />
)

export default SidebarQuery
