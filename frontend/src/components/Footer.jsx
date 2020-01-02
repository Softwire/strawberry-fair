import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'
import { HTMLContentSmall } from './Content'
import PropTypes from 'prop-types'
import convertToHtml from '../util/markdown-converter.js'


export const Footer = () => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value}/>}
    </PreviewContext.Consumer>
  )

export const FooterDisplay = ({isPreview}) => {

    let footerContent = isPreview ? footerPreviewContent : getFooterContent()

    footerContent.address = convertToHtml(footerContent.address)
    footerContent.placeHolderText = convertToHtml(footerContent.placeHolderText)
    
    return(
    <footer className="footer">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">
                        Placeholder
                    </h3>
                    <HTMLContentSmall content={footerContent.placeHolderText}/>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="tile is-content title">
                        Follow
                    </h3>
                    <div className="tile is-parent">
                        <a className="icon is-large facebook-colour" href={footerContent.facebookAccount}>
                            <IconContext.Provider value={{size: "2em"}}>
                                <FaFacebook />
                            </IconContext.Provider>
                        </a>
                        <a className="icon is-large twitter-colour" href={footerContent.twitterAccount}>
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
                    <HTMLContentSmall content={footerContent.address}/><a href={"mailto:" + footerContent.email}>{footerContent.email}</a>
                </div>
            </div>
        </div>
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box content">
                {footerContent.copyright} | <Link to="/privacy"> Cookie & Privacy policies</Link>
                </div>
            </div>
        </div>
    </footer>
    )
}

function getFooterContent() {
    const footerContent = useStaticQuery(graphql`
      query footerContent {
              markdownRemark(fileAbsolutePath: { regex: ".*/src/pages/header-and-footer/footer.md/"}) {
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
    return {email: footerContent.markdownRemark.frontmatter.email,
        address: footerContent.markdownRemark.frontmatter.address,
        facebookAccount: footerContent.markdownRemark.frontmatter.facebookAccount,
        twitterAccount: footerContent.markdownRemark.frontmatter.twitterAccount,
        placeHolderText: footerContent.markdownRemark.frontmatter.placeHolderText,
        copyright: footerContent.markdownRemark.frontmatter.copyright}
}

Footer.propTypes = {
    data: PropTypes.object
}

FooterDisplay.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    CMSInput: PropTypes.object
}
