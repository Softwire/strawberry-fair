import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { formValidator } from '../components/validators'
import { isUrl } from 'is-url'

const IFRAMEHEIGHT = 1427 //default value for the height of the form

// This is used by the website and for CMS previews
export const FormPage = ({title, form, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout>
        <h1 className="title has-text-centered has-text-primary">{title}</h1>
        <BodyComponent content={content} />
        <FormFrame form={form} />
      </Layout>
    )
}

FormPageContent.propTypes = {
  title: PropTypes.string.isRequired,
  form: formValidator,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType  // Not required
}

const FormFrame = ({form: {isPublic, link}}) => {
  if (isPublic && link) {
    
    // Link as url
    if (isUrl(link) && link.includes("docs.google.com/forms/")) {
      return (
        <iframe src={link} width="100%" height={IFRAMEHEIGHT} />
      )
    }
    
    // Link as iFrame
    const urlSearch = link.match(/src="(\S*)"/)

    if (urlSearch && urlSearch[1]) {
      const url = urlSearch[1]

      if (isUrl(url) && url.includes("docs.google.com/forms/")) {
        const heightSearch = link.match(/\sheight="([0-9]+)?"\s/)
        const height = (heightSearch && heightSearch[1]) ? heightSearch[1] : IFRAMEHEIGHT

        return (
          <iframe src={formUrl} width="100%" height={height}>Loading…</iframe>
        )
      }
    }
  }
  return null
}

FormFrame.propTypes = { form: formValidator }

export default site(FormPage)

export const query = graphql`
query formPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        ...FormFragment
      }
    }
  }
`
