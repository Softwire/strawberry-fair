import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { previewCompatibleImageValidator } from './validators'

const PreviewCompatibleImage = ({ imageInfo, style }) => {

  if (!imageInfo) {
    return null
  }

  const imageStyle = (style ? style : {})
  const { alt = '', childImageSharp, image, src, srcFile } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!srcFile && !!srcFile.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={srcFile.childImageSharp.fluid} alt={alt} />
    )
  }
  if (!!src && !!src.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={src.childImageSharp.fluid} alt={alt} />
    )
  }

  if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }
  
  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  // Deals with CMS previews of compound images with an alt and src field
  if (!!src && typeof src === 'object')
    return <img style={imageStyle} src={src.path} alt={alt} />

  // Deals with CMS previews of images nested within widgets
  if (!!image && typeof image === 'object' && image.path)
    return <img style={imageStyle} src={image.path} alt={alt} />

  if (!!imageInfo.value && typeof imageInfo.value === 'string')
    return <img style={imageStyle} src={imageInfo.value} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: previewCompatibleImageValidator,
  style: PropTypes.object
}

export default PreviewCompatibleImage
