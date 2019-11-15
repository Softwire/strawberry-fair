import React from 'react'
import { HomePageContent } from '../../templates/home-page'
import Content from '../../components/Content'

export default ({ entry, widgetFor, getAsset }) => (
    <HomePageContent
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        image={getAsset(entry.getIn(['data', 'image']))}
        contentComponent={Content}
    />
)
