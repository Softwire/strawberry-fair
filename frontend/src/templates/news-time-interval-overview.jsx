import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import NewsMenu, { monthName } from '../components/NewsMenu.jsx'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import NewsArticleSnapshots from '../components/NewsArticleSnapshots'

// This is used by the website and for CMS previews
export const NewsTimeIntervalOverview = ({newsArticles, firstDay, lastDay}) => {
  const firstDate = new Date(firstDay)
  const firstYear = firstDate.getFullYear()
  const firstMonth = firstDate.getMonth()
  const lastDate = new Date(lastDay)
  const selectedNewsArticles = getNewsArticlesInTimeInterval(newsArticles, firstDate, lastDate)
  const heading = `News articles from ${generateHeading(firstDate, lastDate)}`
  const breadcrumbs = ['News']
  const breadcrumbLinks = ['/news']

  if (isYearInterval(firstDate, lastDate)) {
    breadcrumbs.push(firstYear)
    breadcrumbLinks.push(`/news/${firstYear}`)
  } else if (isMonthInterval(firstDate, lastDate)) {
    breadcrumbs.push(firstYear)
    breadcrumbs.push(monthName(firstMonth))
    breadcrumbLinks.push(`/news/${firstYear}`)
    breadcrumbLinks.push(`/news/${firstYear}/${firstMonth}`)
  } else {
    console.log("Unexpected date interval passed to page constructor.")
  }

  return (
    <React.Fragment>
      <NewsArchiveBreadcrumbs breadcrumbs={breadcrumbs} breadcrumbLinks={breadcrumbLinks} />
      <hr />
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
              </Link>
            ))}
          </div>
        </div>
        <div className="column">
          <NewsMenu newsArticles={newsArticles}/>
        </div>          
      </div>
    </React.Fragment>
  )
}

const generateHeading = (firstDate, lastDate) => {
  if (isYearInterval(firstDate, lastDate)) {
    return firstDate.getFullYear()
  } else if (isMonthInterval(firstDate, lastDate)) {
    return monthName(firstDate.getMonth()) + " " + firstDate.getFullYear()
  } else {
    console.log("Unexpected date interval passed to page constructor.")
  }
}

const NewsArchiveBreadcrumbs = ({breadcrumbs, breadcrumbLinks}) => {
  return (
    <nav className="breadcrumb is-large">
      <ul>
        {breadcrumbs.map((breadcrumb, index) => (<li key={breadcrumb}><Link to={breadcrumbLinks[index]}>{breadcrumb}</Link></li>))}
      </ul>
    </nav>
  )
}

export default site(NewsTimeIntervalOverview, (data, pageContext) => {
  return {
    newsArticles: data.allMarkdownRemark.edges,
    title: pageContext && pageContext.title ? pageContext.title : 'News Archive'
  }
})

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
  const firstPureMonth = new Date(firstDate.getFullYear(), firstDate.getMonth())
  const lastPureMonth = new Date(lastDate.getFullYear(), lastDate.getMonth())
  firstPureMonth.setMonth(firstPureMonth.getMonth() + 1)

  return (
    firstPureMonth.getTime() === lastPureMonth.getTime() &&  // Have to do it this way to ensure December works
    firstDate.getDate() === 1 &&
    lastDate.getDate() === 1
  )
}

NewsTimeIntervalOverview.propTypes = {
  newsArticles: NewsArticleSnapshots.propTypes.newsArticles,
  firstDay: PropTypes.string.isRequired,
  lastDay: PropTypes.string.isRequired
}

NewsArchiveBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  breadcrumbLinks: PropTypes.arrayOf(PropTypes.string)
}
