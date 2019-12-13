import { Content } from '../components/Content'
import { previewContextWrapper } from './context'


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
 * @param {Object} placeholderProps - For insertion of props that are unavailable in the CMS
 * @param {previewAdditionalPropsExtractorCallback} additionalPropsExtractor - To extract props that are unavailable in the CMS, e.g. props living in `node.fields`
 * @param {Object} dataProps - The data read from the CMS
 * @param {Object} cmsUtilityFns - Utility functions provided by the CMS
 * @returns {Function} Function to be passed into the CMS.registerPreviewTemplate(...) function
 */
export const preview = (component, placeholderProps = {}, additionalPropsExtractor = () => {}) => {
    /**
     * @param {Object} entry.data - The data read from the CMS in Immutable.js object
     * @param {Function} widgetFor - Utility function provided by the CMS
     * @param {Function} widgetsFor - Utility function provided by the CMS
     * @param {Function} getAsset - Utility function provided by the CMS
     */
    return ({ entry, widgetFor, widgetsFor, getAsset }) => {
        const dataProps = entry.getIn(['data']).toJS()
        const previewProps = {}

        previewProps.content = widgetFor('body')
        previewProps.contentComponent = Content

        Object.assign(previewProps, additionalPropsExtractor(dataProps, { widgetsFor }))

        // For image data, call getAsset to get the correct image object.
        deepReplaceImageUrlsWithAssets(dataProps, getAsset)
        Object.assign(previewProps, dataProps)

        const isPreview = true
        return previewContextWrapper(isPreview, component(Object.assign(placeholderProps, previewProps)))
    }
}

/**
 * Replace image urls with assets recursively for the object passed in
 * @param {Object} obj 
 * @param {Function} getAsset - Utility function provided by NetlifyCMS
 */
const deepReplaceImageUrlsWithAssets = (obj, getAsset) => {
    Object.entries(obj)
        .forEach(([key, value]) => {
            if ((typeof value === 'string' || value instanceof String) && value.startsWith('/img/')) {
                obj[key] = getAsset(value)
            } else if (typeof value === 'object' && value !== null) {
                deepReplaceImageUrlsWithAssets(value, getAsset)
            } 
        })
}

/**
 * @callback siteAdditionalPropsExtractorCallback
 * @param {Object} dataProps - Contains results from the graphql query
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
    return ({data}) => {
        const new_props = data.markdownRemark.frontmatter || {}
        new_props.content = data.markdownRemark.html
        return component(Object.assign(new_props, additionalPropsExtractor(data)))
    }
}
