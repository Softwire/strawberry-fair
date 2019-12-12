import React from 'react'
import Img from 'gatsby-image'

<<<<<<< HEAD
import { previewCompatibleImageValidator } from './validators'

const PreviewCompatibleImage = ({ imageInfo }) => {
=======
const PreviewCompatibleImage = ({ imageInfo, style }) => {
>>>>>>> sf-17-revisions
  if (!imageInfo) {
    return null
  }

  const imageStyle = (style ? style : { borderRadius: '5px' })
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  if (!!imageInfo.value && typeof imageInfo.value === 'string')
    return <img style={imageStyle} src={imageInfo.value} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: previewCompatibleImageValidator
}

export default PreviewCompatibleImage
