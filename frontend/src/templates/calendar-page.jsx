import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import Calendar from '../components/calendar/Calendar'
import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarPageContent = ({title, focusDate, events}) => {
    return (
    <section>
      <div className="tabs is-centered">
        <ul>
          <li className="is-active"><a href="#">
            <span className="icon is-small"><FaCalendar /></span>Calendar
          </a></li>
          <li><a href="#">
            <span className="icon is-small"><FaListUl /></span>Upcoming events
          </a></li>
        </ul>
      </div>
      <Calendar title={title} focusDate={focusDate} events={events} />
    </section>
)}

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
            }
          }
          dateTime
          isMeeting
        }
        html
      }
    }
  }
}
`
