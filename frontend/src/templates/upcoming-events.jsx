import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Upcoming } from '../components/calendar/Upcoming'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'
import { eventPropTypeValidator } from '../components/validators'

export const UpcomingEvents = ({content, contentComponent, events}) => {
  const BodyComponent = contentComponent || HTMLContent

  return (
    <Layout>
      <section>
        <CalendarViewToggle view='upcoming' />
        <BodyComponent content={content} />
        <Upcoming events={events} />
      </section>
    </Layout>
  )
}

UpcomingEvents.propTypes = {
  events: PropTypes.arrayOf(
      PropTypes.shape({
          node: eventPropTypeValidator
      })
  )
}

export default site(UpcomingEvents, data => {return {events: data.allMarkdownRemark.edges}})

export const query = graphql`
query upcomingEventsTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    html
  }
  allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", ne: "/events/"}}}, sort: {fields: frontmatter___dateTime, order: ASC}) {
    edges {
      node {
        ...EventFragment
      }
    }
  }
}
`