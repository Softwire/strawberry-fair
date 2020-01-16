import React from 'react'

import BaseBlock from './BaseBlock'

const TwitterBlock = ({twitterBlock}) => (
  <BaseBlock block={twitterBlock}>
    <div className="columns is-centered">
      <div className="column is-9">
        <a className="twitter-timeline" data-height="700" data-dnt="true" href="https://twitter.com/strawberry_fair">
          Tweets by Strawberry Fair
        </a>
      </div>
    </div>
  </BaseBlock>
)

TwitterBlock.propTypes = {
  twitterBlock: BaseBlock.propTypes.block
}

export default TwitterBlock
