import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
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
                <div className="column is-half">
                    <GetInTouch invitationText={footerContent.invitationText} />
                </div>
                <div className="column is-half">
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
        <h1 className="title is-2">{invitationText}</h1>
        <HeaderButtons />
    </div>
)

const ContactDetails = ({address, email, facebookAccount, twitterAccount}) => (
    <div className="columns is-mobile contact-details">
        <div className="column is-half">
            <h3 className="title is-5">Visit Us</h3>
            <div className="content is-small">
                <p>{address.firstLine}</p>
                <p>{address.secondLine}</p>
                <p>{address.thirdLine}</p>
            </div>
        </div>
        <div className="column">
            <h3 className="title is-5">Contact Us</h3>
            <div>
                <FacebookIcon facebookAccount={facebookAccount} />
                <TwitterIcon twitterAccount={twitterAccount} />
            </div>
            <br/>
            <a href={"mailto:" + email}>{email}</a>
        </div>
    </div>
)

const FacebookIcon = ({facebookAccount}) => (
    <a className="icon is-large facebook-colour"
        href={facebookAccount}
        target="_blank"
        rel="noreferrer noopener">
        <IconContext.Provider value={{size: "2em"}}>
            <FaFacebook />
        </IconContext.Provider>
    </a>
)

const TwitterIcon = ({twitterAccount}) => (
    <a className="icon is-large twitter-colour" 
        href={twitterAccount}
        target="_blank"
        rel="noreferrer noopener">
        <IconContext.Provider value={{size: "2em"}}>
            <FaTwitter />
        </IconContext.Provider>
    </a>
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
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
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
