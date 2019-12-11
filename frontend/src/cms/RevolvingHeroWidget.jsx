import React from 'react'
import CMS from 'netlify-cms-app'
import { Map } from 'immutable'


const ListControl = CMS.getWidget("list").control

export class RevolvingHeroControl extends React.Component {
    render() {
        const field = new Map({
            label: "Image",
            name: "image",
            field: new Map({
                label: "Image",
                name: "image",
                widget: "accessible-image"
            })
        })

        return <ListControl {...this.props} field={field} />
    }
}

export const RevolvingHeroPreview = ({value}) => <div>{value}</div>