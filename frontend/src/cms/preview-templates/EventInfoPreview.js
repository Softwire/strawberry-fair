import React from 'react'
import { EventInfoContent } from '../../templates/event-info'
import { Content } from '../../components/Content'

export default ({ entry, widgetFor, getAsset }) => (
    <EventInfoContent
        title={entry.getIn(['data', 'title'])}
        dateTime={entry.getIn(['data', 'dateTime'])}
        isMeeting={entry.getIn(['data', 'isMeeting'])}
        content={widgetFor('body')}
        image={getAsset(entry.getIn(['data', 'image']))}
        contentComponent={Content}
    />
)