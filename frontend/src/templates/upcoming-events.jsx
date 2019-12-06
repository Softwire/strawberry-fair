import React from 'react'
import { graphql, Link } from 'gatsby'

import { site } from '../util/templating'
import { Layout } from '../components/Layout'
import { Upcoming } from '../components/calendar/Upcoming'
import { FaCalendar, FaListUl } from 'react-icons/fa'

export const UpcomingEvents = ({events}) => {
    // Utility for including or not including the header and footer
    const layout = false

    const inLayout = (
        <section>
            <div className="tabs is-centered is-boxed">
                <ul>
                    <li>
                        <Link to="/calendar">
                            <span className="icon is-small"><FaCalendar /></span>Calendar
                        </Link>
                    </li>
                    <li className="is-active">
                        <Link to="/events">
                            <span className="icon is-small"><FaListUl /></span>Upcoming events
                        </Link>
                    </li>
                </ul>
            </div>
            <Upcoming events={events} />
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

export default site(UpcomingEvents, data => {return {events: data.allMarkdownRemark.edges}})

export const query = graphql`
query upcomingEventsTemplate($id: String!) {
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