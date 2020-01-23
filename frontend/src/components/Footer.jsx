import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter, FaEnvelopeOpenText } from 'react-icons/fa'
import { useStaticQuery, graphql, Link } from 'gatsby'
import footerPreviewContent from '../data/footerPreviewContent'
import { PreviewContext } from '../util/context.jsx'
import PropTypes from 'prop-types'
import HeaderButtons from './headerButtons'

export const Footer = (data) => (
    <PreviewContext.Consumer>
      {value => <FooterDisplay isPreview={value} CMSInput={data}/>}
    </PreviewContext.Consumer>
  )

export const FooterDisplay = ({isPreview, CMSInput}) => {
    //if isPreview is true, then the CMS user is either editing a page with the footer or editing the footer itself. 
    //if CMSInput is not an empty object, then the CMS user is editing the footer.
    let footerContent = isPreview ? (Object.keys(CMSInput).length > 0 ? CMSInput : footerPreviewContent) : getFooterContent()
    
    return (
        <footer>
            <div className="columns">
                <div className="column is-6">
                    <GetInTouch invitationText={footerContent.invitationText} />
                </div>
                <div className="column is-4 is-offset-1">
                    <ContactDetails 
                        address={footerContent.address}
                        email={footerContent.email}
                        facebookAccount={footerContent.facebookAccount}
                        twitterAccount={footerContent.twitterAccount}
                    />
                </div>
            </div>
            <div className="columns reverse-columns">
                <div className="column is-half column-align-bottom">
                    <PrivacyPolicy copyright={footerContent.copyright} />
                </div>
                <div className="column is-half">
                    <EmailSubscription 
                        emailSubscriptionText={footerContent.emailSubscriptionText}
                        emailSubscriptionLink={footerContent.emailSubscriptionLink}
                    />
                </div>
            </div>
        </footer>
    )
}

const GetInTouch = ({invitationText}) => (
    <div className="invitation-and-buttons">
        <h1 className="title is-3 is-size-4-mobile">{invitationText}</h1>
        <HeaderButtons />
    </div>
)

const ContactDetails = ({address, facebookAccount, twitterAccount}) => (
    <div className="footer-contact-us">
        <h3 className="title middle-line is-5" align="left"><span>Contact Us</span></h3>
        <div className="columns is-mobile contact-details is-vcentered">
            <div className="column address">
                <div className="content is-small address has-text-weight-semibold" align="left">
                    <p>{address.firstLine}</p>
                    <p>{address.secondLine}</p>
                    <p>{address.thirdLine}</p>
                </div>
            </div>
            <div className="column icons">
                <div className="tile is-ancestor">
                    <div className="contact tile is-parent has-text-centered">
                        <div className="tile is-4 is-child">
                            <FacebookIcon facebookAccount={facebookAccount} />
                        </div>
                        <div className="tile is-4 is-child">
                            <TwitterIcon twitterAccount={twitterAccount} />
                        </div>
                        <div className="tile is-4 is-child">
                        <ContactFormIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const FacebookIcon = ({facebookAccount}) => (
    <a className="icon is-large facebook-colour"
        href={facebookAccount}
        target="_blank"
        rel="noreferrer noopener">
        <IconContext.Provider value={{size: "3em"}}>
            <FaFacebook />
        </IconContext.Provider>
    </a>
)

const TwitterIcon = ({twitterAccount}) => (
    <a className="icon is-large twitter-colour" 
        href={twitterAccount}
        target="_blank"
        rel="noreferrer noopener">
        <IconContext.Provider value={{size: "3em"}}>
            <FaTwitter />
        </IconContext.Provider>
    </a>
)

const ContactFormIcon = () => (
    <Link className="icon is-large twitter-colour has-text-primary" 
        to="/contact"
        target="_blank"
        rel="noreferrer noopener">
        <IconContext.Provider value={{size: "3em"}}>
            <FaEnvelopeOpenText />
        </IconContext.Provider>
    </Link>
)

const PrivacyPolicy = ({copyright}) => (
    <div>
        <p className="align-bottom">
            {copyright} | <Link to="/privacy"> Cookie & Privacy policies</Link>
        </p>
    </div>
)

const EmailSubscription = ({emailSubscriptionText, emailSubscriptionLink}) => (
    <a className="box has-background-primary has-text-white is-size-5"
        href={emailSubscriptionLink}
        target="_blank"
        rel="noreferrer noopener">
        {emailSubscriptionText}
    </a>
)

const getFooterContent = () => {
    const footerContent = useStaticQuery(graphql`
        query footerContent {
            markdownRemark(fields: {slug: {eq: "/header-and-footer/footer/"}}) {
                frontmatter {
                    invitationText
                    address {
                        firstLine
                        secondLine
                        thirdLine
                    }
                    email
                    facebookAccount
                    twitterAccount
                    emailSubscriptionText
                    emailSubscriptionLink
                    copyright
                }
            }
        }`
    )
    return footerContent.markdownRemark.frontmatter
}

Footer.propTypes = {
    data: PropTypes.object
}

FooterDisplay.propTypes = {
    isPreview: PropTypes.bool.isRequired,
    CMSInput: PropTypes.object
}

GetInTouch.propTypes= {
    invitationText: PropTypes.string.isRequired
}

ContactDetails.propTypes = {
    address: PropTypes.shape({ 
        firstLine: PropTypes.string,
        secondLine: PropTypes.string,
        thirdLine: PropTypes.string,
    }).isRequired,
    facebookAccount: PropTypes.string.isRequired,
    twitterAccount: PropTypes.string.isRequired,
}

FacebookIcon.propTypes = {
    facebookAccount: PropTypes.string.isRequired,
}

TwitterIcon.propTypes = {
    twitterAccount: PropTypes.string.isRequired,
}

PrivacyPolicy.propTypes = {
    copyright: PropTypes.string.isRequired,
}

EmailSubscription.propTypes = {
    emailSubscriptionText: PropTypes.string.isRequired,
    emailSubscriptionLink: PropTypes.string.isRequired,
}
