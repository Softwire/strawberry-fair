import { Content } from '../components/Content'

// Handles data format supplied by the CMS for preview purposes
export const preview = (component, placeholderProps = {}) => ({ entry, widgetFor, getAsset }) => {
    const data_props = entry.getIn(['data']).toObject()
    const preview_props = {}

    Object.entries(data_props)
        .forEach(([key, value]) => preview_props[key] = (value.startsWith('/img/')) ? getAsset(value) : value);

    preview_props.content = widgetFor('body')
    preview_props.contentComponent = Content
    
    return component(Object.assign(placeholderProps, preview_props))
}


// Handles data format created by graphql
export const site = (component, additionalPropsExtractor = data => {}) => ({data}) => {
    const new_props = data.markdownRemark.frontmatter
    new_props.content = data.markdownRemark.html
    return component(Object.assign(new_props, additionalPropsExtractor(data)))
}
