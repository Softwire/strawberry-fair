import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'

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

        console.log(this.props.value)

        return <ListControl {...this.props} field={field} />
    }

    isValid() {
        return true
    }
}