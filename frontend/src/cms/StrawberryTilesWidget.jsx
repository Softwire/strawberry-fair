import React from 'react'
import CMS from 'netlify-cms-app'
import { Map, List } from 'immutable'


const ListControl = CMS.getWidget("list").control

export class StrawberryTilesControl extends React.Component {
    render() {
        const field = new Map({
            label: "Tile",
            name: "tile",
            field: new Map({
                label: "Text",
                name: "text",
                widget: "string",
                pattern: ["[\s\S]{0,200}", "200 characters max"]
            })
        })

        return <ListControl {...this.props} field={field} />
    }
}