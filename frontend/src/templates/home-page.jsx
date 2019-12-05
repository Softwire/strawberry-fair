import React from 'react'
import { graphql } from 'gatsby'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { HTMLContent } from '../components/Content'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'


export const HomePage = ({title, content, image, contentComponent}) => {
    const BodyComponent = contentComponent || HTMLContent
    return (
<<<<<<< HEAD
        <Layout>
            <section>
                <h1>{title}</h1>
                <BodyComponent content={content} />
                <PreviewCompatibleImage imageInfo={image} />
            </section>
        </Layout>
  )
}
=======
    <section>
        <h1>{title}</h1>
        <BodyComponent content={content} />
        <PreviewCompatibleImage imageInfo={image} />
    </section>
)}

<<<<<<< HEAD
const HomePage = ({data: {markdownRemark}}) => (
  <Layout hero={markdownRemark.frontmatter.hero}>
    <HomePageContent
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
        image={markdownRemark.frontmatter.image}
    />
  </Layout>
)
>>>>>>> sf-17: written Hero component
=======
const HomePage = ({data: {markdownRemark}}) => {

  const hero = ({
    image1: {
      alt: markdownRemark.frontmatter.hero.image1.alt,
      src: markdownRemark.frontmatter.hero.image1.src
    },
    image2: {
      alt: markdownRemark.frontmatter.hero.image2.alt,
      src: markdownRemark.frontmatter.hero.image2.src
    },
    image3: {
      alt: markdownRemark.frontmatter.hero.image3.alt,
      src: markdownRemark.frontmatter.hero.image3.src
    },
    image4: {
      alt: markdownRemark.frontmatter.hero.image4.alt,
      src: markdownRemark.frontmatter.hero.image4.src
    },
    image5: {
      alt: markdownRemark.frontmatter.hero.image5.alt,
      src: markdownRemark.frontmatter.hero.image5.src
    }
  })
  
  return (
    <Layout hero={hero}>
      <HomePageContent
          title={markdownRemark.frontmatter.title}
          content={markdownRemark.html}
          image={markdownRemark.frontmatter.image}
      />
    </Layout>
  )
}
>>>>>>> sf-17: banner now functional

export default site(HomePage)

export const query = graphql`
query homePageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        hero {
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

