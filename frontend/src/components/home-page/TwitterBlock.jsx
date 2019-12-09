import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

import BaseBlock from './BaseBlock'

const TwitterBlock = ({twitterBlock}) => (
  <BaseBlock block={twitterBlock}>
    <div className="container">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="strawberry_fair"
        options={{height: 800}}
      />
    </div>
  </BaseBlock>
)

export default TwitterBlock
