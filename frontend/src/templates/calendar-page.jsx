import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { site } from '../util/templating'
import { Calendar } from '../components/calendar/Calendar'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'
import { eventPropTypeValidator } from '../components/validators'

export const CalendarPage = ({events}) => {
  return (
    <section>
      <CalendarViewToggle view='calendar' />
      <Calendar events={events} />
    </section>
  )
}

CalendarPage.propTypes = {
  content: PropTypes.node,
  contentComponent: PropTypes.elementType,
  events: PropTypes.arrayOf(
      PropTypes.shape({
          node: eventPropTypeValidator
      })
  )
}

export default site(CalendarPage, data => {return {events: data.allMarkdownRemark.edges, tabTitle: "Calendar"}})

export const query = graphql`
query calendarPageTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    html
  }
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", ne: "/events/"}}}, sort: {fields: frontmatter___startDateTime, order: ASC}) {
    edges {
      node {
        ...EventFragment
      }
    }
  }
  heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
    ...HeroFragment
  }
}
`
