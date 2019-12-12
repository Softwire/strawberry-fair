import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Calendar } from '../components/calendar/Calendar'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'
import { eventPropTypeValidator } from '../components/validators'

export const CalendarPage = ({events}) => (
  <Layout>
    <section>
      <CalendarViewToggle view='calendar' />
      <Calendar events={events} />
    </section>
  </Layout>
)

CalendarPage.propTypes = {
  events: PropTypes.arrayOf(
      PropTypes.shape({
          node: eventPropTypeValidator
      })
  )
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
          eventTypes
          dateTime
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
