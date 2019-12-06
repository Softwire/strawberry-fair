import React from 'react'
import ImageScrapbookRow from './ImageScrapbookRow'
import StrawberryCard from '../StrawberryCard'

const ContentBlocks = ({contentBlocks, contentBlocksHtml, BodyComponent}) => (
  <React.Fragment>
    {contentBlocks && contentBlocks.map((block, index) => (
        <ContentBlock 
          contentTitle={block.contentTitle}
          contentSubtitle={block.contentSubtitle}
          scrapbookImages={block.scrapbookImages || []}
          content={contentBlocksHtml[index]}
          sideSnippet={block.sideSnippet}
          BodyComponent={BodyComponent}
          key={index}
        />
      )
    )}
    </React.Fragment>
  )

export default ContentBlocks

const ContentBlock = ({contentTitle, contentSubtitle, scrapbookImages, content, sideSnippet, BodyComponent}) => (
  <section className="section">
    <ImageScrapbookRow scrapbookImages={scrapbookImages}/>
    <h1 className="title is-1">{contentTitle}</h1>
    <div className="columns">
      <div className="column is-three-fifths">
        <h3 className="subtitle is-5">{contentSubtitle}</h3>
      </div>
    </div>
    <div className="columns">
      <div className="column is-three-quarters">
        <BodyComponent content={content}/>
      </div>
      <div className="column">
        <StrawberryCard text={sideSnippet}/>
      </div>
    </div>
  </section>
)
