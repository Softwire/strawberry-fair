import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'


const ObjectControl = CMS.getWidget("object").control

export class AccessibleImageControl extends React.Component {
    render() {
        const fields = new Map({
            fields: [
                new Map({
                    label: "Description",
                    name: "alt",
                    widget: "string"
                }),
                new Map({
                    label: "Image File",
                    name: "src",
                    widget: "image"
                }),
            ]
        })

        return <ObjectControl {...this.props} field={fields} />
    }
}

export const AccessibleImagePreview = ({value}) => <div>{value}</div>