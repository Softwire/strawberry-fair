import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'

// Following https://www.netlify.com/blog/2017/06/20/extending-netlify-cms-part-one-custom-widgets/

const SelectionControl = CMS.getWidget('select').control
const RelationControl = CMS.getWidget('relation').control

const separator = '/'

export class LinkControl extends React.Component {
  render() {
    const field = new Map({options: new List(["first", "second"])})
    return (<SelectionControl {...this.props} field={field}

    />)
  }
}

export const LinkPreview = props => (
  <div dangerouslySetInnerHTML={{ __html: "Link: " + JSON.stringify(props.value)}} />
)
