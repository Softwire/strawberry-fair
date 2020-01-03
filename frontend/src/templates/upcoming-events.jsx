import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { HTMLContent } from '../components/Content'
import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Upcoming } from '../components/calendar/Upcoming'
import { CalendarViewToggle } from '../components/calendar/CalendarViewToggle'

export const UpcomingEvents = ({content, contentComponent, events, heroData}) => {
  const BodyComponent = contentComponent || HTMLContent

  return (
    <Layout heroData={heroData}>
      <section>
        <CalendarViewToggle view='upcoming' />
        <BodyComponent content={content} />
        <Upcoming events={events} />
      </section>
    </Layout>
  )
}

UpcomingEvents.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.elementType,
  events: Upcoming.propTypes.events,
  heroData: Layout.propTypes.heroData
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
  heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
    ...HeroFragment
  }
}
`