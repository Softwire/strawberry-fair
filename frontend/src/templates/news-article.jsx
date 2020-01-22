import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import NewsArticleSideInfo from '../components/NewsArticleSideInfo'
import { site } from '../util/templating'

// This is used by the website and for CMS previews
export const NewsArticle = ({author, content, image, date, tags, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
      <React.Fragment>
        <figure className="image">
          {image && <PreviewCompatibleImage imageInfo={image}/>} 
        </figure>
        <br/>
        <div className="columns">
          <div className="column is-one-fifth">
            <NewsArticleSideInfo author={author} date={date} tags={tags}/>
          </div>
          <div className="column">
            <BodyComponent content={content} />
          </div>
        </div>
      </React.Fragment>
)}

NewsArticle.propTypes = {
  author: NewsArticleSideInfo.propTypes.author,
  content: PropTypes.node,
  image: PreviewCompatibleImage.propTypes.imageInfo,
  date: NewsArticleSideInfo.propTypes.date,
  tags: NewsArticleSideInfo.propTypes.tags,
  contentComponent: PropTypes.elementType
}

export default site(NewsArticle, { isNarrow: true })

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
