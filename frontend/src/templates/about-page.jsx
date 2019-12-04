import React from 'react'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import '../styling/styles.sass'


// This is used by the websitesite and for CMS previews
export const AboutPageContent = ({title, subtitle, titleimage, content, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent

    return (
    <body>
      <section className="section">
        <div className="container">
          <h1 className="title is-1">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
          <figure>
            <PreviewCompatibleImage imageInfo={titleimage} />
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-8">
            <div className="column is-one-quarter">
              <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                  <div className="tile is-child has-background-primary has-text-white box">
                    <figure className="image is-64x64">
                      <img  src="/img/strawberry-icon.png" alt={''}  />
                    </figure>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  </div>
                  <div className="tile is-child has-background-primary has-text-white box">
                    <figure className="image is-64x64">
                      <img  src="/img/strawberry-icon.png" alt={''}  />
                    </figure>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                  </div>
                  <div className="tile is-child has-background-primary has-text-white box">
                    <figure className="image is-64x64">
                      <img  src="/img/strawberry-icon.png" alt={''}  />
                    </figure>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <BodyComponent content={content} />
            </div>
          </div>
        </div>
      </section>
    </body>
)}

const AboutPage = ({data: {markdownRemark}}) => (
    <AboutPageContent
        title={markdownRemark.frontmatter.title}
        subtitle={markdownRemark.frontmatter.subtitle}
        titleimage={markdownRemark.frontmatter.titleimage}
        content={markdownRemark.html}
    />
)

export default AboutPage

export const query = graphql`
query aboutPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        titleimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`


