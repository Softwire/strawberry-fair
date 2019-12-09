import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import ContentBlocks from '../components/home-page/ContentBlocks'
import AccessibleImage from '../query-fragments/AccessibleImage'

// This is used by the website and for CMS previews
export const HomePage = ({title, contentBlocks, contentBlocksHtml, image, contentComponent, revolvingHero}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout revolvingHero={revolvingHero}>
        <section>
          <h1 className="title">{title}</h1>
          <PreviewCompatibleImage imageInfo={image} />
          <ContentBlocks 
            contentBlocks={contentBlocks}
            contentBlocksHtml={contentBlocksHtml}
            BodyComponent={BodyComponent}/>
          {
            // TODO: Add committee meeting calendars
            // TODO: Add East Anglian Festival Network banner
            // TODO: Add News overview
            // TODO: Add Twitter integration
          }
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
        revolvingHero {
          image1 {
            ...AccessibleImage
          }
          image2 {
            ...AccessibleImage
          }
          image3 {
            ...AccessibleImage
          }
          image4 {
            ...AccessibleImage
          }
          image5 {
            ...AccessibleImage
          }
        }
        contentBlocks {
          contentTitle
          contentSubtitle
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