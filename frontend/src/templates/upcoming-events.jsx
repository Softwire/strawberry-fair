import React from 'react'
import { graphql } from 'gatsby'

import { site } from '../util/templating'
import { Upcoming } from '../components/calendar/Upcoming'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'

export const UpcomingEvents = ({events}) => {
  return (
    <section>
      <CalendarViewToggle view='upcoming' />
      <Upcoming events={events} />
    </section>
  )
}

UpcomingEvents.propTypes = {
  events: Upcoming.propTypes.events
}

export default site(UpcomingEvents, data => {return {events: data.allMarkdownRemark.edges, tabTitle: "Upcoming Events"}})

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
  heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
    ...HeroFragment
  }
}
`