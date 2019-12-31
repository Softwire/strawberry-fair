import React from 'react'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import NewsMenu, { monthName } from '../components/NewsMenu.jsx'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

// This is used by the website and for CMS previews
export const NewsTimeIntervalOverview = ({newsArticles, firstDay, lastDay}) => {
    const firstDate = new Date(firstDay)
    const lastDate = new Date(lastDay)
    const selectedNewsArticles = getNewsArticlesInTimeInterval(newsArticles, firstDate, lastDate)
    var heading = ''
    if (isYearInterval(firstDate, lastDate)) {
      heading = firstDate.getFullYear()
    } else if (isMonthInterval(firstDate, lastDate)) {
      heading = monthName(firstDate.getMonth()) + " " + firstDate.getFullYear()
    } else {
      console.log("Unexpected date interval passed to page constructor.")
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

// Checks whether the given interval is from 01 Jan (year) to 01 Jan (year + 1)
function isYearInterval(firstDate, lastDate) {
  return (
    firstDate.getFullYear() + 1 === lastDate.getFullYear() &&
    firstDate.getMonth() === 0 &&
    lastDate.getMonth() === 0 &&
    firstDate.getDate() === 1 &&
    lastDate.getDate() === 1
  )
}

// Checks whether the given interval is from 01 (month) (year) to 01 (month + 1) (year)
function isMonthInterval(firstDate, lastDate) {
  let firstPureMonth = new Date(firstDate.getFullYear(), firstDate.getMonth())
  const lastPureMonth = new Date(lastDate.getFullYear(), lastDate.getMonth())
  firstPureMonth.setMonth(firstPureMonth.getMonth() + 1)

  return (
    firstPureMonth.getTime() === lastPureMonth.getTime() &&  // Have to do it this way to ensure December works
    firstDate.getDate() === 1 &&
    lastDate.getDate() === 1
  )
}
