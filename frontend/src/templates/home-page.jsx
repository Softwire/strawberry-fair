import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'

import ContentBlocks from '../components/home-page/ContentBlocks'
import CalendarBlock from '../components/home-page/CalendarBlock'
import NewsBlock from '../components/home-page/NewsBlock'
import TwitterBlock from '../components/home-page/TwitterBlock'

import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const HomePage = ({title, contentBlocks, contentBlocksHtml, calendarBlock, newsBlock, twitterBlock,  image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    const placeholderArticle = {
      node: {
        fields: {
          slug: '/'
        },
        frontmatter: {
          image: {
            image: '/img/strawberry.jpg'
          },
          title: 'Placeholder'
        }
      }
  }
  
  const placeholderArticles = new Array(3).fill(placeholderArticle)
  
    return (
      <Layout>
        <section>
          <h1 className="title">{title}</h1>
          <PreviewCompatibleImage imageInfo={image} />
          <ContentBlocks 
            contentBlocks={contentBlocks}
            contentBlocksHtml={contentBlocksHtml}
            BodyComponent={BodyComponent}/>
          <CalendarBlock calendarBlock={calendarBlock}/>
          <NewsBlock newsBlock={newsBlock} newsArticles={placeholderArticles}/>
          <TwitterBlock twitterBlock={twitterBlock}/>
          {
            // TODO: Finish committee meeting calendars
            // TODO: Finish News overview
            // TODO: Finish Twitter integration
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
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        contentBlocks {
          title
          subtitle
          scrapbookImages {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          sideSnippet
        }
        calendarBlock {
          title
          subtitle
        }
        newsBlock {
          title
          subtitle
        }
        twitterBlock {
          title
          subtitle
        }
      }
      fields {
        contentBlocksHtml
      }
      html
    }
  }
`
