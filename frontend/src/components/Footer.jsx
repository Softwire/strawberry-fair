import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'
import remark from 'remark'
import remarkHtml from 'remark-html'

export const Footer = () => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value} />}
    </PreviewContext.Consumer>
  )
  

const FooterDisplay = ({isPreview}) => {
    const footerContent = isPreview ? footerPreviewContent : getFooterContent()
    //these lines convert markdown text to html
    const address = remark().use(remarkHtml).processSync(footerContent.markdownRemark.frontmatter.address).toString()
    const placeHolderText = remark().use(remarkHtml).processSync(footerContent.markdownRemark.frontmatter.placeHolderText).toString()
    
    return(
    <footer className="footer">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Placeholder
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: placeHolderText}}/>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="tile is-content title">
                        Follow
                    </h3>
                    <div className="tile is-parent">
                        <Social href={footerContent.markdownRemark.frontmatter.facebookAccount} image="img/facebook-logo.png" alt="Facebook" />
                        <Social href={footerContent.markdownRemark.frontmatter.twitterAccount} image="img/twitter-logo.png" alt="Twitter" />
                    </div>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Contact
                    </h3>
                    <div dangerouslySetInnerHTML={{ __html: address}}/><a href={"mailto:" + footerContent.markdownRemark.frontmatter.email}>{footerContent.markdownRemark.frontmatter.email}</a>
                </div>
            </div>
        </div>
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box content">
                {footerContent.markdownRemark.frontmatter.copyright} | <Link to="/privacy"> Cookie & Privacy policies</Link>
                </div>
            </div>
        </div>
    </footer>
    )
}

const Social = ({href, image, alt}) => (
    <div className="tile is-child">
        <a href={href} className="image is-48x48">
            <PreviewCompatibleImage imageInfo={{image: image, alt: alt}} />
        </a>
    </div>
)

Social.propTypes = {
    href: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string
}

function getFooterContent() {
    return useStaticQuery(graphql`
      query footerContent {
              markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/footer.md/"}) {
                frontmatter {
                  email
                  facebookAccount
                  twitterAccount
                  placeHolderText
                  copyright
                  address
                }
              }
            }`
          )
  }