import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'


export const HomePage = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
            <section>
                <h1>{title}</h1>
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
)}


const HomePage = ({data: {markdownRemark}}) => (
  <Layout hero={markdownRemark.frontmatter.hero}>
    <HomePageContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
  </Layout>
)

const HomePage = ({data: {markdownRemark}}) => {

  const revolvingHero = ({
    image1: {
      alt: markdownRemark.frontmatter.revolvingHero.image1.alt,
      src: markdownRemark.frontmatter.revolvingHero.image1.src
    },
    image2: {
      alt: markdownRemark.frontmatter.revolvingHero.image2.alt,
      src: markdownRemark.frontmatter.revolvingHero.image2.src
    },
    image3: {
      alt: markdownRemark.frontmatter.revolvingHero.image3.alt,
      src: markdownRemark.frontmatter.revolvingHero.image3.src
    },
    image4: {
      alt: markdownRemark.frontmatter.revolvingHero.image4.alt,
      src: markdownRemark.frontmatter.revolvingHero.image4.src
    },
    image5: {
      alt: markdownRemark.frontmatter.revolvingHero.image5.alt,
      src: markdownRemark.frontmatter.revolvingHero.image5.src
    }
  })
  
  return (
    <Layout revolvingHero={revolvingHero}>
      <HomePageContent
          title={markdownRemark.frontmatter.title}
          content={markdownRemark.html}
          image={markdownRemark.frontmatter.image}
      />
    </Layout>
  )
}

export default site(HomePage)

export const query = graphql`
query homePageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        revolvingHero {
          image1 {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image4 {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image5 {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      html
    }
  }
`

