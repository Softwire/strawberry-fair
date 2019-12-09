import React from 'react'

const StrawberryCard = ({image, imageAltText, text}) => (
  <div className="box has-background-primary">
      <figure className="image is-64x64">
          <img src={image || "/img/strawberry-icon.png"} alt={imageAltText || 'icon'}/>
      </figure>
      <p className="has-text-white">{text}</p>
  </div>
)

export default StrawberryCard