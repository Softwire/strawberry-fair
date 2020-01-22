import React from 'react'
import CMS from 'netlify-cms-app'
import { List, Map } from 'immutable'
import { extractList, queryObjectChild } from './queryNestedWidgets'

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
        if (!this.props.value) {
            return false // A default Netlify error message appears
        }

        if (this.props.value.size < 6) {
            return { error: { message: "At least six images must be uploaded." } }
        }

        for (const image of extractList(this.props.value)) {
            if (!queryObjectChild(image, "alt")) {
                return { error: { message: "Some image descriptions are missing." } }
            }
            if (!queryObjectChild(image, "src")) {
                return { error: { message: "Some image files are missing." } }
            }
        }

        return true
    }
}