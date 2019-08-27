import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Img from 'gatsby-image'

const RelatedPosts = ({ data }) => {
    const posts = data.allGhostPost.edges

    return (
      <>
          <div className="related-posts">
              {posts.map(({ node }) => (
                  <a href={ node.url } className="related-post-card" key={ node.name }>
                      <Img fluid={ node.feature_image } />
                      <h5 className="related-post-title"> { node.title } </h5>
                  </a>
              ))}
          </div>
      </>
    )
}


RelatedPosts.propTypes = {
    data: PropTypes.shape({
        RelatedPostsQuery: PropTypes.object.isRequired,
    }).isRequired
}


const RelatedPostsQuery = props => (
    <StaticQuery
        query={graphql`
            query($slug: String!) {
              allGhostPost(limit: 3, sort: {order: DESC, fields: published_at}, filter: {primary_tag: {slug: {eq: $slug}}}) {
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
