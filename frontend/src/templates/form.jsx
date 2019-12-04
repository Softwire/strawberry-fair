import React from 'react'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'


// This is used by the website and for CMS previews
export const FormPageContent = ({title, googleForm, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <section class="section">
        <div className = "content">
            <div class="columns is-centered">
                <div className="column is-half">
                    <p className="title has-text-centered has-text-primary">{title}</p>
                    <p align = "justify">
                        <BodyComponent content={content} />
                    </p>
                    <iframe src={googleForm} width="640" height="1490" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
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
