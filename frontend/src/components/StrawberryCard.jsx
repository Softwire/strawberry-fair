import React from 'react'
import PropTypes from 'prop-types'
import VerticalTileColumn from './VerticalTileColumn'

const defaultIcon = '/img/strawberry-icon.png'
const defaultImageAltText = 'Strawberry Icon'

export const SectionWithStrawberryCard = ({image, imageAltText, text, children}) => {
  // Formats a portion of text or other content alongside a strawberry card so it appears correctly
  // and responsively

  return (
    <div className="columns">
      <div className="column">
        {children}
      </div>
      <div className="column is-narrow">
        <StrawberryCard image={image} imageAltText={imageAltText} text={text} />
      </div>
    </div>
  )
}

export const StrawberryCard = ({image, imageAltText, text}) => {
  return (
    <React.Fragment>
      <StrawberryCardDesktop image={image} imageAltText={imageAltText} text={text} />
      <StrawberryCardMobile  image={image} imageAltText={imageAltText} text={text} />
    </React.Fragment>
  )
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

StrawberryCard.propTypes = {
  image: PropTypes.string,
  imageAltText: PropTypes.string,
  text: PropTypes.string.isRequired
}

SectionWithStrawberryCard.propTypes = StrawberryCard.propTypes

StrawberryCardDesktop.propTypes = StrawberryCard.propTypes
StrawberryCardMobile.propTypes = StrawberryCard.propTypes

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