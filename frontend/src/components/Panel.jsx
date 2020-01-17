import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import _ from 'lodash'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContentSmall } from './Content'

// Component used in News Archive, Upcoming Events & Calendar Day Modal
// CSS classes use name "xpanel" to distinguish from Bulma panel class
export const PanelBlock = ({panelData, emptyText, isViewportWidthDesktop}) => (
    <div className={`xpanel-block`}>
        {
            getPanels(panelData, emptyText).map((panel, idx) => (
                <div key={idx} className={`xpanel-background ${isViewportWidthDesktop ? "is-viewport-width" : ""}`}>
                    <section className = "section section-root">
                        <div className="container">
                            {panel}
                        </div>
                    </section>
                </div>
            ))
        }
    </div>
)

const EmptyPanel = ({text}) => {
    return (
        <div className="xpanel">
            {text}
        </div>
    )
}

const Panel = ({image, slug, title, subtitle, mobileSubtitle, excerpt}) => {

    const panelImage = <PanelImage image={image} />
    const panelHeader = <PanelHeader slug={slug}
                                     title={title}
                                     subtitle={subtitle}
                                     mobileSubtitle={mobileSubtitle} />
    const panelExcerpt = <PanelExcerpt excerpt={excerpt} />

    return (
        <div className="xpanel">
            <div className="xpanel-header">
                {panelHeader}
            </div>
            <div className="xpanel-image">
                {panelImage}
            </div>
            <div className="xpanel-excerpt">
                {panelExcerpt}
            </div>
        </div>
    )
}

const PanelImage = ({image}) => {
    if (image) {
        const imageInfo = {
            alt: image.alt,
            src: _.get(image, 'srcNode.childImageSharp.fixedAspect.src', image.src)
        }
        return <PreviewCompatibleImage imageInfo={imageInfo} />
    }
    else {
        return null
    }
}

const PanelHeader = ({slug, title, subtitle, mobileSubtitle}) => (
    <Link to={slug}>
        <h2 className={`title is-4 upcoming-title`}><strong>{title}</strong></h2>
        <h3 className={`subtitle is-6 upcoming-subtitle is-hidden-mobile`}><strong>{subtitle}</strong></h3>
        <h3 className={`subtitle is-6 upcoming-subtitle is-hidden-tablet`}><strong>{mobileSubtitle || subtitle}</strong></h3>
    </Link>
)

const PanelExcerpt = ({excerpt}) => (
    <HTMLContentSmall content={excerpt} />
)


const getPanels = (panelData, emptyText) => {
    if (panelData.length > 0) {
        return panelData.map((el, i) => <Panel image={el.image}
                                               slug={el.slug}
                                               title={el.title}
                                               subtitle={el.subtitle}
                                               mobileSubtitle={el.mobileSubtitle}
                                               excerpt={el.excerpt}
                                               key={i} />)
    }
    return [<EmptyPanel key="1" text={emptyText || ""} />]
}

PanelExcerpt.propTypes = { excerpt: PropTypes.string }

PanelHeader.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    mobileSubtitle: PropTypes.string,
}

PanelImage.propTypes = { image: PropTypes.object }

Panel.propTypes = {
    image: PropTypes.object,
    slug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    mobileSubtitle: PropTypes.string,
    excerpt: PropTypes.string,
}

EmptyPanel.propTypes = { text: PropTypes.string }

PanelBlock.propTypes = {
    panelData: PropTypes.arrayOf(PropTypes.object).isRequired,
    emptyText: PropTypes.string,
    isViewportWidthDesktop: PropTypes.bool
}
