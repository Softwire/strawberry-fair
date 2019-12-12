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

  menuEntries.forEach(year => {
    const firstDay = year[0]+"-01-01"
    const lastDay = (year[0]+1)+"-01-01"
    createPage({
      path: String(year[0]),
     
      component: path.resolve(
        `src/templates/news-time-interval-overview.jsx`
      ),
      context: {
        firstDay,
        lastDay
      },
    })

    year[1].forEach(month => {
      month+=1
      const firstDay= year[0]+"-"+month+"-01"
      const lastDay = getFirstDayOfNextMonth(firstDay)
      createPage({
        path: year[0]+"/"+month,
       
        component: path.resolve(
          `src/templates/news-time-interval-overview.jsx`
        ),
        context: {
          firstDay,
          lastDay
        },
      })
    })
    })
}

function getMenuEntries(newsArticles) {
  const newsArticlesDates = newsArticles.map(newsArticle =>
      new Date(newsArticle.node.frontmatter.date))
  let menuEntries = []
  let date
  for (date of newsArticlesDates) {
      let year = date.getFullYear()
      let month = date.getMonth()
      if (!menuEntries.map(entryPair => entryPair[0]).includes(year)) menuEntries.push([year,[month]])
      else {
          let yearIndex = menuEntries.map(entryPair => entryPair[0]).indexOf(year)
          if(!menuEntries[yearIndex][1].includes(month)) menuEntries[yearIndex][1].push(month)
      }
  }
  return menuEntries
}

function getFirstDayOfNextMonth(firstDayOfTheMonth) {
  const firstDay = new Date(firstDayOfTheMonth)
  var firstDayNextMonth;
  if(firstDay.getMonth()==11){
     firstDayNextMonth = new Date(firstDay.getFullYear()+1, 0, 1)
  }
  else {
     firstDayNextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth()+1, 1)
  }
  firstDayNextMonth = firstDayNextMonth.getFullYear()+"-"+(firstDayNextMonth.getMonth()+1)+"-"+firstDayNextMonth.getDate()
  return firstDayNextMonth
}