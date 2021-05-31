import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FaRetweet, FaHeartbeat, FaCalendar } from 'react-icons/fa'

const TwitterWidget = ({ data }) => {
  const tweets = data.tweets.edges
  const twitterProfile = data.twitterProfile.user
  const twitterProfileURL = `https://twitter.com/${twitterProfile.screen_name}/`

  return (
    <>
      <div className="widget twitter">
        <div className="twitter-header">
          <img src={twitterProfileURL} className="twitter-avatar" alt="twitter-avatar"/>
          <div>
            <a href={twitterProfile.url} className="twitter-name" target="_blank" rel="noopener noreferrer">{twitterProfile.name}</a>
            <div className="twitter-user">@{twitterProfile.screen_name}</div>
          </div>
        </div>
        <div className="tweets">
          {tweets.map(({ node }) => (
            <div className="tweet" key={node.id}>
              <p className="tweet-content">{node.full_text.split(`#`)[0].split(`http`)[0]}</p>
              {node.entities.urls.map(({ display_url, expanded_url }) => (
                <a
                  href={expanded_url}
                  className="tweet-link"
                  key={`${node.id}-link`}
                  rel="nofollow noreferrer">{ display_url }
                </a>
              ))}
              <div className="tweet-head">
                <div className="tweet-footer">
                  <div className="retweets meta-item">
                    <FaRetweet /> <span>{node.retweet_count}</span>
                  </div>
                  <div className="favorites meta-item">
                    <FaHeartbeat /> <span>{node.favorite_count}</span>
                  </div>
                  <div className="date meta-item"><FaCalendar />
                    {node.created_at.split(` `, 3).join(` `)}
                  </div>
                </div>
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
    tweets: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          full_text: PropTypes.string,
          favorite_count: PropTypes.number,
          retweet_count: PropTypes.number,
          created_at: PropTypes.string,
          id: PropTypes.string,
          retweeted: PropTypes.bool,
          retweeted_status: PropTypes.object,
          in_reply_to_screen_name: PropTypes.string,
          user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            profile_image_url_https: PropTypes.string.isRequired,
            screen_name: PropTypes.string.isRequired,
          }),
          entities: PropTypes.shape({
            urls: PropTypes.arrayOf(
              PropTypes.shape({
                url: PropTypes.string,
              }),
            ),
          }),
        }).isRequired,
      ),
    }),
    twitterProfile: PropTypes.shape({
      user: PropTypes.shape({
        profile_image_url_https: PropTypes.string,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        display_url: PropTypes.string,
        screen_name: PropTypes.string.isRequired,
        followers_count: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }),
}

const TwitterQuery = props => (
  <StaticQuery
    query={graphql`
      query TwitterQuery {
        tweets: allTwitterStatusesUserTimelineSiteTweets(limit: 4) {
          edges {
            node {
              full_text
              favorite_count
              retweet_count
              created_at
              id
              user {
                profile_image_url_https
                url
                screen_name
                name
              }
              retweeted
              entities {
                user_mentions {
                  screen_name
                }
                urls {
                  url
                }
              }
              retweeted_status {
                retweeted
                user {
                  screen_name
                  url
                  profile_image_url_https
                }
              }
              source
            }
          }
        }
        twitterProfile: twitterStatusesUserTimelineSiteTweets {
          user {
            url
            screen_name
            profile_image_url_https
            name
            followers_count
          }
        }
      }`
    }
    render={data => <TwitterWidget data={data} {...props} />}
  />
)

export default TwitterQuery
