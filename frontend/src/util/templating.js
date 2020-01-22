import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import _ from 'lodash'

import { Content } from '../components/Content'
import { PreviewContextWrapper } from './context'
import { Layout } from '../components/Layout'


/**
 * @callback previewAdditionalPropsExtractorCallback
 * @param {Object} dataProps - Contains results from CMS entries
 * @param {Object} cmsUtilityFns - Object of CMS utility functions
 * @returns {Object} Additional properties to add to the preview component
 */

/**
 * This function prepares a page template for use as a CMS preview component.
 * It maps props from the CMS preview format to that expected by a "normal" React component.
 * @param {Object} component - Template component to preview
 * @param {Object} options - Object containing options settings
 * @param {Object} options.placeholderProps - For insertion of props that are unavailable in the CMS
 * @param {previewAdditionalPropsExtractorCallback} options.additionalPropsExtractor - To extract props that are unavailable in the CMS, e.g. props living in `node.fields`
 * @param {Boolean} options.previewWithLayout - Determines whether to render the preview with the Layout component
 * @returns {Function} Function to be passed into the CMS.registerPreviewTemplate(...) function
 */
export const preview = (component, options = {}) => {
    const { placeholderProps = {}, additionalPropsExtractor = () => {}, previewWithLayout = true } = options

    /**
     * @param {Object} entry.data - The data read from the CMS in Immutable.js object
     * @param {Function} widgetFor - Utility function provided by the CMS
     * @param {Function} widgetsFor - Utility function provided by the CMS
     */
    const previewComponent = ({ entry, widgetFor, widgetsFor }) => {
        const dataProps = entry.getIn(['data']).toJS()
        const previewProps = {}

        try {
            previewProps.content = widgetFor('body')
        } catch (error) {
            // This means our markdown file doesn't have a body
            previewProps.content = ""
        }
        
        previewProps.contentComponent = Content

        Object.assign(previewProps, additionalPropsExtractor(dataProps, { widgetsFor }))
        Object.assign(previewProps, dataProps)
        const componentWithProps = component(Object.assign(placeholderProps, previewProps))

        const layoutProps = extractLayoutPropsPreview(dataProps, additionalPropsExtractor, widgetsFor)

        const isPreview = true
        if (previewWithLayout) {
            return (
                <PreviewContextWrapper value={isPreview}>
                    <Layout heroData={layoutProps.heroData} title={layoutProps.title} subtitle={layoutProps.subtitle}>
                        {componentWithProps}
                    </Layout>
                </PreviewContextWrapper>
            )
        } else {
            return (
                <PreviewContextWrapper value={isPreview}>
                    {componentWithProps}
                </PreviewContextWrapper>
            )
        }
    }

    previewComponent.propTypes = {
        entry: PropTypes.object,
        widgetFor: PropTypes.func,
        widgetsFor: PropTypes.func,
        getAsset: PropTypes.func
    }

    return previewComponent
}

/**
 * @callback siteAdditionalPropsExtractorCallback
 * @param {Object} dataProps - Contains results from the graphql query
 * @param {Object} pageContext - Extra page properties, passed in by e.g. gatsby-node.js for programmatic page creation
 * @returns {Object} Additional properties to add to the site component
 */

/**
 * This function prepares a page template for use by GatsbyJS.
 * It maps props from the graphql response format to that expected by a "normal" React component.
 * @param {Object} component - Component to preview, e.g. "home-page"
 * @param {Object} options - Object containing options settings
 * @param {siteAdditionalPropsExtractorCallback} options.additionalPropsExtractor - To extract props that are unavailable in the CMS, e.g. props living in `node.fields`
 * @param {Bool} options.isNarrow - Determines if page width is narrow or default
 * @returns {Function} Function that renders the component with the data passed in by Graphql, according to Gatsby convention
 */
export const site = (component, options = {}) => {
    const { additionalPropsExtractor = () => {}, isNarrow = false } = options

    /**
     * @param {Object} data - Data retrieved from GraphQL query specified in the component
     * @returns {React.Component} Component to be rendered by Gatsby
     */
    const siteComponent = ({data, pageContext}) => {
        const insideLayout = siteInsideLayout(component, data, pageContext, additionalPropsExtractor)
        const layoutProps = extractLayoutProps(data, pageContext, additionalPropsExtractor)

        return (
            <React.Fragment>
                <Helmet>
                    <meta name="twitter:dnt" content="on" />
                    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                    <title>{layoutProps.tabTitle || layoutProps.title || 'Strawberry Fair'}</title>
                </Helmet>
                <Layout heroData={layoutProps.heroData} title={layoutProps.title} subtitle={layoutProps.subtitle} isNarrow={isNarrow}>
                    {insideLayout}
                </Layout>
            </React.Fragment>
        )
    }

    siteComponent.propTypes = {
        data: PropTypes.object,
        pageContext: PropTypes.object
    }

    return siteComponent
}

// Generate a view of the site to be wrapped inside <Layout>
const siteInsideLayout = (component, data = {}, pageContext = {}, additionalPropsExtractor = () => {}) => {
    const newProps = {}

    if (data.markdownRemark) {
        Object.assign(newProps, data.markdownRemark.frontmatter)
        newProps.content = data.markdownRemark.html
        newProps.pageContext = pageContext
        if (data.markdownRemark.fields && data.markdownRemark.fields.slug) {
            newProps.slug = data.markdownRemark.fields.slug
        }
    } else {
        Object.assign(newProps, pageContext)
    }

    if (_.has(data.heroData, 'nodes[0].frontmatter.heroData')) {
        newProps.heroData = data.heroData.nodes[0].frontmatter.heroData
    }
        
    Object.assign(newProps, additionalPropsExtractor(data, pageContext))

    return component(newProps)
}

// Extract hero image data, a title, and a subtitle (if present) from a GraphQL query data object to be passed to <Layout>
const extractLayoutProps = (data = {}, pageContext = {}, additionalPropsExtractor = () => {}) => {
    const layoutProps = {}

    if (_.has(data.markdownRemark, 'frontmatter')) {
        layoutProps.title = data.markdownRemark.frontmatter.title
        layoutProps.subtitle = data.markdownRemark.frontmatter.subtitle
    }

    if (data.heroData) {
        layoutProps.heroData = _.get(data.heroData.nodes, '[0].frontmatter.heroData', data.heroData)
    }

    Object.assign(layoutProps, additionalPropsExtractor(data, pageContext))

    return layoutProps
}

// The data object is structured differently for previews
const extractLayoutPropsPreview = (previewData, additionalPropsExtractor, widgetsFor) => {
    return extractLayoutProps({
        markdownRemark: {
            frontmatter: {
                title: previewData.title,
                subtitle: previewData.subtitle
            }
        },
        heroData: previewData.heroData
    }, {}, data => additionalPropsExtractor(data, { widgetsFor }))
}
