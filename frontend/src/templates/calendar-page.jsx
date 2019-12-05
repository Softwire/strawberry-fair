import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import Calendar from '../components/calendar/Calendar'
import Upcoming from '../components/calendar/Upcoming'
import { FaCalendar, FaListUl } from 'react-icons/fa'

class CalendarPageContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'calendar',
      title: props.title,
      focusDate: props.focusDate,
      events: props.events
    }
    this.toUpcoming = this.toUpcoming.bind(this)
    this.toCalendar = this.toCalendar.bind(this)
  }

  toUpcoming() {
    this.setState({view: 'upcoming'})
  }

  toCalendar() {
    this.setState({view: 'calendar'})
  }

  render() {
    const title = this.state.title
    const focusDate = this.state.focusDate
    const events = this.state.events

    let inner;

    if (this.state.view === 'calendar') {
      inner = (
        <Calendar title={title} focusDate={focusDate} events={events} />
      )
    } else if (this.state.view === 'upcoming') {
      inner = (
        <Upcoming events={events} />
      )
    }

    return (
      <section>
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={this.state.view === 'calendar' ? 'is-active' : ''}><a onClick={this.toCalendar}>
              <span className="icon is-small"><FaCalendar /></span>Calendar
            </a></li>
            <li className={this.state.view === 'upcoming' ? 'is-active' : ''}><a onClick={this.toUpcoming}>
              <span className="icon is-small"><FaListUl /></span>Upcoming events
            </a></li>
          </ul>
        </div>
        {inner}
      </section>
    )
  }
}

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
