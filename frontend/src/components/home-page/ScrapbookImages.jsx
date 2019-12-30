import React from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from '../PreviewCompatibleImage'

/**
 * Component built using Bulma columns.
 * It contains two outer columns of equal size that render side-by-side on desktop, but are stacked on mobile.
 * Each outer column contains two inner columns, where all four inner columns have randomised and differing widths.
 * The two wider inner columns always contain one image only, but the thinner columns are randomly assigned one or two images.
 * All images are rendered square.
 * 
 * @param {Array} images - Expects 6 images
*/
export const ScrapbookImages = ({images}) => (
    <div className="columns">
        {generateColumnData(images).forEach((outerCol) => <OuterColumn outerCol={outerCol} />)}
    </div>
)

ScrapbookImages.propTypes = { images: PropTypes.arrayOf(PreviewCompatibleImage.propTypes.imageInfo) }

const OuterColumn = ({outerCol}) => (
    <div className="column">
        <div className="columns is-mobile">
            {outerCol.forEach((innerCol) => <InnerColumn innerCol={innerCol} />)}
        </div>
    </div>
)

OuterColumn.propTypes = { outerCol: PropTypes.arrayOf(InnerColumn.propTypes) }

const InnerColumn = ({innerCol: {width, images}}) => (
    <div className={`column is-${width}`}>
        {images.map((img) => <PreviewCompatibleImage imageInfo={img} />)}
    </div>
)

InnerColumn.propTypes = { width: PropTypes.number, images: PropTypes.arrayOf(PreviewCompatibleImage.propTypes.imageInfo) }

const generateColumnData = (images) => {
    const innerCol = () => ({ width, images })
    const outerCol = () => ([innerCol(), innerCol()])
    const data = [outerCol(), outerCol()]

    assignWidths(data)
    assignImages(data, images)
    
    return data
}

const assignWidths = (data) => {
    // Columns within a Bulma column block have integer widths totalling 12
    const widths = [ 3, 4, 5, 7, 8, 9 ]
    
    data.forEach((outerCol) => {
        // Select a random value from possible widths
        const rand = widths[Math.floor(Math.random() * widths.length)]

        // Assign widths
        outerCol[0].width = rand
        outerCol[1].width = 12 - rand

        // Prevent duplication of widths
        widths.splice(widths.indexOf(rand))
        widths.splice(widths.indexOf(12 - rand))
    })
}

const assignImages = (data, allImages) => {
    data.forEach((outerCol) => {
        outerCol.forEach((innerCol) => {
            // Assign a single image
            innerCol.images = [allImages.pop()]

            // For narrower columns, randomly decide whether to assign a second image
            if (Math.random() >= 0.5) {
                innerCol.images.push(allImages.pop())
            }
        })
    })
}