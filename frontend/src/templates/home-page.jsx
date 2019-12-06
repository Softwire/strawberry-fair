import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import ContentBlocks from '../components/ContentBlocks'

// This is used by the website and for CMS previews
export const HomePage = ({title, contentBlocks, contentBlocksHtml, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout>
        <section>
          <h1 className="title">{title}</h1>
          <PreviewCompatibleImage imageInfo={image} />
          <ContentBlocks 
            contentBlocks={contentBlocks}
            contentBlocksHtml={contentBlocksHtml}
            BodyComponent={BodyComponent}/>
        </section>
      </Layout>
  )
}

const additionalPropsExtractor = graphqlData => ({
  contentBlocksHtml: graphqlData.markdownRemark.fields.contentBlocksHtml
})

export default site(HomePage, additionalPropsExtractor)

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
        contentBlocks {
          contentTitle
          scrapbookImages {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          sideSnippet
        }
      }
      fields {
        contentBlocksHtml
      }
      html
    }
  }
`
