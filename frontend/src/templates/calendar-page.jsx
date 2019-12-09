import React from 'react'
import { graphql, Link } from 'gatsby'

import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Calendar } from '../components/calendar/Calendar'
import { FaCalendar, FaListUl } from 'react-icons/fa'

export const CalendarPage = ({events}) => {
  // Utility for including or not including the header and footer
  const layout = true
  
  const inLayout = (
    <section>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li className='is-active'>
            <Link to="/calendar">
              <span className="icon is-small"><FaCalendar /></span>Calendar
            </Link>
          </li>
          <li>
            <Link to="/events">
              <span className="icon is-small"><FaListUl /></span>Upcoming events
            </Link>
          </li>
        </ul>
      </div>
      <Calendar events={events} />
    </section>
  )

  if (layout) {
    return (
        <Layout>
            {inLayout}
        </Layout>
    )
  } else {
      return inLayout
  }
}

export default site(CalendarPage, data => {return {events: data.allMarkdownRemark.edges}})

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
