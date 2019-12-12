import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'


const ListControl = CMS.getWidget("list").control

export class MultiImageControl extends React.Component {
    render() {
        const field = new Map({
            label: "Multiple Images",
            name: "image-list",
            fields: new List([
                new Map({
                    label: "Description",
                    name: "alt",
                    widget: "string"
                }),
                new Map({
                    label: "Image",
                    name: "src",
                    widget: "image"
                })
            ])
        })

        return <ListControl {...this.props} field={field} />
    }
}

export const MultiImagePreview = ({value}) => <div>{value}</div>