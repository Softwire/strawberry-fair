import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import NewsArticleSideInfo from '../components/NewsArticleSideInfo'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const NewsArticle = ({title, author, content, image, date, tags, contentComponent, heroData}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <Layout heroData={heroData}>
        <section className="section">
          <h1 className="title has-text-primary is-size-1">{title}</h1>
          <figure className="image">
            {image && <PreviewCompatibleImage imageInfo={image}/>} 
          </figure>
          <br/>
          <div className="columns">
            <div className="column is-one-quarter">
              <NewsArticleSideInfo author={author} date={date} tags={tags}/>
            </div>
            <div className="column">
              <BodyComponent content={content} />
            </div>
          </div>
        </section>
      </Layout>
)}

NewsArticle.propTypes = {
  title: PropTypes.node,
  author: NewsArticleSideInfo.propTypes.author,  // Reuse validators
  content: PropTypes.node,
  image: PreviewCompatibleImage.propTypes.imageInfo,
  date: NewsArticleSideInfo.propTypes.date,
  tags: NewsArticleSideInfo.propTypes.tags,
  contentComponent: PropTypes.elementType
}

export default site(NewsArticle)

export const query = graphql`
query newsArticleTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...NewsFragment
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
      ...HeroFragment
    }
  }
`
