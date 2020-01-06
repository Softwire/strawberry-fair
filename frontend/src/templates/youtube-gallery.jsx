import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const YoutubeGallery = ({video, heroData}) => {
    return (
      <Layout heroData={heroData}>
          <h1 className="title">Never gonna give you up, Strawbery Fair!</h1>
          <div align="center" dangerouslySetInnerHTML={{ __html: video}} />
      </Layout>
)}

export default site(YoutubeGallery)

export const query = graphql`
query youtubeGallery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        video
      }
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
        ...HeroFragment
      }
  }
`
