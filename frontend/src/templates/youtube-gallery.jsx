import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'
import { HTMLContent } from '../components/Content'
import { getSimplifiedIframe } from '../util/youtubeInfoExtractor'
import convertToHtml from '../util/markdown-converter'

export const YoutubeGallery = ({video, videoAndText, heroData, content, contentComponent}) => {
  const BodyComponent = contentComponent || HTMLContent
  return (
    <Layout title="Never gonna give you up, Strawbery Fair!" heroData={heroData}>
      <section className="section">
        <h2 className="subtitle">A video from the youtube widget in the frontmatter:</h2>
        <HTMLContent content={getSimplifiedIframe({iframe: video.url})} />
        <h2 className="subtitle">A video from a markdown widget in the frontmatter:</h2>
        <HTMLContent content={convertToHtml(videoAndText)} />
        <BodyComponent content={content} />
      </section>
    </Layout>
)}

export default site(YoutubeGallery)

export const query = graphql`
query youtubeGallery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        video {
          url
        }
        videoAndText
      }
      html
    }
    heroData: allMarkdownRemark(filter: {id: {eq: $id}}) {
        ...HeroFragment
      }
  }
`
