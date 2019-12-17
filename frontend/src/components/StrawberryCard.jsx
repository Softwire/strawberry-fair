import React from 'react'
import PropTypes from 'prop-types'
import VerticalTileColumn from './VerticalTileColumn'

const defaultIcon = '/img/strawberry-icon.png'
const defaultImageAltText = 'Strawberry Icon'

export const StrawberryCard = ({image, imageAltText, text}) => (
  <div className="box has-background-primary">
      <figure className="image is-64x64">
          <img src={image || defaultIcon} alt={imageAltText || defaultImageAltText}/>
      </figure>
      <p className="has-text-white">{text}</p>
  </div>
)

StrawberryCard.propTypes = {
  image: PropTypes.string,
  imageAltText: PropTypes.string,
  text: PropTypes.string.isRequired
}

const StrawberryTile = ({image, imageAltText, text}) => (
  <div className="tile is-child">
    <StrawberryCard image={image} imageAltText={imageAltText} text={text} />
  </div>
)

StrawberryTile.propTypes = StrawberryCard.propTypes


export const StrawberryTiles = ({tileTextArray}) => {
  if (tileTextArray && tileTextArray.length > 0) {
    return (
      <VerticalTileColumn>
        {tileTextArray.map((text, index) => <StrawberryTile text={text} key={index}/>)}
      </VerticalTileColumn>
    )
  }
  else {
    return null
  }
}

StrawberryTiles.propTypes = { tileTextArray: PropTypes.arrayOf(PropTypes.string) }