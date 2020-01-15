import { useStaticQuery, graphql } from 'gatsby'

import { areSameMinute } from '../../util/dates'

export const getEventList = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
  query eventList {
      allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", nin: ["/events/", "/events/template/"]}}}, sort: {fields: frontmatter___dateTimeRange___startDateTime, order: ASC}) {
          nodes {
              ...EventFragment
          }
      }
  }
  `)

  // Already started by start time, but if two events start at the same time, we want to sort then by the end time (if provided).
  const nodesSorted = allMarkdownRemark.nodes.sort((event1, event2) => {
    const range1 = event1.frontmatter.dateTimeRange
    const range2 = event2.frontmatter.dateTimeRange
    const start1 = new Date(range1.startDateTime)
    const start2 = new Date(range2.startDateTime)

    // Only need to do anything if they start at the same time
    if (areSameMinute(start1, start2)) {
      // Four cases, for each combination of each providing or not providing an end time.
      // We'll deal with them all.
      if (range1.provideEnd) {
        const end1 = new Date(range1.endDateTime)

        if (range2.provideEnd) {
          const end2 = new Date(range2.endDateTime)
          // Both ends provided, so sort by end date
          return end1 - end2
        } else {
          // Range 2 has no defined end time, so ends first
          return 1
        }
      } else {
        if (range2.provideEnd) {
          // Range 1 has no defined end time, so ends first
          return -1
        } else {
          // Neither have a defined end, so they occur at the same time
          return 0
        }
      }
    } else {
      // Leave in current order
      return 0
    }
  })

  return nodesSorted
}
