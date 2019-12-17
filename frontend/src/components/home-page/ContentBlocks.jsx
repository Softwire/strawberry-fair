import React from 'react'
import PropTypes from 'prop-types'

import ImageScrapbookRow from './ImageScrapbookRow'
import { StrawberryCard } from '../StrawberryCard'

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

ContentBlock.propTypes = {
  contentTitle: PropTypes.node,
  contentSubtitle: PropTypes.node,
  scrapbookImages: ImageScrapbookRow.propTypes.scrapbookImages,
  content: PropTypes.node,
  sideSnippet: PropTypes.string,
  BodyComponent: PropTypes.elementType
}

const ContentBlocks = ({contentBlocks, contentBlocksHtml, BodyComponent}) => (
  <React.Fragment>
    {contentBlocks && contentBlocks.map((block, index) => (
        <ContentBlock 
          contentTitle={block.title}
          contentSubtitle={block.subtitle}
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

ContentBlocks.propTypes = {
  contentBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: ContentBlock.propTypes.contentTitle,
      subtitle: ContentBlock.propTypes.contentSubtitle,
      scrapbookImages: ContentBlock.propTypes.scrapbookImages,
      sideSnippet: ContentBlock.propTypes.sideSnippet,
      BodyComponent: PropTypes.elementType
    })
  ),
  contentBlocksHtml: PropTypes.arrayOf(PropTypes.string),
  BodyComponent: PropTypes.elementType
}

export default ContentBlocks
