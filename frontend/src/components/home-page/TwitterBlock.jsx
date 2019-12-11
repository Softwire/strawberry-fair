import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

import BaseBlock from './BaseBlock'

const TwitterBlock = ({twitterBlock}) => (
  <BaseBlock block={twitterBlock}>
    <div className="columns is-centered">
      <div className="column is-9">
        <div className="box">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="strawberry_fair"
            options={{height: 450}}
          />
        </div>
      </div>
    </div>
  </BaseBlock>
)

export default TwitterBlock
