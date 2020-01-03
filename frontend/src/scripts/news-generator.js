//import statements do not work if you're importing from outside src/ (this file is called by gatsby-node.js, which is outside src/)
const path = require('path')  

exports.NewsInTimeIntervalGenerator = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
  query newsOverviewTemplate {
    allMarkdownRemark(filter: {fields: {slug: {regex: "$//news//", ne: "/news/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }


  const menuEntries = getMenuEntries(result.data.allMarkdownRemark.edges)

  menuEntries.forEach((months, year) => {
    const firstDay = new Date(year, 0, 1)
    const lastDay = new Date(year+1, 0, 1)
    createPage({
      path: "news/"+year,
     
      component: path.resolve(
        `src/templates/news-time-interval-overview.jsx`
      ),
      context: {
        firstDay,
        lastDay,
        title: `News - ${year}`
      },
    })

    months.forEach(month => {
      const firstDay= new Date(year, month, 1)
      const lastDay = getFirstDayOfNextMonth(firstDay)
      createPage({
        path: "news/"+year+"/"+(month+1),
       
        component: path.resolve(
          `src/templates/news-time-interval-overview.jsx`
        ),
        context: {
          firstDay,
          lastDay,
          title: `News - ${firstDay.toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})}`
        },
      })
    })
    })
}

function getMenuEntries(newsArticles) {
  const newsArticlesDates = newsArticles.map(newsArticle =>
    new Date(newsArticle.node.frontmatter.date))

  const menuEntries = new Map()
  for (let date of newsArticlesDates) {
    if (!menuEntries.has(date.getFullYear())) {
      menuEntries.set(date.getFullYear(), new Set())
    }
    menuEntries.get(date.getFullYear()).add(date.getMonth())
  }
  return menuEntries
}

function getFirstDayOfNextMonth(firstDay) {
  let firstDayNextMonth;
  if(firstDay.getMonth()===11){
     firstDayNextMonth = new Date(firstDay.getFullYear()+1, 0, 1)
  }
  else {
     firstDayNextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth()+1, 1)
  }
  return firstDayNextMonth
}