import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import './about-page.css'


// This is used by the websitesite and for CMS previews
export const AboutPageContent = ({title, subtitle, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <container class = "container">
      <section>
        <box class = "box">
          < h1 class="title is-1">{title}</h1>
          <h2 class="subtitle">{subtitle}</h2>
        </box>
        <BodyComponent content={content} />
        <PreviewCompatibleImage imageInfo={image} />
      </section>
    </container>
)}

const AboutPage = ({data: {markdownRemark}}) => (
    <AboutPageContent
        title={markdownRemark.frontmatter.title}
        subtitle={markdownRemark.frontmatter.subtitle}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
)

export default AboutPage

export const query = graphql`
query aboutPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
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


