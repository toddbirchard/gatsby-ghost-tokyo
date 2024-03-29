import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location, pageContext }) => {
  const page = data.ghostPage

  return (
    <>
      <MetaData
        data={data}
        location={location}
        pageContext={pageContext}
        type="website"
      />
      <Helmet>
        <style type="text/css">{`${page.codeinjection_styles}`}</style>
      </Helmet>
      <Layout template="post-template page-template">
        <article className="content">
          { page.feature_image ?
            <figure className="post-feature-image">
              <img src={ page.feature_image } alt={ page.title } />
            </figure> : null }
          <div className="post-full-content">
            <h1 className="content-title">{page.title}</h1>

            {/* The main page content */}
            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </div>
        </article>
      </Layout>
    </>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      codeinjection_styles: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
