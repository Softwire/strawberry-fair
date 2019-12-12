import React from 'react'
import { MultiImageControl } from './MultiImageWidget'


export class RevolvingHeroControl extends React.Component {
    render() {
        return <MultiImageControl {...this.props} field={field} />
    }
}

export const RevolvingHeroPreview = ({value}) => <div>{value}</div>