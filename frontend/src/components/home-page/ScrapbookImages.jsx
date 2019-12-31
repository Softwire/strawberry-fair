import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { childImageSharpValidator } from '../validators'

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

ScrapbookImages.propTypes = { images: PropTypes.arrayOf(childImageSharpValidator) }

const SquareImage = ({image}) => (
    <div className="column is-full">
        <Img fluid={{...image.childImageSharp.fluid, aspectRatio: 1}} />
    </div>
)

SquareImage.propTypes = { image: childImageSharpValidator }

const InnerColumn = ({innerCol: {width, images}}) => (
    <div className={`column ${width}`}>
        <div className = "columns is-multiline">
            {images.map((img, idx) => <SquareImage image={img} key={idx} />)}
        </div>
    </div>
)

InnerColumn.propTypes = { innerCol: PropTypes.shape({
    width: PropTypes.number,
    images: PropTypes.arrayOf(SquareImage.propTypes.image)
})}

const OuterColumn = ({outerCol}) => (
    <div className="column">
        <div className="columns is-mobile">
            {outerCol.map((innerCol, idx) => <InnerColumn innerCol={innerCol} key={idx} />)}
        </div>
    </div>
)

OuterColumn.propTypes = { outerCol: PropTypes.arrayOf(InnerColumn.propTypes.innerCol) }

const generateColumnData = (imgs) => {
    const widths = deepShuffle([["is-4", "is-8"], ["is-two-fifths", "is-three-fifths"], ["is-5", "is-7"]])
    const allImages = shuffle(imgs)

    // Array of two outer columns
    return Array(2).fill().map((_, i) => (
        
        // Array of two inner columns
        Array(2).fill().map((_, j) => {

            // Assign width and single image to each inner column
            const width = widths[i][j]
            const images = [allImages.pop()]

            // Always assign a second image if width is is-4
            // Randomly determine whether to assign a second image for other narrow columns
            if ((width === "is-4") || ((width === "is-two-fifths" || width === "is-5") && (Math.random() >= 0.5))) {
                images.push(allImages.pop())
            }

            return { width: width, images: images }
        })
    ))
}

const shuffle = (arr) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = getRandInt(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

const deepShuffle = (arr) => {
    const shuffled = arr.map((nestedArr) => shuffle(nestedArr))
    return shuffle(shuffled)
}

// 0 <= randInt < max
const getRandInt = (max) => Math.floor(Math.random() * max)