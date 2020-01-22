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

const extractor = (data) => ({events: data.allMarkdownRemark.edges, tabTitle: "Upcoming Events"})

export default site(UpcomingEvents, { additionalPropsExtractor: extractor })

export const query = graphql`
query upcomingEventsTemplate($id: String!) {
  markdownRemark(id: { eq: $id }) {
    html
  }
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event-info"}}}, sort: {fields: frontmatter___dateTimeRange___startDateTime, order: ASC}) {
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