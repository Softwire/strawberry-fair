import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import ContactForm from '../components/ContactForm'

// This is used by the website and for CMS previews
export const ContactPage = ({content, contentComponent}) => {
  const BodyComponent = contentComponent || HTMLContent
  
  return (
    <section className="section">
      <BodyComponent content={content} />
      <ContactForm/>
    </section>
)}

export default site(ContactPage, () => ({tabTitle: 'Contact Us'}))

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
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType
}
