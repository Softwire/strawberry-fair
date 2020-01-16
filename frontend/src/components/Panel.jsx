import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { useViewportWidth } from '../util/useViewportWidth'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { HTMLContentSmall } from './Content'

const bulmaTabletWidthMixin = 769


// Component used in News Archive, Upcoming Events & Calendar Day Modal
// CSS classes use name "xpanel" to distinguish from Bulma panel class
export const PanelBlock = ({panelData, emptyText, isViewportWidthDesktop}) => {

    const isMobile = useViewportWidth() <= bulmaTabletWidthMixin
    const panels = getPanels(panelData, emptyText, isMobile)
    const isViewportWidth = isMobile || isViewportWidthDesktop
    const wrappedPanels = getWrappedPanels(panels, isViewportWidth)

    return (
        <div className={`xpanel-block ${isViewportWidth ? "is-viewport-width" : ""}`}>
            {wrappedPanels}
        </div>
    )
}

const WrappedPanel = ({withContainer, panel}) => {
    if (withContainer) {
        return (
            <div className="xpanel-background">
                <div className="container">
                    {panel}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="xpanel-background">
                {panel}
            </div>
        )
    }
}

const EmptyPanel = ({text}) => {
    return (
        <div className="xpanel">
            {text}
        </div>
    )
}

const Panel = ({image, slug, title, subtitle, mobileSubtitle, excerpt, isMobile}) => {

    const panelImage = <PanelImage image={image} />
    const panelHeader = <PanelHeader slug={slug}
                                     title={title}
                                     subtitle={(isMobile && mobileSubtitle) ? mobileSubtitle : subtitle}
                                     subSize={isMobile ? 6 : 5} />
    const panelExcerpt = <PanelExcerpt excerpt={excerpt} />

    if (isMobile) {
        return (
            <div className="columns is-mobile is-multiline xpanel">
                <div className="column is-full xpanel-header">
                    {panelHeader}
                </div>
                {!!image && <div className="column is-full xpanel-image">
                                {panelImage}
                            </div>}
                <div className="column is-full xpanel-excerpt">
                    {panelExcerpt}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="columns xpanel">
                <div className="column is-3 xpanel-image left-column-desktop">
                    {panelImage}
                </div>
                <div className="column right-column-desktop">
                    <div className="columns is-multiline">
                        <div className="column is-full xpanel-header">
                            {panelHeader}
                        </div>
                        <div className="column is-full xpanel-excerpt">
                            {panelExcerpt}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
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

const PanelHeader = ({slug, title, subtitle, subSize}) => (
    <Link to={slug}>
        <h2 className={`title is-4 upcoming-title`}><strong>{title}</strong></h2>
        <h3 className={`subtitle is-${subSize} upcoming-subtitle`}><strong>{subtitle}</strong></h3>
    </Link>
)

const PanelExcerpt = ({excerpt}) => (
    <HTMLContentSmall content={excerpt} />
)


const getPanels = (panelData, emptyText, isMobile) => {
    if (panelData.length > 0) {
        return panelData.map((el, i) => <Panel image={el.image}
                                               slug={el.slug}
                                               title={el.title}
                                               subtitle={el.subtitle}
                                               mobileSubtitle={el.mobileSubtitle}
                                               excerpt={el.excerpt}
                                               isMobile={isMobile}
                                               key={i} />)
    }
    return [<EmptyPanel text={emptyText} />]
}

const getWrappedPanels = (panels, withContainer) => (
    panels.map((panel) => <WrappedPanel panel={panel} withContainer={withContainer} />)
)


PanelExcerpt.propTypes = { excerpt: PropTypes.string }

PanelHeader.propTypes = {
    slug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    subSize: PropTypes.number
}

PanelImage.propTypes = { image: PropTypes.object }

Panel.propTypes = {
    image: PropTypes.object,
    slug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    mobileSubtitle: PropTypes.string,
    excerpt: PropTypes.string,
    isMobile: PropTypes.bool
}

EmptyPanel.propTypes = { text: PropTypes.string }

WrappedPanel.propTypes = {
    panel: PropTypes.element,
    withContainer: PropTypes.bool
}

PanelBlock.propTypes = {
    panelData: PropTypes.arrayOf(PropTypes.object),
    emptyText: PropTypes.string,
    isViewportWidthDesktop: PropTypes.bool
}
