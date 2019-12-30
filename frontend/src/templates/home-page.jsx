import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'

import ContentBlocks from '../components/home-page/ContentBlocks'
import CalendarBlock from '../components/home-page/CalendarBlock'
import NewsBlock from '../components/home-page/NewsBlock'
import TwitterBlock from '../components/home-page/TwitterBlock'

import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const HomePage = ({title, contentBlocks, contentBlocksHtml, calendarBlock, newsBlock, newsArticles, twitterBlock, contentComponent, heroData}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
      <Layout heroData={heroData}>
        <section>
          <h1 className="title">{title}</h1>
          <ContentBlocks 
            contentBlocks={contentBlocks}
            contentBlocksHtml={contentBlocksHtml}
            BodyComponent={BodyComponent}/>
          <CalendarBlock calendarBlock={calendarBlock}/>
          <NewsBlock newsBlock={newsBlock} newsArticles={newsArticles}/>
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

HomePage.propTypes = {
  title: PropTypes.string,
  contentBlocks: ContentBlocks.propTypes.contentBlocks,
  contentBlocksHtml: ContentBlocks.propTypes.contentBlocksHtml,
  calendarBlock: CalendarBlock.propTypes.calendarBlock,
  newsBlock: NewsBlock.propTypes.newsBlock,
  newsArticles: NewsBlock.propTypes.newsArticles,
  twitterBlock: TwitterBlock.propTypes.twitterBlock,
  contentComponent: PropTypes.elementType,
  heroData: Layout.propTypes.heroData
}

const additionalPropsExtractor = graphqlData => {
  let contentBlocksHtml = graphqlData.markdownRemark.fields.contentBlocks.map(object => object["_html_contentBody"])
  return {contentBlocksHtml: contentBlocksHtml, newsArticles: graphqlData.newsData.edges}
}

export default site(HomePage, additionalPropsExtractor)


export const query = graphql`
query homePageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
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
        contentBlocks {
          _html_contentBody
        }
      }
      html
    }
    newsData: allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
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
          fields {
            slug
          }
          html
        }
      }
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`

