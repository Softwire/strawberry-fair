import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import Calendar from '../components/calendar/Calendar'

export const CalendarPageContent = ({title, focusDate, events}) => {
    return (
    <section>
        <Calendar title={title} focusDate={focusDate} events={events} />
    </section>
)}

const CalendarPage = ({data: {markdownRemark, allMarkdownRemark}}) => {
    return (
    <Layout>
        <CalendarPageContent
            title={markdownRemark.frontmatter.title}
            focusDate={new Date()}
            events={allMarkdownRemark.edges}
        />
    </Layout>
)}

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
