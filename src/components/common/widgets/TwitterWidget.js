import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const TwitterWidget = ({ data }) => {
    const tweets = data.allTwitterStatusesUserTimelineHackersTweets.edges
    const user = data.twitterStatusesUserTimelineHackersTweets.user

    return (
          <>
            <div className="widget twitter">
                <div className="twitter-header">
                    <img src={user.profile_image_url_https} className="twitter-avatar" alt="twitter-avatar"/>
                    <div>
                        <a href={user.url} className="twitter-name" target="_blank" rel="noopener noreferrer">{user.name}</a>
                        <div className="twitter-user">@{user.screen_name}</div>
                    </div>
                </div>
                <div className="tweets">
                    {tweets.map(({ node }) => (
                        <div className="tweet" key={node.id}>
                            <p className="tweet-content">{node.full_text.split(`#`)[0].split(`http`)[0]}</p>
                            {node.entities.urls.map(({ display_url, expanded_url }) => (
                                <a href={expanded_url} className="tweet-link" key={`${node.id}-link`} rel="nofollow noreferrer">{ display_url }</a>
                            ))}
                            <div className="tweet-head">
                                <span className="date">{node.created_at.split(` `, 3).join(` `)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </>
    )
}

TwitterWidget.propTypes = {
    data: PropTypes.shape({
        allTwitterStatusesUserTimelineHackersTweets: PropTypes.shape({
            full_text: PropTypes.string,
            favorite_count: PropTypes.number,
            retweet_count: PropTypes.number,
            created_at: PropTypes.string,
            id: PropTypes.string,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                profile_image_url: PropTypes.string.isRequired,
                screen_name: PropTypes.string.isRequired,
            }),
            entities: PropTypes.shape({
                urls: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    }),
                ),
                hashtags: PropTypes.arrayOf(
                    PropTypes.shape({
                        text: PropTypes.string,
                    }),
                ),
            }),
        }).isRequired,
        twitterStatusesUserTimelineHackersTweets: PropTypes.shape({
            user: PropTypes.shape({
                profile_image_url_https: PropTypes.string,
                name: PropTypes.string.isRequired,
                url: PropTypes.string,
                display_url: PropTypes.string,
                screen_name: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }),
}

const TwitterQuery = props => (
    <StaticQuery
        query={graphql`
          query TweetQuery {
            allTwitterStatusesUserTimelineHackersTweets {
              edges {
                node {
                  full_text
                  favorite_count
                  retweet_count
                  created_at
                  id
                  user {
                    name
                    url
                    profile_image_url
                    screen_name
                  }
                  entities {
                    urls {
                      display_url
                      expanded_url
                    }
                  }
                }
              }
            }
            twitterStatusesUserTimelineHackersTweets {
              user {
                profile_image_url_https
                name
                url
                screen_name
              }
            }
          }`
        }
        render={data => <TwitterWidget data={data} {...props} />}
    />
)

export default TwitterQuery
