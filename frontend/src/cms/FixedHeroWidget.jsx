import React from 'react'
import { AccessibleImageControl } from './AccessibleImageWidget'


export class FixedHeroControl extends React.Component {
    render() {
        return <AccessibleImageControl {...this.props} />
    }
}