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
            name: "isActive",
            widget: "boolean",
            default: false
        })

        let active = null
        if (this.props.value &&
            this.props.value._root &&
            this.props.value._root.entries &&
            Array.isArray(this.props.value._root.entries)) {
                for (const el of this.props.value._root.entries) {
                    if (el[0] == "isActive") {
                        active = el[1]
                        break
                    }
                }
            }

        if (active) {
            return new Map({
                fields: [
                    toggleFields,
                    new Map({
                        label: "Banner Images",
                        name: "heroImages",
                        widget: "multiImage"
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