import { useStaticQuery, graphql } from 'gatsby'

export const getEventList = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
  query eventList {
      allMarkdownRemark(filter: {fields: {slug: {regex: "$//events//", ne: "/events/"}}}, sort: {fields: frontmatter___startDateTime, order: ASC}) {
          nodes {
              ...EventFragment
          }
      }
  }
  `)

  return allMarkdownRemark.nodes
}
