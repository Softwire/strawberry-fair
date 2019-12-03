import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'

import '../styling/styles.sass'


// This is used by the websitesite and for CMS previews
export const HomePageContent = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <section>
        <h1>{title}</h1>
        <BodyComponent content={content} />
        <PreviewCompatibleImage imageInfo={image} />
    </section>
)}

const HomePage = ({data: {markdownRemark}}) => (
    <HomePageContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
)

export default HomePage

export const query = graphql`
query homePageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`
