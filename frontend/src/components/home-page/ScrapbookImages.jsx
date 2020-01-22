import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { childImageSharpValidator, previewCompatibleImageValidator } from '../validators'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import { generateScrapbookImageMap, shuffle } from '../../util/generateScrapbookImageMap'
import { PreviewContext } from '../../util/context'

const useScrapbookLayout = (images, isPreview) => {
    const [imageMap, setImageMap] = useState(null)

    useEffect(() => {
        const selectedImages = shuffle(images).slice(0, 6)
        setImageMap(generateScrapbookImageMap(selectedImages, isPreview))
    }, [images])

    return imageMap
}

/** Expects an array of at least 6 images */
export const ScrapbookImages = ({images}) => {
    const validImages = images.filter((image) => image.src || image.srcNode)
    if (validImages.length < 6) {
        return null
    }
    return (
        <PreviewContext.Consumer>
            {value => <ScrapbookImgs images={validImages} isPreview={value} />}
        </PreviewContext.Consumer>
    )
}

const ScrapbookImgs = ({images, isPreview}) => {
    const imageMap = useScrapbookLayout(images, isPreview)

    if (imageMap === null) {
        return null
    }

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

const OuterColumn = ({outerColMap: {width, images}, position}) => (
    <div className={`column scrapbook-column outer-column ${width} ${position}`}>
        <div className="columns scrapbook-columns is-mobile">
            {images.map((innerColMap, idx) => <InnerColumn innerColMap={innerColMap}
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

const ScrapbookImg = ({image}) => {
    return (
        <div className="column scrapbook-column is-full">
            <PreviewCompatibleImage imageInfo={image} />
        </div>
    )
}

ScrapbookImg.propTypes = {
    image: previewCompatibleImageValidator
}

InnerColumn.propTypes = { 
    innerColMap: PropTypes.shape({
        width: PropTypes.string,
        images: PropTypes.arrayOf(previewCompatibleImageValidator),
    }),
    position: PropTypes.string
}

OuterColumn.propTypes = {
    outerColMap: PropTypes.shape({
        width: PropTypes.string,
        images: PropTypes.arrayOf(InnerColumn.propTypes.innerColMap)
    }),
    position: PropTypes.string
}

ScrapbookImgs.propTypes = {
    images: PropTypes.arrayOf(childImageSharpValidator),
    isPreview: PropTypes.bool
}

ScrapbookImages.propTypes = { images: ScrapbookImgs.propTypes.images }