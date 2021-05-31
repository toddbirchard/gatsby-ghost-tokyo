const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
})

let ghostConfig

try {
  ghostConfig = require(`./.ghost`)
} catch (e) {
  ghostConfig = {
    production: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
    development: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  }
} finally {
  const {
    apiUrl,
    contentApiKey,
  } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
  }
}

module.exports = {
  siteMetadata: {
    title: config.shortTitle,
    siteUrl: config.siteUrl,
    description: config.siteDescriptionMeta,
    url: config.siteUrl,
    image: config.images.siteIcon,
    twitterUsername: config.links.twitter,
    flags: {
      // PRESERVE_WEBPACK_CACHE: true,
      FAST_DEV: true,
      FAST_REFRESH: true,
      PARALLEL_SOURCING: true,
    },
    plugins: [
      /**
       *  Source Plugins
       */
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `pages`),
          name: `pages`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
        },
      },
      {
        resolve: `gatsby-source-twitter`,
        options: {
          credentials: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            bearer_token: process.env.TWITTER_BEARER_TOKEN,
          },
          queries: {
            SiteTweets: {
              endpoint: `statuses/user_timeline`,
              params: {
                screen_name: `toddrbirchard`,
                include_rts: true,
                exclude_replies: true,
                tweet_mode: `extended`,
                count: 40,
              },
            },
          },
        },
      },
      /**
       *  Style Plugins
       */
      {
        resolve: `gatsby-plugin-less`,
        options: {
          javascriptEnabled: true,
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-source-ghost`,
        options: process.env.NODE_ENV === `development` ?
          ghostConfig.development : ghostConfig.production,
      },
      {
        resolve: `gatsby-plugin-web-font-loader`,
        options: {
          custom: {
            families: [
              `AvenirNextLTPro-Regular`,
              `FFMarkWebProBook`,
              `AvenirNextLTPro-Medium`,
              `FFMarkWebProMedium`
            ],
            urls: [`/css/fonts.css`],
          },
          timeout: 10000,
        },
      },
      {
        resolve: `gatsby-plugin-eslint`,
        options: {
          test: /\.js$|\.jsx$/,
          exclude: /(node_modules|.cache|public)/,
          stages: [`develop`],
          options: {
            emitWarning: true,
            failOnError: false,
          },
        },
      },
      /**
       *  SEO & Feed Plugins
       */
      {
        resolve: `gatsby-plugin-ghost-manifest`,
        options: {
          short_name: config.shortTitle,
          start_url: `/`,
          background_color: config.backgroundColor,
          theme_color: config.themeColor,
          display: `minimal-ui`,
          icon: `static/${config.siteIcon}`,
          legacy: true,
          query: `{
              allGhostSettings {
                edges {
                  node {
                    title
                    description
                  }
                }
              }
            }`,
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `{
              allGhostSettings {
                edges {
                  node {
                    title
                    description
                  }
                }
              }
            }`,
          feeds: [
            generateRSSFeed(config),
          ],
        },
      },
      {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
          query: `{
              allGhostPost {
                edges {
                  node {
                    id
                    slug
                    updated_at
                    created_at
                    feature_image
                  }
                }
              }
              allGhostPage {
                edges {
                  node {
                    id
                    slug
                    updated_at
                    created_at
                    feature_image
                  }
                }
              }
              allGhostTag {
                edges {
                  node {
                    id
                    slug
                    feature_image
                  }
                }
              }
              allGhostAuthor {
                edges {
                  node {
                    id
                    slug
                    profile_image
                  }
                }
              }
            }`,
          mapping: {
            allGhostPost: {
              sitemap: `posts`,
            },
            allGhostTag: {
              sitemap: `tags`,
            },
            allGhostAuthor: {
              sitemap: `authors`,
            },
            allGhostPage: {
              sitemap: `pages`,
            },
          },
          exclude: [
            `/dev-404-page`,
            `/404`,
            `/404.html`,
            `/offline-plugin-app-shell-fallback`,
          ],
          createLinkInHead: true,
          addUncaughtPages: true,
        },
      },
      {
        resolve: `gatsby-plugin-robots-txt`,
        options: {
          host: config.siteUrl,
          sitemap: `${config.siteUrl}/sitemap.xml`,
          policy: [{
            userAgent: `*`,
            allow: `/`,
            disallow: [`/ghost/`, `/p/`]
          }, ],
          output: `${config.siteUrl}/robots.txt`,
        },
      },
      {
        resolve: `gatsby-plugin-canonical-urls`,
        options: {
          siteUrl: config.siteUrl,
          stripQueryString: true,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-offline`,
      /**
       *  Misc Plugins
       */
      `gatsby-plugin-force-trailing-slashes`,
    ],
  }
}
