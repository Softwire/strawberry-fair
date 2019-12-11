import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'


const ObjectControl = CMS.getWidget("object").control

export class HeroControl extends React.Component {
    render() {
        return <ObjectControl {...this.props} onChange={val => handleChange(val)} field={this.getFields()} />
    }

    handleChange(value) {
        this.props.value = value
        this.props.field = this.getFields()
    }

    getFields() {
        const selectFields = new Map({
            label: "Mode",
            name: "mode",
            options: ["None", "Random Image", "Fixed Image", "Revolving Images"],
            widget: "select",
            default: "None"
        })

        const mode = (this.props.value) ? this.props.value._root.entries[0][1] : null

        if (mode == "Fixed Image") {
            return new Map({
                fields: [
                    selectFields,
                    new Map({
                        label: "Image",
                        name: "fixed-hero",
                        widget: "fixed-hero"
                    })
                ]
            })
        }
        else if (mode == "Revolving Images") {
            return new Map({
                fields: [
                    selectFields,
                    new Map({
                        label: "Image",
                        name: "revolving-hero",
                        widget: "revolving-hero"
                    })
                ]
            })
        }
        else {
            return new Map({
                field: selectFields
            })
        }
    }
}

export const HeroPreview = ({value}) => <div>{value}</div>