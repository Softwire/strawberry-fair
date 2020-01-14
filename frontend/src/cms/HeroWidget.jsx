import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'
import { queryObjectChild } from './queryNestedWidgets'
import PropTypes from 'prop-types'

const ObjectControl = CMS.getWidget("object").control

export class HeroControl extends React.Component {
    render() {
        return <ObjectControl {...this.props} onChange={val => this.handleChange(val)} field={this.getFields()} />
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
        
        if (queryObjectChild(this.props.value, "isActive")) {
            return new Map({
                fields: [
                    toggleFields,
                    new Map({
                        label: "Banner Images",
                        name: "heroImages",
                        widget: "multiImage",
                        hint: `If you leave this empty, with no images, the banner will be filled with a random image.

                        If you provide one image, the banner will always show that image.
                        
                        If you provide more than one image, the banner will 'rotate' through those images one-by-one.`
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

HeroControl.propTypes = {
    value: PropTypes.object,
    field: PropTypes.instanceOf(Map)
}