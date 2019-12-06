import React from 'react'
import { graphql } from 'gatsby'
import IframeResizer from 'iframe-resizer-react'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'


// This is used by the website and for CMS previews
export const FormPageContent = ({title, googleForm, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    let formUrl = googleForm.split("\"");
    if (formUrl.length == 1) formUrl = formUrl[0] //if the form is given as an Url simply pass it to the iframe
    else formUrl = formUrl[1] //if the form is given as an HTML element, it extracts the URL from it

    return (
    <section className="section">
        <div className = "content">
            <div className="columns is-centered">
                <div className="column is-three-quarters">
                    <h1 className="title has-text-centered has-text-primary">{title}</h1>
                    <BodyComponent content={content} />
                    <iframe
                    src = {formUrl}
                    width="100%" height="1427"
                    
                    >Loading…</iframe>
                </div>
            </div>
        </div>
    </section>
)}

const FormPage = ({data: {markdownRemark}}) => (
  <Layout>
    <FormPageContent
        title={markdownRemark.frontmatter.title}
        googleForm={markdownRemark.frontmatter.googleForm}
        content={markdownRemark.html}
       
    />
  </Layout>
)

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
