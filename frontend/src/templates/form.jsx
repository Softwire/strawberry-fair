import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'

const IFRAMEHEIGHT = 1427 //default value for the height of the form

// This is used by the website and for CMS previews
export const FormPageContent = ({title, googleForm, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    let formUrl = googleForm.split("\"");
    if (formUrl.length == 1) formUrl = formUrl[0] //if the form is given as an Url simply pass it to the iframe
    else formUrl = formUrl[1] //if the form is given as an HTML element, it extracts the URL from it
    const heightExtractionRegex = /\sheight="([0-9]+)?"\s/
    let heightExtraction = googleForm.match(heightExtractionRegex)
    let iframeHeight 
    if (heightExtraction != null && heightExtraction.length == 2) iframeHeight = heightExtraction[1]
    else iframeHeight = IFRAMEHEIGHT //sets it to the default value

    return (
    <section className="section">
        <div className = "content">
            <div className="columns is-centered">
                <div className="column is-three-quarters">
                    <h1 className="title has-text-centered has-text-primary">{title}</h1>
                    <BodyComponent content={content} />
                    <iframe
                    src = {formUrl}
                    width="100%" height={iframeHeight}
                    >Loading…</iframe>
                </div>
            </div>
        </div>
    </section>
)}

FormPageContent.propTypes = {
  title: PropTypes.string.isRequired,
  googleForm: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType  // Not required
}

const FormPage = ({data: {markdownRemark}}) => (
  <Layout>
    <FormPageContent
        title={markdownRemark.frontmatter.title}
        googleForm={markdownRemark.frontmatter.googleForm}
        content={markdownRemark.html}
       
    />
  </Layout>
)

FormPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        googleForm: PropTypes.string.isRequired
      }),
      html: PropTypes.string.isRequired
    })
  })
}

export default FormPage

export const query = graphql`
query formPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        googleForm
      }
      html
    }
  }
`
