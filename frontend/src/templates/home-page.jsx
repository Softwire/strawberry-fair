import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import ImageScrapbookRow from '../components/ImageScrapbookRow'

// This is used by the website and for CMS previews
export const HomePage = ({title, content, image, scrapbookImages, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
        <Layout>
          <section>
            <h1 className="title">{title}</h1>
            <PreviewCompatibleImage imageInfo={image} />
            <BodyComponent content={content} />
            <ImageScrapbookRow scrapbookImages={scrapbookImages}/>
            <ImageScrapbookRow scrapbookImages={scrapbookImages}/>
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
        scrapbookImages {
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
