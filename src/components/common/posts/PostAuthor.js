import React from 'react'
import PropTypes from 'prop-types'

import { FaUserEdit, FaGlobe, FaTwitter } from 'react-icons/fa'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/

const PostAuthor = ({ author }) => {
  const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null

  return (
    <>
      <div className="post-author">
        <div className="post-author-content">
          <h4 className="post-author-name">{author.name}</h4>
          {author.bio && <p className="post-author-bio">{author.bio}</p>}
          <div className="post-author-meta">
            {author.website && <a className="post-author-item" href={author.website} target="_blank" rel="noopener noreferrer"><FaGlobe />Website</a>}
            {authorTwitterUrl && <a className="post-author-item" href={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FaTwitter />Twitter</a>}
          </div>
        </div>
        <div className="post-author-image">
          {author.profile_image && <img src={author.profile_image} alt={author.name} />}
        </div>
      </div>
    </>
  )
}

PostAuthor.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
    website: PropTypes.string,
    twitter: PropTypes.string,
  }).isRequired,
}

export default PostAuthor
