import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import Calendar from '../components/calendar/Calendar'

export const CalendarPageContent = ({title, dateToday}) => {
    return (
    <section>
        <Calendar title={title} dateToday={dateToday} />
    </section>
)}

const CalendarPage = ({data: {markdownRemark}}) => {
    return (
    <Layout>
        <CalendarPageContent
            title={markdownRemark.frontmatter.title}
            dateToday={new Date()}
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
}
`
