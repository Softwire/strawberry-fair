import React from 'react'
import PropTypes from 'prop-types'

import { ScrapbookImages } from './ScrapbookImages'
import { SectionWithStrawberryCard } from '../StrawberryCard'

const ContentBlock = ({contentTitle, contentSubtitle, scrapbookImages, content, strawberryTile, BodyComponent}) => (
  <section className="section home-page-section">
    <ScrapbookImages images={scrapbookImages}/>
    <h1 className="title is-3 is-size-4-mobile">{contentTitle}</h1>
    <div className="columns">
      <div className="column is-three-fifths">
        <h3 className="subtitle is-5">{contentSubtitle}</h3>
      </div>
    </div>
    <SectionWithStrawberryCard isPublic={strawberryTile.isPublic} text={strawberryTile.text}>
      <BodyComponent content={content}/>
    </SectionWithStrawberryCard>
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
