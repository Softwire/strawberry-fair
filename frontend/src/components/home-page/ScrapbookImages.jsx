import React from 'react'
import PropTypes from 'prop-types'

import { childImageSharpValidator, previewCompatibleImageValidator } from '../validators'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { generateScrapbookImageMap, shuffle } from '../../util/generateScrapbookImageMap'


/** Expects an array of at least 6 images */
export const ScrapbookImages = ({images}) => {
    if (images && images.length >= 6) {
        const selectedImages = shuffle(images).slice(0, 6)

        return (
            <div className="columns">
                {generateScrapbookImageMap(selectedImages).map((outerColMap, idx) => <OuterColumn outerColMap={outerColMap} key={idx} />)}
            </div>
        )
    }
    return null
}

ScrapbookImages.propTypes = { images: PropTypes.arrayOf(childImageSharpValidator) }

const ScrapbookImg = ({image}) => (
    <div className="column is-full">
        <PreviewCompatibleImage imageInfo={image} />
    </div>
)

ScrapbookImg.propTypes = {
    image: previewCompatibleImageValidator
}

const InnerColumn = ({innerColMap: {width, images}}) => (
    <div className={`column ${width}`}>
        <div className = "columns is-multiline">
            {images.map((img, idx) => <ScrapbookImg image={img} key={idx} />)}
        </div>
    </div>
)

InnerColumn.propTypes = { innerColMap: PropTypes.shape({
    width: PropTypes.string,
    images: PropTypes.arrayOf(previewCompatibleImageValidator)
})}

const OuterColumn = ({outerColMap}) => (
    <div className="column">
        <div className="columns is-mobile">
            {outerColMap.map((innerColMap, idx) => <InnerColumn innerColMap={innerColMap} key={idx} />)}
        </div>
    </div>
)

OuterColumn.propTypes = { outerColMap: PropTypes.arrayOf(InnerColumn.propTypes.innerColMap) }