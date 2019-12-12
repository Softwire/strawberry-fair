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

        // Query mode if defined
        let mode = null
        if (this.props.value &&
            this.props.value._root &&
            this.props.value._root.entries &&
            Array.isArray(this.props.value._root.entries)) {
                mode = this.props.value._root.entries.find((el) => Array.isArray(el) && el[0] === "mode")[1] || null
            }

        if (mode === "Fixed Image") {
            return new Map({
                fields: [
                    selectFields,
                    new Map({
                        label: "Fixed Banner",
                        name: "fixed-hero",
                        widget: "accessible-image"
                    })
                ]
            })
        }
        else if (mode === "Revolving Images") {
            return new Map({
                fields: [
                    selectFields,
                    new Map({
                        label: "Revolving Banner",
                        name: "revolving-hero",
                        widget: "multi-image"
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