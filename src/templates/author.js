import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard, Pagination } from '../components/common'
import { PostAuthor } from '../components/common/posts'
import { MetaData } from '../components/common/meta'

/**
* Author page
*/

const Author = ({ data, location, pageContext }) => {
  const author = data.ghostAuthor
  const posts = data.allGhostPost.edges
  const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null

  return (
    <>
      <MetaData
        data={data}
        location={location}
        type="profile"
      />
      <Layout template="post-template page-template">
        <div className="container">
          <article className="content">
            { author.cover_image ?
              <figure className="post-feature-image">
                <img src={ author.cover_image } alt={ author.name } />
              </figure> : null }
            <div className="post-full-content">
              {/* <h1 className="content-title">{author.name}</h1> */}
              <PostAuthor author={author} />
              <section className="post-feed">
                {posts.map(({ node }) => (
                  // The tag below includes the markup for each post - components/common/PostCard.js
                  <PostCard key={node.id} post={node} />
                ))}
              </section>
              <Pagination pageContext={pageContext} />
            </div>
          </article>
        </div>
      </Layout>
    </>
  )
}

Author.propTypes = {
  data: PropTypes.shape({
    ghostAuthor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      cover_image: PropTypes.string,
      profile_image: PropTypes.string,
      website: PropTypes.string,
      bio: PropTypes.string,
      location: PropTypes.string,
      twitter: PropTypes.string,
    }),
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }`

export default Author
