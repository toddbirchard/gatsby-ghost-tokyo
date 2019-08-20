import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
library.add(faUserEdit)

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const readingTime = readingTimeHelper(post)

    return (
            <>
                <MetaData
                    data={data}
                    location={location}
                    type="article"
                />
                <Helmet>
                    <style type="text/css">{`${post.codeinjection_styles}`}</style>
                </Helmet>
                <Layout template="post-template">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            <div className="post-meta">
                                <div className="meta-item"> <FontAwesomeIcon icon='user-edit' /> {post.primary_author.name} </div>
                                <div className="meta-item"> <FontAwesomeIcon icon='tag' /> {post.tags && <Tags post={post} limit={1} visibility="public" autolink={false}/>} </div>
                                <div className="meta-item"> <FontAwesomeIcon icon='eye' /> {readingTime} </div>
                            </div>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                    </article>
                    <section className="post-footer">
                        {/* <div className="post-social">
                            <a href="" className="twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            <a href="" className="facebook"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
                            <a href="" className="linkedin"><FontAwesomeIcon icon={['fab', 'reddit']} /></a>
                            <a href="" className="linkedin"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                        </div>  */}
                        <div className="post-tags">
                            <Tags post={post} visibility="public" autolink={true} />
                        </div>
                        <div className="post-author">
                            <div className="post-author-content">
                                <h4 className="post-author-name">{post.primary_author.name}</h4>
                                {post.primary_author.bio && <p className="post-author-bio">{post.primary_author.bio}</p>}
                                <div className="post-author-meta">
                                    {post.primary_author.website && <a className="post-author-item" href={post.primary_author.website} target="_blank" rel="noopener noreferrer">Website</a>}
                                    {post.primary_author.twitterUrl && <a className="post-author-item" href={post.primary_author.twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                    {post.primary_author.facebookUrl && <a className="post-author-item" href={post.primary_author.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                                </div>
                            </div>
                            <div className="post-author-image">
                                {post.primary_author.profile_image && <img src={post.primary_author.profile_image} alt={post.primary_author.name} />}
                            </div>
                        </div>
                    </section>
                </Layout>
            </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }).isRequired,
            primary_author: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                profile_image: PropTypes.string.isRequired,
                website: PropTypes.string.isRequired,
                twitterUrl: PropTypes.string.isRequired,
                facebookUrl: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
            primary_author {
              name
              url
              bio
              website
              twitter
              facebook
            }
        }
    }
`
