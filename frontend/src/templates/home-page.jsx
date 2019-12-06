import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'


export const HomePage = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
        <Layout>
            <section>
                <h1>{title}</h1>
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
  )
}

export default site(HomePage)

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
