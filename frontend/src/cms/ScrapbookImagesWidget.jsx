import React from 'react'
import CMS from 'netlify-cms-app'
import { List, Map } from 'immutable'

const ListControl = CMS.getWidget("list").control

export class ScrapbookControl extends React.Component {
    render() {
        const field = new Map({
            label: "Scrapbook Images",
            name: "scrapbookImages",
            fields: new List([
                new Map({
                    label: "Description",
                    name: "alt",
                    widget: "string"
                }),
                new Map({
                    label: "Image File",
                    name: "src",
                    widget: "image"
                })
            ])
        })

        return <ListControl {...this.props} field={field} />
    }

    isValid() {
        if (this.props.value.size < 6) {
            return { error: { message: "At least six images must be uploaded." } }
        }
        return true
    }
}