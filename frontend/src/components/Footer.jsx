import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'

export const Footer = () => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value} />}
    </PreviewContext.Consumer>
  )
  

const FooterDisplay = ({isPreview}) => {
    const footerContent = isPreview ? footerPreviewContent : getFooterContent()
    return(
    <footer className="footer">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Placeholder
                    </h3>
                    {footerContent.markdownRemark.frontmatter.placeHolderText}
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="tile is-content title">
                        Follow
                    </h3>
                    <div className="tile is-parent">
                        <a className="icon is-large facebook-colour" href={footerContent.markdownRemark.frontmatter.facebookAccount}>
                            <IconContext.Provider value={{size: "2em"}}>
                                <FaFacebook />
                            </IconContext.Provider>
                        </a>
                        <a className="icon is-large twitter-colour" href={footerContent.markdownRemark.frontmatter.twitterAccount}>
                            <IconContext.Provider value={{size: "2em"}}>
                                <FaTwitter />
                            </IconContext.Provider>
                        </a>
                    </div>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Contact
                    </h3>
                    {footerContent.markdownRemark.frontmatter.address}<br/><a href={"mailto:" + footerContent.markdownRemark.frontmatter.email}>{footerContent.markdownRemark.frontmatter.email}</a>
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

function getFooterContent() {
    return useStaticQuery(graphql`
      query footerContent {
              markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/footer.md/"}) {
                frontmatter {
                  email
                  address
                  facebookAccount
                  twitterAccount
                  placeHolderText
                  copyright
                }
              }
            }`
          )
}

