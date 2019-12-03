import React from 'react'
import { graphql } from 'gatsby'

import Calendar from '../components/calendar/Calendar'

export const CalendarPageContent = ({title, events}) => (
    <section>
        <h1>{title}</h1>
        <Calendar />
    </section>
)

const CalendarPage = ({data: {markdownRemark}}) => (
    <CalendarPageContent
        title={markdownRemark.frontmatter.title}
    />
)

export default CalendarPage

export const query = graphql`
query calendarPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
        frontmatter {
            title
        }
    }
}
`
