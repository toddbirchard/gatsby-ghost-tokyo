import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

const RelatedPosts = ({ data }) => {
    const posts = data.allGhostPost.edges

    return (
      <>
          <div className="related-posts">
              {posts.map(({ node }) => (
                  <a href={ node.url } className="related-post-card" key={ node.name }>
                      <img src={ node.feature_image } />
                      <h5 className="related-post-title"> { node.title } </h5>
                  </a>
              ))}
          </div>
      </>
    )
}


RelatedPosts.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired
}


const RelatedPostsQuery = props => (
    <StaticQuery
        query={graphql`
            query {
              allGhostPost(limit: 3, sort: {order: DESC, fields: published_at}) {
                edges {
                  node {
                    url
                    feature_image
                    title
                  }
                }
              }
            }`
        }
        render={data => <RelatedPosts data={data} {...props} />}
    />
)

export default RelatedPostsQuery
