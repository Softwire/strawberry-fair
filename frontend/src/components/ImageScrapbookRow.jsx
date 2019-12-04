import React from 'react'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const ImageScrapbookRow = ({scrapbookImages}) => {
  return (
    <div className="columns is-mobile">
      <RowWithTwoImages topImage={scrapbookImages.pop()} bottomImage={scrapbookImages.pop()}/>
      <div className="column is-one-third scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages.pop()} />
      </div>
      <div className="column is-one-fifth scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages.pop()} />
      </div>
      <div className="column scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages.pop()} />
      </div>
    </div>
  )
}

const RowWithTwoImages = ({topImage, bottomImage}) => (
  <div className="column is-one-fifth scrapbook-image">
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-parent">
        <div className="tile is-child">
          <PreviewCompatibleImage imageInfo={topImage} />
        </div>
        <div className="tile is-child">
          <PreviewCompatibleImage imageInfo={bottomImage} />
        </div>
      </div>
    </div>
  </div>
)


export default ImageScrapbookRow
