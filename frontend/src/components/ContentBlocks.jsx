import React from 'react'
import ImageScrapbookRow from './ImageScrapbookRow'

const ContentBlocks = ({contentBlocks, contentBlocksHtml, BodyComponent}) => (
  <React.Fragment>
    {contentBlocks && contentBlocks.map((block, index) => (
        <ContentBlock 
          contentTitle={block.contentTitle}
          scrapbookImages={block.scrapbookImages}
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

export const ContentBlock = ({contentTitle, scrapbookImages, content, sideSnippet, BodyComponent}) => (
<section className="section">
  <ImageScrapbookRow scrapbookImages={scrapbookImages}/>
  <h1 className="title">{contentTitle}</h1>
  <BodyComponent content={content}/>
</section>
)
