import React from 'react'
import PropTypes from 'prop-types'

import { ScrapbookImages } from './ScrapbookImages'
import { StrawberryCard } from '../StrawberryCard'

const ContentBlock = ({contentTitle, contentSubtitle, scrapbookImages, content, strawberryTile, BodyComponent}) => (
  <section className="section home-page-section home-page-content-block">
    <ScrapbookImages images={scrapbookImages}/>
    <div className="columns">
      <div className="column">
        <h1 className="title is-2 is-size-3-mobile">{contentTitle}</h1>
        <h3 className="subtitle is-5">{contentSubtitle}</h3>
        <BodyComponent content={content}/>
      </div>
      <div className="column is-narrow">
        {strawberryTile.isPublic && <StrawberryCard text={strawberryTile.text} />}
      </div>
    </div>
  </section>
)

ContentBlock.propTypes = {
  contentTitle: PropTypes.node,
  contentSubtitle: PropTypes.node,
  scrapbookImages: ScrapbookImages.propTypes.images,
  content: PropTypes.node,
  strawberryTile: PropTypes.shape({
    isPublic: PropTypes.bool,
    text: PropTypes.string
  }),
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
          strawberryTile={block.strawberryTile}
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
      strawberryTile: ContentBlock.propTypes.strawberryTile,
      BodyComponent: PropTypes.elementType
    })
  ),
  contentBlocksHtml: PropTypes.arrayOf(PropTypes.string),
  BodyComponent: PropTypes.elementType
}

export default ContentBlocks
