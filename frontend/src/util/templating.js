import { Content } from '../components/Content'

// This function prepares a page template for use as a CMS preview component.
// It maps props from the CMS preview format to that expected by a "normal" React component.
export const preview = (component, placeholderProps = {}) => ({ entry, widgetFor, getAsset }) => {
    const dataProps = entry.getIn(['data']).toObject()
    const previewProps = {}
    previewProps.content = widgetFor('body')
    previewProps.contentComponent = Content

    // For image data, call getAsset to get the correct image object.
    Object.entries(dataProps)
        .forEach(([key, value]) => previewProps[key] = (
            (typeof value === 'string' || value instanceof String) && value.startsWith('/img/')
            ) ? getAsset(value) : value);
    
    return component(Object.assign(placeholderProps, previewProps))
}


// This function prepares a page template for use by GatsbyJS.
// It maps props from the graphql response format to that expected by a "normal" React component.
export const site = (component, additionalPropsExtractor = graphqlData => {}) => ({data}) => {
    const new_props = data.markdownRemark.frontmatter
    new_props.content = data.markdownRemark.html
    return component(Object.assign(new_props, additionalPropsExtractor(data)))
}
