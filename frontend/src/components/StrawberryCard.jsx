import React from 'react'
import PropTypes from 'prop-types'
import VerticalTileColumn from './VerticalTileColumn'

const defaultIcon = '/img/strawberry-icon.png'
const defaultImageAltText = 'Strawberry Icon'

export const SectionWithStrawberryCard = ({isPublic, image, imageAltText, text, children}) => {
  // Formats a portion of text or other content alongside a strawberry card so it appears correctly
  // and responsively

  return (
    <div className="columns">
      <div className="column">
        {children}
      </div>
      <div className="column is-narrow">
        <StrawberryCard isPublic={isPublic} image={image} imageAltText={imageAltText} text={text} />
      </div>
    </div>
  )
}

const StrawberryCard = ({isPublic, image, imageAltText, text}) => {
  if (isPublic){
    return (
      <React.Fragment>
        <StrawberryCardDesktop image={image} imageAltText={imageAltText} text={text} />
        <StrawberryCardMobile image={image} imageAltText={imageAltText} text={text} />
      </React.Fragment>
    )
  } else {
    return null
  }
}

const StrawberryCardDesktop = ({image, imageAltText, text}) => {
  return (
    <div className="box has-background-primary is-hidden-mobile strawberry-square">
      <figure className="image is-64x64">
        <img src={image || defaultIcon} alt={imageAltText || defaultImageAltText} />
      </figure>
      <p className="has-text-white">{text}</p>
    </div>
  )
}

const StrawberryCardMobile = ({image, imageAltText, text}) => {
  return (
    <div className="box has-background-primary is-hidden-tablet">
      <div className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={image || defaultIcon} alt={imageAltText || defaultImageAltText} />
          </p>
        </figure>
        <div className="media-content">
          <p className="has-text-white">{text}</p>
        </div>
      </div>
    </div>
  )
}

export const StrawberryTiles = ({strawberryTiles}) => {
  if (strawberryTiles && strawberryTiles.length > 0) {
    return (
      <VerticalTileColumn>
        {strawberryTiles.map((tileWrapper, index) => <StrawberryTile isPublic={tileWrapper.strawberryTile.isPublic} text={tileWrapper.strawberryTile.text} key={index}/>)}
      </VerticalTileColumn>
    )
  } else {
    return null
  }
}

const StrawberryTile = ({isPublic, image, imageAltText, text}) => (
  <div className="tile is-child">
    <StrawberryCard isPublic={isPublic} image={image} imageAltText={imageAltText} text={text} />
  </div>
)

StrawberryCard.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  image: PropTypes.string,
  imageAltText: PropTypes.string,
  text: PropTypes.string
}

SectionWithStrawberryCard.propTypes = StrawberryCard.propTypes
StrawberryCardDesktop.propTypes = StrawberryCard.propTypes
StrawberryCardMobile.propTypes = StrawberryCard.propTypes
StrawberryTile.propTypes = StrawberryCard.propTypes

StrawberryTiles.propTypes = { tileTextArray: PropTypes.arrayOf(PropTypes.string) }
