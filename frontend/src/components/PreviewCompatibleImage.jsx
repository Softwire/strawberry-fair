import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import { gatsbyImageSharpFluidValidator } from './validators'

export const childImageSharpValidator = PropTypes.shape({
  fluid: gatsbyImageSharpFluidValidator
})

export const previewCompatibleImageValidator = PropTypes.shape({
  alt: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    childImageSharpValidator
  ]),
  value: PropTypes.string
})

const PreviewCompatibleImage = ({ imageInfo }) => {
  if (!imageInfo) {
    return null
  }

  const imageStyle = { borderRadius: '5px' }
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
