import React from 'react'
import PropTypes from 'prop-types'

const VerticalTileColumn = props => (
  <div className="column is-narrow">
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
