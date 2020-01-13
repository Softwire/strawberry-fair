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
    const defaultOptions = {
        placeholderProps: {},
        additionalPropsExtractor: () => {},
        previewWithLayout: true,
    }

    const { placeholderProps, additionalPropsExtractor, previewWithLayout } = Object.assign(defaultOptions, options)

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

        const layoutProps = extractLayoutPropsPreview(dataProps, additionalPropsExtractor, widgetsFor)

        const isPreview = true
        if (previewWithLayout) {
            return (
                <PreviewContextWrapper value={isPreview}>
                    <Layout heroData={layoutProps.heroData} title={layoutProps.title} subtitle={layoutProps.subtitle}>
                        {component(Object.assign(placeholderProps, previewProps))}
                    </Layout>
                </PreviewContextWrapper>
            )
        } else {
            return (
                <PreviewContextWrapper value={isPreview}>
                    {component(Object.assign(placeholderProps, previewProps))}
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
 * @param {siteAdditionalPropsExtractorCallback} additionalPropsExtractor - To extract props that are unavailable in the CMS, e.g. props living in `node.fields`
 * @returns {Function} Function that renders the component with the data passed in by Graphql, according to Gatsby convention
 */
export const site = (component, additionalPropsExtractor = () => {}) => {
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
                    <title>{layoutProps.tabTitle || layoutProps.title || 'Strawberry Fair'}</title>
                </Helmet>
                <Layout heroData={layoutProps.heroData} title={layoutProps.title} subtitle={layoutProps.subtitle}>
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
