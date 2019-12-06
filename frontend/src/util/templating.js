import { Content } from '../components/Content'

// This function prepares a page template for use as a CMS preview component.
// It maps props from the CMS preview format to that expected by a "normal" React component.
<<<<<<< HEAD
export const preview = (component, placeholderProps = {}, additionalPropsExtractor = (dataProps, helperFunctions) => {}) => ({ entry, widgetFor, widgetsFor, getAsset }) => {
    const dataProps = entry.getIn(['data']).toJS()
=======
export const preview = (component, placeholderProps = {}) => ({ entry, widgetFor, getAsset }) => {
    
    const dataProps = entry.getIn(['data']).toObject()
>>>>>>> sf-17
    const previewProps = {}
    previewProps.content = widgetFor('body')
    previewProps.contentComponent = Content
    Object.assign(previewProps, additionalPropsExtractor(dataProps, { widgetsFor }))

    console.table(dataProps)

    // For image data, call getAsset to get the correct image object.
<<<<<<< HEAD
    deepReplaceImageUrlsWithAssets(dataProps, getAsset)
    Object.assign(previewProps, dataProps)
=======
    const setPreviewProps = (data) => {

        Object.entries(data).forEach(([key, value]) => {
            
            if (typeof value === 'string' || value instanceof String) {
                if (value.startsWith('/img/')) {
                    previewProps[key] = getAsset(value)
                }
                else {
                    previewProps[key] = value
                }
            }
            else if (value && typeof value == "object") {
                setPreviewProps(value)
            }
        })
    }
    setPreviewProps(dataProps)
>>>>>>> sf-17

    return component(Object.assign(placeholderProps, previewProps))
}

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

// This function prepares a page template for use by GatsbyJS.
// It maps props from the graphql response format to that expected by a "normal" React component.
export const site = (component, additionalPropsExtractor = graphqlData => {}) => ({data}) => {
    const new_props = data.markdownRemark.frontmatter
    new_props.content = data.markdownRemark.html
    return component(Object.assign(new_props, additionalPropsExtractor(data)))
}
