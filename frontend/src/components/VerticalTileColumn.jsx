import React from 'react'
import PropTypes from 'prop-types'

import StrawberryCard from './StrawberryCard'

const VerticalTileColumn = props => (
  <div className="column is-one-quarter">
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical">
        {props.children}
      </div>
    </div>
  </div>
)

VerticalTileColumn.propTypes = {
  children: PropTypes.node
}

export default VerticalTileColumn

export const StrawberryTile = props => (
  <div className="tile is-child">
    {StrawberryCard(props)}
  </div>  
)

StrawberryTile.propTypes = {
  children: PropTypes.node
}
