import React from 'react'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const ImageScrapbookRow = ({scrapbookImages}) => {
  return (scrapbookImages && 
    <div className="columns is-mobile">
      <RowWithTwoImages topImage={scrapbookImages[0]} bottomImage={scrapbookImages[1]}/>
      <div className="column is-one-third scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages[2]} />
      </div>
      <div className="column is-one-fifth scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages[3]} />
      </div>
      <div className="column scrapbook-image">
        <PreviewCompatibleImage imageInfo={scrapbookImages[4]} />
      </div>
    </div>
  )
}

const RowWithTwoImages = ({topImage, bottomImage}) => (
  <div className="column is-one-fifth scrapbook-image">
    <div className="columns is-multiline">
      <div className="column is-full scrapbook-image">
          <PreviewCompatibleImage imageInfo={topImage} />
        </div>
      <div className="column">
        <PreviewCompatibleImage imageInfo={bottomImage} />
      </div>
    </div>
  </div>
)


export default ImageScrapbookRow
