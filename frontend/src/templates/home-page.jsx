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

const additionalPropsExtractor = graphqlData => ({
  contentBlocksHtml: graphqlData.markdownRemark.fields.contentBlocksHtml,
  newsArticles: graphqlData.newsData.edges
})

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
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
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
    newsData: allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            image {
              alt
              src {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
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

