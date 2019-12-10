import React from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from '../PreviewCompatibleImage'

const numCols = 4;
const numDoubleRowCols = 1;

const ImageScrapbookRow = ({scrapbookImages: images}) => {
  const selectedImages = selectImages(images)

  let imageCols = [
    <ColumnWithTwoImages size="is-one-fifth" topImage={selectedImages[0]} bottomImage={selectedImages[1]} key={0}/>,
    <ColumnWithOneImage size="is-one-quarter" image={selectedImages[2]} key={1}/>,
    <ColumnWithOneImage size="is-one-quarter" image={selectedImages[3]} key={2}/>,
    <ColumnWithOneImage image={selectedImages[4]} key={3}/>,
  ]

  const colWithTwoRows = getRandomInt(numCols)
  swap(imageCols, colWithTwoRows, 0)

  return (
    <div className="columns is-mobile">
      {imageCols}
    </div>
  )
}

ImageScrapbookRow.propTypes = {
  scrapbookImages: PropTypes.array  // TODO: Be more specific
}

export default ImageScrapbookRow

const selectImages = (images) => {
  const copiedImages = Array.from(images)
  const selectedImages = []

  for(let i = 0; i< numCols + numDoubleRowCols; i++) {
      const nextIndex = getRandomInt(copiedImages.length)
      selectedImages.push(copiedImages[nextIndex])
      copiedImages.splice(nextIndex, 1)
  }

  return selectedImages
}

const swap = (array, i, j ) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

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

ColumnWithTwoImages.propTypes = {
  topImage: PreviewCompatibleImage.propTypes.imageInfo,
  bottomImage: PreviewCompatibleImage.propTypes.imageInfo,
  size: PropTypes.string
}

/**
 * @param {String} size - Bulma size for columns, leave blank to fill remaining space 
 */
const ColumnWithOneImage = ({image, size = ""}) => (
  <figure className={`column ${size} scrapbook-image`}>
    <PreviewCompatibleImage imageInfo={image} />
  </figure>
)

ColumnWithOneImage.propTypes = {
  image: PreviewCompatibleImage.propTypes.imageInfo,
  size: PropTypes.string
}
