import React from 'react'
import PropTypes from 'prop-types'

import { childImageSharpValidator, previewCompatibleImageValidator } from '../validators'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { generateScrapbookImageMap, shuffle } from '../../util/generateScrapbookImageMap'
import { PreviewContext } from '../../util/context'


/** Expects an array of at least 6 images */
export const ScrapbookImages = ({images}) => (
    <PreviewContext.Consumer>
        {value => <ScrapbookImgs images={images} isPreview={value} />}
    </PreviewContext.Consumer>
)


const ScrapbookImgs = ({images, isPreview}) => {
    if (images) {
        const validImages = images.filter((img) => !!img)

        if (validImages.length >= 6) {
            const selectedImages = shuffle(validImages).slice(0, 6)
            const imageMap = generateScrapbookImageMap(selectedImages, isPreview)
            const outerCols = imageMap.map((outerColMap, idx) => (
                <OuterColumn
                        outerColMap={outerColMap}
                        position={(idx === 0 ? "left-top" : "right-bottom")}
                        key={idx} />
            ))

            return (
                <div className="columns scrapbook-columns">
                    {outerCols}
                </div>
            )
        }
    }
    return null
}

const OuterColumn = ({outerColMap, position}) => (
    <div className={`column scrapbook-column outer-column ${position}`}>
        <div className="columns scrapbook-columns is-mobile">
            {outerColMap.map((innerColMap, idx) => <InnerColumn innerColMap={innerColMap}
                                                                position={position}
                                                                key={idx} />)}
        </div>
    </div>
)

const InnerColumn = ({innerColMap: {width, images}, position}) => (
    <div className={`column scrapbook-column inner-column ${width} ${position}`}>
        <div className = "columns scrapbook-columns is-multiline">
            {images.map((img, idx) => <ScrapbookImg image={img} key={idx} />)}
        </div>
    </div>
)

const ScrapbookImg = ({image}) => (
    <div className="column scrapbook-column is-full">
        <PreviewCompatibleImage imageInfo={image} />
    </div>
)

ScrapbookImg.propTypes = {
    image: previewCompatibleImageValidator
}

InnerColumn.propTypes = { innerColMap: PropTypes.shape({
    width: PropTypes.string,
    images: PropTypes.arrayOf(previewCompatibleImageValidator)
})}

OuterColumn.propTypes = {
    outerColMap: PropTypes.arrayOf(InnerColumn.propTypes.innerColMap),
    position: PropTypes.string
}

ScrapbookImgs.propTypes = {
    images: PropTypes.arrayOf(childImageSharpValidator),
    isPreview: PropTypes.bool
}

ScrapbookImages.propTypes = { images: ScrapbookImgs.propTypes.images }