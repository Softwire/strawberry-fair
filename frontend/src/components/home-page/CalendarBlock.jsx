import React from 'react'

import BaseBlock from './BaseBlock'

const CalendarBlock = ({calendarBlock}) => (
  <BaseBlock block={calendarBlock} altBackground={true}>
    <UpcomingEventsDisplay upcomingEvents={calendarBlock.upcomingEvents || "Hello"}/>
  </BaseBlock>
)

export default CalendarBlock

const UpcomingEventsDisplay = ({upcomingEvents}) => (
  <div className="columns is-multiline">
    {new Array(8).fill('hello')
      .map((x, index) => (
        <div className="column is-half" key={index}>
          <div className="box">
            {x + String(index)}
          </div>
        </div>
        )
      )
    }
  </div>
)