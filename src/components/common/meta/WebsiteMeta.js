import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'
import ImageMeta from './ImageMeta'
import config from '../../../utils/siteConfig'

const WebsiteMeta = ({ data, settings, canonical, title, description, image, pageContext, type }) => {
  settings = settings.ghostSettings
  const facebookPageID = process.env.FACEBOOK_PAGE_ID
  const facebookAppID = process.env.FACEBOOK_APP_ID
  const googleVerificationID = process.env.GOOGLE_VERIFICATION_ID
  const previousPagePath = pageContext ? pageContext.previousPagePath : null
  const nextPagePath = pageContext ? pageContext.nextPagePath : null

  const publisherLogo = url.resolve(config.siteUrl, settings.logo) || config.images.siteIcon
  let shareImage = image || data.feature_image || _.get(settings, `cover_image`, null)

  shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null

  description = description || data.meta_description || data.description || config.siteDescriptionMeta || settings.description
  title = `${title || data.meta_title || data.name || data.title}`

  return (
    <>
      <Helmet>
        <title>
          {canonical === config.siteUrl + `/`
            ? title
            : title + ` - ${settings.title}`
          }
        </title>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="canonical" href={canonical}/>
        {previousPagePath ? <link rel="prev" href={pageContext.previousPagePath}/> : null}
        {nextPagePath ? <link rel="next" href={pageContext.nextPagePath}/> : null}
        {googleVerificationID ? <meta name="google-site-verification" content={googleVerificationID}/> : null}

        {/* Facebook */}
        <meta property="og:site_name" content={settings.title}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={canonical}/>
        {facebookPageID ? <meta property="fb:page_id" content={facebookPageID}/> : null}
        {facebookAppID ? <meta property="fb:app_id" content={facebookAppID}/> : null}

        {/* Twitter */}
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:url" content={canonical}/>
        {settings.twitter ? <meta name="twitter:site" content={settings.twitter}/> : null}
        {config.creator.twitter ? <meta name="twitter:creator" content={config.creator.twitter}/> : null}

        <script type="application/ld+json">{`
              {
                  "@context": "https://schema.org/",
                  "@type": "${type}",
                  "url": "${canonical}",
                  ${shareImage ? `"image": {
                          "@type": "ImageObject",
                          "url": "${shareImage}",
                          "width": "${config.images.shareImageWidth}",
                          "height": "${config.images.shareImageHeight}"
                      },` : ``}
                  "publisher": {
                      "@type": "Organization",
                      "name": "${settings.title}",
                      "logo": {
                          "@type": "ImageObject",
                          "url": "${publisherLogo}",
                          "width": 738,
                          "height": 151
                      }
                  },
                  "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "${config.siteUrl}"
                  },
                  "description": "${description}"
              }
          `}
        </script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

WebsiteMeta.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    feature_image: PropTypes.string,
    description: PropTypes.string,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
    meta_description: PropTypes.string,
    name: PropTypes.string,
    meta_title: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    ghostSettings: PropTypes.object.isRequired,
    twitter: PropTypes.object,
    title: PropTypes.string,
    logo: PropTypes.string,
    images: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pageContext: PropTypes.object,
  type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
}

const WebsiteMetaQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettingsWebsiteMeta {
              ghostSettings {
                ...GhostSettingsFields
                  }
              }
           `}
    render={data => <WebsiteMeta settings={data} {...props} />}
  />
)

export default WebsiteMetaQuery
