import React from 'react'

const defaultIcon = '/img/strawberry-icon.png'
const defaultImageAltText = 'icon'

const StrawberryCard = ({image, imageAltText, text}) => (
  <div className="box has-background-primary">
      <figure className="image is-64x64">
          <img src={image || defaultIcon} alt={imageAltText || defaultImageAltText}/>
      </figure>
      <p className="has-text-white">{text}</p>
  </div>
)

export default StrawberryCard