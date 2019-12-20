import React from 'react'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import NewsMenu, { monthName } from '../components/NewsMenu.jsx'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

// This is used by the website and for CMS previews
export const NewsTimeIntervalOverview = ({newsArticles, firstDay, lastDay}) => {
    firstDay = new Date(firstDay)
    lastDay = new Date(lastDay)
    const selectedNewsArticles = getNewsArticlesInTimeInterval(newsArticles, firstDay, lastDay)
    var heading = ''
    if(areInSameYear(selectedNewsArticles)){
      if(areInSameMonth(selectedNewsArticles)) heading = monthName(firstDay.getMonth()) + " " + firstDay.getFullYear()
      else heading = firstDay.getFullYear()
    }
    return (
      <Layout>
            <h1 className="title has-text-primary is-size-1">News</h1>
            <div className="columns">
              <div className="column is-three-quarters">
                <div className="panel">
                  <h2 className="panel-heading">{heading}</h2>
                  {selectedNewsArticles.map(article => (
                     <Link to={article.node.fields.slug} key={article.node.fields.slug} className="panel-block">
                       <article className="media">
                         <figure className="media-left">
                           <div className="image is-64x64">
                             <PreviewCompatibleImage imageInfo={article.node.frontmatter.image}/>
                           </div>
                         </figure>
                         <div className="media-content">
                            <h1 className="has-text-primary">{article.node.frontmatter.title}</h1>
                            <time className="has-text-secondary" dateTime={article.node.frontmatter.date}>{article.node.frontmatter.date}</time>
                            <HTMLContent content = {article.node.html.substring(0,360)+" ..."}/>
                         </div>
                        </article>
                      </Link>))
                  }
                </div>
              </div>
              <div className="column">
                <NewsMenu newsArticles={newsArticles}/>
              </div>          
            </div>
      </Layout>
)}

export default site(NewsTimeIntervalOverview, data => ({newsArticles: data.allMarkdownRemark.edges}))

export const query = graphql`
query newsMonthOverviewTemplate{
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          ...NewsFragment
        }
      }
    }
  }
`
function getNewsArticlesInTimeInterval(newsArticles, firstDay, lastDay) {
  return newsArticles.filter(article => isInTimeInterval(firstDay, lastDay, new Date(article.node.frontmatter.date)))
}

function isInTimeInterval(firstDayDate, lastDayDate, articleDate) {
  return firstDayDate<= articleDate && articleDate < lastDayDate
}

function areInSameYear(articles){
  const date = new Date(articles[0].node.frontmatter.date)
  const year = date.getFullYear()
  for(const article of articles){
    const articleDate = new Date(article.node.frontmatter.date)
    if(articleDate.getFullYear()!=year) return false
  }
  return true
}

function areInSameMonth(articles) {
  const date = new Date(articles[0].node.frontmatter.date)
  const month = date.getMonth()
  for(const article of articles){
    const articleDate = new Date(article.node.frontmatter.date)
    if(articleDate.getMonth()!=month) return false
  }
  return true
}
