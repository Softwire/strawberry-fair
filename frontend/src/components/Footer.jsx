import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'
import { HTMLContentSmall } from './Content'
import PropTypes from 'prop-types'
import convertToHtml from '../util/markdown-converter.js'


export const Footer = (data) => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value} CMSInput={data}/>}
    </PreviewContext.Consumer>
  )

export const FooterDisplay = ({isPreview, CMSInput}) => {
    //if isPreview is true, then the CMS user is either editing a page with the footer or editing the footer itself. 
    //if CMSInput is not an empty object, then the CMS user is editing the footer.
    let footerContent = isPreview ? (Object.keys(CMSInput).length > 0 ? CMSInput : footerPreviewContent) : getFooterContent()

    footerContent.address = convertToHtml(footerContent.address)
    footerContent.leftBoxText = convertToHtml(footerContent.leftBoxText)

    return(
    <footer className="footer">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <h3 className="title">{footerContent.leftBoxTitle}</h3>
                    <HTMLContentSmall content={footerContent.leftBoxText}/>
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
const getFooterContent = () => {
    const footerContent = useStaticQuery(graphql`
      query footerContent {
            markdownRemark(fields: {slug: {eq: "/header-and-footer/footer/"}}) {
                frontmatter {
                  email
                  address
                  facebookAccount
                  twitterAccount
                  leftBoxText
                  leftBoxTitle
                  copyright
                }
              }
            }`
          )
    return {email: footerContent.markdownRemark.frontmatter.email,
        address: footerContent.markdownRemark.frontmatter.address,
        facebookAccount: footerContent.markdownRemark.frontmatter.facebookAccount,
        twitterAccount: footerContent.markdownRemark.frontmatter.twitterAccount,
        leftBoxText: footerContent.markdownRemark.frontmatter.leftBoxText,
        leftBoxTitle: footerContent.markdownRemark.frontmatter.leftBoxTitle,
        copyright: footerContent.markdownRemark.frontmatter.copyright}
}

Footer.propTypes = {
    data: PropTypes.object
}

FooterDisplay.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    CMSInput: PropTypes.object
}
