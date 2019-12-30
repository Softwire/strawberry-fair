import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'
import { HTMLContentSmall } from './Content'
import PropTypes from 'prop-types'
const markdownToHtmlConverter = require('../scripts/markdownToHtmlConverter')


export const Footer = (data) => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value} CMSInput={data}/>}
    </PreviewContext.Consumer>
  )

export const FooterDisplay = ({isPreview, CMSInput}) => {
    let footerContent = {}
    //if the the Admin is editing the footer content
    if(isPreview && Object.keys(CMSInput).length > 0) {
        footerContent.address = markdownToHtmlConverter.getHtml(CMSInput._markdown_address)
        footerContent.placeHolderText = markdownToHtmlConverter.getHtml(CMSInput._markdown_placeHolderText)
        footerContent.email = CMSInput.email
        footerContent.facebookAccount = CMSInput.facebookAccount
        footerContent.twitterAccount = CMSInput.twitterAccount
        footerContent.copyright = CMSInput.copyright
    }
    //else the Admin is editing some other page or no preview is required
    else footerContent = isPreview ? footerPreviewContent : getFooterContent()
    
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
                  facebookAccount
                  twitterAccount
                  copyright
                }
                fields {
                    _html_placeHolderText
                    _html_address
                }
              }
            }`
          )
    return {email: footerContent.markdownRemark.frontmatter.email,
        facebookAccount: footerContent.markdownRemark.frontmatter.facebookAccount,
        twitterAccount: footerContent.markdownRemark.frontmatter.twitterAccount,
        copyright: footerContent.markdownRemark.frontmatter.copyright,
        placeHolderText: footerContent.markdownRemark.fields._html_placeHolderText,
        address: footerContent.markdownRemark.fields._html_address}
}

Footer.propTypes = {
    data: PropTypes.object
}

FooterDisplay.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    CMSInput: PropTypes.object
}
