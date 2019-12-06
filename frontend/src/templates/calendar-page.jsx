import React, { useState } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Calendar } from '../components/calendar/Calendar'
import { Upcoming } from '../components/calendar/Upcoming'
import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarPageContent = ({events}) => {
  // Are we looking at the Calendar, or the Upcoming Events page?
  // TODO: Really I think I would prefer these to be two separate pages
  // When you click on a link in 'Upcoming', then click back, you get taken to the Calendar page
  const [ view, setView ] = useState('calendar')

  // Function to switch to 'Upcoming' view
  const toUpcoming = () => {
    setView('upcoming')
  }

  // Function to switch to 'Calendar' view
  const toCalendar = () => {
    setView('calendar')
  }

  // Render
  let inner;

  if (view === 'calendar') {
    inner = (
      <Calendar events={events} />
    )
  } else if (view === 'upcoming') {
    inner = (
      <Upcoming events={events} />
    )
  }

  return (
    <section>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li className={view === 'calendar' ? 'is-active' : ''}><a onClick={toCalendar}>
            <span className="icon is-small"><FaCalendar /></span>Calendar
          </a></li>
          <li className={view === 'upcoming' ? 'is-active' : ''}><a onClick={toUpcoming}>
            <span className="icon is-small"><FaListUl /></span>Upcoming events
          </a></li>
        </ul>
      </div>
      {inner}
    </section>
  )
}

const CalendarPage = ({data: {markdownRemark, allMarkdownRemark}}) => {
  const layout = false

  if (layout) {
    return (
    <Layout>
        <CalendarPageContent
            title={markdownRemark.frontmatter.title}
            focusDate={new Date()}
            events={allMarkdownRemark.edges}
        />
    </Layout>)
  } else {
    return (
      <CalendarPageContent
          title={markdownRemark.frontmatter.title}
          focusDate={new Date()}
          events={allMarkdownRemark.edges}
      />
    )
  }
}

export default CalendarPage

export const query = graphql`
query calendarPageTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    frontmatter {
      title
    }
  }
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", ne: "/events/"}}}, sort: {fields: frontmatter___dateTime, order: ASC}) {
    edges {
      node {
        frontmatter {
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
              resize(width: 64, height: 64) {
                src
              }
            }
          }
          dateTime
          isMeeting
        }
        html
        fields {
          slug
        }
      }
    }
  }
}
`
