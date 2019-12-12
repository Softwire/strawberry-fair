import React from 'react'
import { Link } from 'gatsby'

export const NewsMenu = ({newsArticles}) => {
    let menuEntries = getMenuEntries(newsArticles)
    return (
        <aside className="menu">
            <h1 className = "subtitle">
            Archive
            </h1>
            {menuEntries.map(yearEntry => <MonthItemsForYear key={yearEntry[0]} year={yearEntry[0]} months ={yearEntry[1]}/> )}
        </aside>

    )
}

export default NewsMenu

const MonthItemsForYear = ({year, months}) => (
        <div>
            <Link to ={"/"+year} className="menu-label">{year}</Link>
            <ul className="menu-list">
                {months.map(month => { 
                const monthNumber = month + 1
                const link = "/"+year+"/"+monthNumber
                return (<li key={month}><Link to={link}>{monthName(month)}</Link></li>)})}
            </ul>
        </div>
        )


export function monthName(monthNumber) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    return monthNames[monthNumber]
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

