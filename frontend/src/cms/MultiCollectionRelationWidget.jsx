import React from 'react'
import CMS from 'netlify-cms-app'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
const RelationControl = CMS.getWidget('relation').control

const separator = '/'

export class MultiCollectionRelationControl extends React.Component {
  render() {
    const collection = this.getCollection(this.props.value)
    const pageTitle = this.getPageTitle(this.props.value)

    if (!collection) {
      return (
        <div>
          <h2>What type of page would you like to add?</h2>
          <SelectionControl 
            {...this.props}
            value={collection}
            onChange={val => this.handleSelectionChange(val)}
          />
        </div>
      )
    } else if (!pageTitle) {
      let relationProps = Object.assign({}, this.props)
      relationProps.field = relationProps.field.set('collection', collection.toLowerCase())
      relationProps.value = pageTitle

      return (
        <div>
          <h2>Choose a {`<${collection}>`} page</h2>
          <RelationControl
            {...relationProps}
            value={pageTitle}
            onChange={val => this.handleRelationChange(val)}
          />
        </div>
      )
    } else {
      return (
        <div>
          <h2><strong>{this.props.value}</strong></h2>
        </div>
      )
    }
  }

  getCollection(value) {
    return value && value.includes(separator) ? value.split(separator)[0] : value
  }

  getPageTitle(value) {
    return value && value.includes(separator) ? value.split(separator)[1] : ''
  }

  handleSelectionChange(value) {
    this.props.onChange(value)
  }

  handleRelationChange(value) {
    this.props.onChange(this.getCollection(this.props.value) + separator + value)
  }

  isValid() { 
    return this.props.value.includes(separator)
  }
}

export const MultiCollectionRelationPreview = props => (
  <div dangerouslySetInnerHTML={{ __html: JSON.stringify(props.value)}} />
)
