import React from 'react'

import PreviewCompatibleImage from '../PreviewCompatibleImage'

const ImageScrapbookRow = ({scrapbookImages: images}) => (
  <div className="columns is-mobile">
    <ColumnWithTwoImages size="is-one-fifth" topImage={images[0]} bottomImage={images[1]}/>
    <ColumnWithOneImage size="is-one-third" image={images[2]}/>
    <ColumnWithOneImage size="is-one-fifth" image={images[3]}/>
    <ColumnWithOneImage image={images[4]}/>
  </div>
)

export default ImageScrapbookRow

/**
 * @param {String} size - Bulma size for columns, leave blank to fill remaining space 
 */
const ColumnWithTwoImages = ({topImage, bottomImage, size}) => (
  <div className={`column ${size} scrapbook-image`}>
    <div className="columns is-multiline">
      <figure className="column is-full scrapbook-image">
        <PreviewCompatibleImage imageInfo={topImage} />
      </figure>
      <figure className="column">
        <PreviewCompatibleImage imageInfo={bottomImage} />
      </figure>
    </div>
  </div>
)

/**
 * @param {String} size - Bulma size for columns, leave blank to fill remaining space 
 */
const ColumnWithOneImage = ({image, size = ""}) => (
  <figure className={`column ${size} scrapbook-image`}>
    <PreviewCompatibleImage imageInfo={image} />
  </figure>
)

