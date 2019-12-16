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
        const toggleFields = new Map({
            label: "Active",
            name: "is-active",
            widget: "boolean",
            default: false
        })

        let active = null
        if (this.props.value &&
            this.props.value._root &&
            this.props.value._root.entries &&
            Array.isArray(this.props.value._root.entries)) {
                active = this.props.value._root.entries.find((el) => Array.isArray(el) && el[0] === "is-active")[1] || null
            }

        if (active) {
            return new Map({
                fields: [
                    toggleFields,
                    new Map({
                        label: "Banner Images",
                        name: "hero-images",
                        widget: "multi-image"
                    })
                ]
            })
        }
        else {
            return new Map({
                field: toggleFields
            })
        }
    }
}