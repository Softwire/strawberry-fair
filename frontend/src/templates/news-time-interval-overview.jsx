import React from 'react'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import {NewsMenu, monthName} from '../components/NewsMenu.jsx'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

// This is used by the website and for CMS previews
export const NewsTimeIntervalOverview = ({newsArticles, firstDay, lastDay}) => {
    const selectedNewsArticles = getNewsArticlesInTimeInterval(newsArticles, firstDay, lastDay)
    const firstDayDate = new Date(firstDay)
    var heading = ''
    if(areInSameYear(selectedNewsArticles)){
      if(areInSameMonth(selectedNewsArticles)) heading = monthName(firstDayDate.getMonth()) + " " + firstDayDate.getFullYear()
      else heading = firstDayDate.getFullYear()
    }
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <h1 className="title has-text-primary is-size-1">News</h1>
            <div className="columns">
              <div className = "column is-three-quarters">
                <div className = "panel">
                  <h2 className="panel-heading">{heading}</h2>
                  {selectedNewsArticles.map(article => (
                     <Link to={article.node.fields.slug} className="panel-block">
                       <article className="media">
                         <figure className="media-left">
                           <p class="image is-64x64">
                             <PreviewCompatibleImage imageInfo={article.node.frontmatter.image}/>
                           </p>
                         </figure>
                         <div className="media-content">
                            <div className="has-text-primary">{article.node.frontmatter.title}</div>
                            <div className= "has-text-secondary">{article.node.frontmatter.date}</div>
                            <p align="justify">
                              <HTMLContent content = {article.node.html.substring(0,360)+" ..."}/>
                            </p>
                         </div>
                        </article>
                      </Link>))
                  }
                </div>
              </div>
              <div className = "column">
                <NewsMenu newsArticles={newsArticles}/>
              </div>          
            </div>
          </div>
        </section>
      </Layout>
)}

export default site(NewsTimeIntervalOverview, data => ({newsArticles: data.allMarkdownRemark.edges}))

export const query = graphql`
query newsMonthOverviewTemplate{
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date
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
  }
`
function getNewsArticlesInTimeInterval(newsArticles, firstDay, lastDay) {
  const firstDayDate = new Date(firstDay)
  const lastDayDate = new Date(lastDay)
  
  const newsArticlesInTimeInterval = []
  newsArticles.forEach(newsArticle => {
    if(isInTimeInterval(firstDayDate, lastDayDate, new Date(newsArticle.node.frontmatter.date))) {
      newsArticlesInTimeInterval.push(newsArticle)
    }
  })
  return newsArticlesInTimeInterval
}

function isInTimeInterval(firstDayDate, lastDayDate, articleDate) {
  return firstDayDate<= articleDate && articleDate < lastDayDate
}

function areInSameYear(articles){
  if(articles){
    const date = new Date(articles[0].node.frontmatter.date)
    const year = date.getFullYear()
    for(const article of articles){
      const articleDate = new Date(article.node.frontmatter.date)
      if(articleDate.getFullYear()!=year) return false
    }
    return true
  }
  console.error("No articles in the time interval specified.")
}

function areInSameMonth(articles) {
  if(articles){
    const date = new Date(articles[0].node.frontmatter.date)
    const month = date.getMonth()
    for(const article of articles){
      const articleDate = new Date(article.node.frontmatter.date)
      if(articleDate.getMonth()!=month) return false
    }
    return true
  }
  console.error("No articles in the time interval specified.")
}