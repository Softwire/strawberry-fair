import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import NewsArticleSnapshots from '../components/NewsArticleSnapshots'

const NewsMenu = ({newsArticles}) => {
    const menuEntries = getMenuEntries(newsArticles)
    return (
        <nav className="menu">
            <h1 className = "subtitle">
                Archive
            </h1>
            {Object.entries(menuEntries)
                .sort(([year1], [year2]) => year2 - year1)
                .map(([year, months]) => <MonthItemsForYear key={year} year={year} months={months}/> )}
        </nav>
    )
}

export default NewsMenu

const MonthItemsForYear = ({year, months}) => (
    <React.Fragment>
        <Link to ={`/news/${year}`} className="menu-label">{year}</Link>
        <ul className="menu-list">
            {months.sort().map(month => (
                <li key={month}>
                    <Link to={`/news/${year}/${month + 1}`}>
                        {monthName(month)}
                    </Link>
                </li>
            ))}
        </ul>
    </React.Fragment>
)


export function monthName(monthNumber) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    return monthNames[monthNumber]
}

function getMenuEntries(newsArticles) {
    let menuEntries = {}

    newsArticles
        .map(newsArticle => new Date(newsArticle.node.frontmatter.date))
        .filter(date => isDateInLastNYears(date, 3))
        .forEach(date => {
            const year = date.getFullYear()
            const month = date.getMonth()
            if (menuEntries[year] === undefined) {
                menuEntries[year] = []
            }
            
            if(!menuEntries[year].includes(month)) {
                menuEntries[year].push(month)
            }
        })
    
    return menuEntries
}

function isDateInLastNYears(date, nYears) {
    // Is the date 'date' within the last n years of today?
    const today = new Date()
    return date.getFullYear() >= today.getFullYear() - nYears + 1
}

NewsMenu.propTypes = {
    newsArticles: NewsArticleSnapshots.propTypes.newsArticles
}

MonthItemsForYear.propTypes = {
    year: PropTypes.number,
    months: PropTypes.arrayOf(PropTypes.number)
}
