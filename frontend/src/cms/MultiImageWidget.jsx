import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'


const ListControl = CMS.getWidget("list").control

export class MultiImageControl extends React.Component {
    render() {
        const field = new Map({
            label: "Multiple Images",
            name: "image-list",
            field: new Map({
                label: "Image",
                name: "image-wrapper",
                widget: "accessible-image"
            })
        })

        return <ListControl {...this.props} field={field} />
    }
}

export const MultiImagePreview = ({value}) => <div>{value}</div>