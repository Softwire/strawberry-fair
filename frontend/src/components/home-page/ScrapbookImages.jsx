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
 * @param {Array} images - Expects at least 6 images
*/
export const ScrapbookImages = ({images}) => {
    if (images && images.length >= 6) {
        return (
            <div className="columns">
                {generateColumnData(images).map((outerCol, idx) => <OuterColumn outerCol={outerCol} key={idx} />)}
            </div>
        )
    }
    return null
}

ScrapbookImages.propTypes = { images: PropTypes.arrayOf(PreviewCompatibleImage.propTypes.imageInfo) }

const InnerColumn = ({innerCol: {width, images}}) => (
    <div className={`column is-${width}`}>
        {images.map((img, idx) => <PreviewCompatibleImage imageInfo={img} key={idx} />)}
    </div>
)

InnerColumn.propTypes = { innerCol: PropTypes.shape({
    width: PropTypes.number,
    images: PropTypes.arrayOf(PreviewCompatibleImage.propTypes.imageInfo)
})}

const OuterColumn = ({outerCol}) => (
    <div className="column">
        <div className="columns is-mobile">
            {outerCol.map((innerCol, idx) => <InnerColumn innerCol={innerCol} key={idx} />)}
        </div>
    </div>
)

OuterColumn.propTypes = { outerCol: PropTypes.arrayOf(InnerColumn.propTypes.innerCol) }

const generateColumnData = (images) => {
    const innerCol = () => ({ width: null, images: null })
    const outerCol = () => ([innerCol(), innerCol()])
    const data = [outerCol(), outerCol()]

    assignWidths(data)
    assignImages(data, images)
    
    return data
}

const assignWidths = (data) => {
    // Columns within a Bulma column block have integer widths totalling 12
    const widths = [ 4, 5, 7, 8 ]
    
    data.forEach((outerCol) => {
        // Select a random value from possible widths
        const rand = widths[getRandInt(widths.length)]

        // Assign widths
        outerCol[0].width = rand
        outerCol[1].width = 12 - rand

        // Prevent duplication of widths
        widths.splice(widths.indexOf(rand), 1)
        widths.splice(widths.indexOf(12 - rand), 1)
    })
}

const assignImages = (data, allImages) => {
    shuffle(allImages)
    data.forEach((outerCol) => {
        outerCol.forEach((innerCol) => {
            // Assign a single image
            innerCol.images = [allImages.pop()]

            // For narrower columns, randomly decide whether to assign a second image
            if (innerCol.width < 6 && Math.random() >= 0.5) {
                innerCol.images.push(allImages.pop())
            }
        })
    })
}

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = getRandInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

// 0 <= randInt < max
const getRandInt = (max) => Math.floor(Math.random() * max)