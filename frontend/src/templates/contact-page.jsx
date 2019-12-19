import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import ContactForm from '../components/ContactForm'

// This is used by the website and for CMS previews
export const ContactPage = ({title, content, contentComponent}) => {
  const BodyComponent = contentComponent || HTMLContent
  
  return (
    <Layout>
      <section className="section">
        <h1 className="title is-1">{title}</h1>
        <BodyComponent content={content} />
        <ContactForm/>
      </section>
    </Layout>
)}

export default site(ContactPage)

export const query = graphql`
query contactPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`

ContactPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType
}
