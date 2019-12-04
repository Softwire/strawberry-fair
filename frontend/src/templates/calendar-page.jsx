import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import Calendar from '../components/calendar/Calendar'

export const CalendarPageContent = ({title}) => (
    <section>
        <Calendar title={title}/>
    </section>
)

const CalendarPage = ({data: {markdownRemark}}) => (
    <Layout>
        <CalendarPageContent
            title={markdownRemark.frontmatter.title}
        />
    </Layout>
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
