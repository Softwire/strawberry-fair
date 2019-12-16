import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'


const ObjectControl = CMS.getWidget("object").control

export class FormControl extends React.Component {
    render() {
        const fields = new Map({
            fields: [
                new Map({
                    label: "Display form on live site?",
                    name: "isPublic",
                    widget: "boolean"
                }),
                new Map({
                    label: "Google Form Link",
                    name: "url",
                    widget: "string"
                }),
            ]
        })

        return <ObjectControl {...this.props} field={fields} />
    }
}