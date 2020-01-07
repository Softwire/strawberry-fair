import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { FormFrame } from '../components/FormFrame'
import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const FormPage = ({form, content, contentComponent}) => {
  const BodyComponent = contentComponent || HTMLContent

  return (
    <React.Fragment>
      <BodyComponent content={content} />
      <FormFrame form={form} />
    </React.Fragment>
  )
}

FormPage.propTypes = {
  form: FormFrame.propTypes.form,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType
}

export default site(FormPage)

export const query = graphql`
query formPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        ...FormFragment
      }
      html
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`
