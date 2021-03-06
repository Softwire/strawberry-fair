import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'

import ContentBlocks from '../components/home-page/ContentBlocks'
import CalendarBlock from '../components/home-page/CalendarBlock'
import NewsBlock from '../components/home-page/NewsBlock'
import TwitterBlock from '../components/home-page/TwitterBlock'

import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const HomePage = ({contentBlocks, contentBlocksHtml, calendarBlock, events, newsBlock, newsArticles, twitterBlock, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <React.Fragment>
        <ContentBlocks 
          contentBlocks={contentBlocks}
          contentBlocksHtml={contentBlocksHtml}
          BodyComponent={BodyComponent}/>
        <CalendarBlock calendarBlock={calendarBlock} events={events} />
        <NewsBlock newsBlock={newsBlock} newsArticles={newsArticles}/>
        <TwitterBlock twitterBlock={twitterBlock}/>
        {
          // TODO: Finish committee meeting calendars
          // TODO: Finish News overview
          // TODO: Finish Twitter integration
        }
      </React.Fragment>
  )
}

HomePage.propTypes = {
  contentBlocks: ContentBlocks.propTypes.contentBlocks,
  contentBlocksHtml: ContentBlocks.propTypes.contentBlocksHtml,
  calendarBlock: CalendarBlock.propTypes.calendarBlock,
  events: CalendarBlock.propTypes.events,
  newsBlock: NewsBlock.propTypes.newsBlock,
  newsArticles: NewsBlock.propTypes.newsArticles,
  twitterBlock: TwitterBlock.propTypes.twitterBlock,
  contentComponent: PropTypes.elementType,
}

const extractor = graphqlData => ({
  contentBlocksHtml: graphqlData.markdownRemark.fields.contentBlocksHtml,
  newsArticles: graphqlData.newsData.edges,
  tabTitle: 'Strawberry Fair'
})

export default site(HomePage, { additionalPropsExtractor: extractor, isWide: true })


export const query = graphql`
query homePageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        contentBlocks {
          title
          subtitle
          scrapbookImages {
            alt
            srcNode {
              childImageSharp {
                fluid(traceSVG: {background: "#fff", color: "#ae1414",  turdSize: 50}) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          strawberryTile {
            isPublic
            text
          }
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
    newsData: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "news-article"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          ...NewsFragment
        }
      }
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`

