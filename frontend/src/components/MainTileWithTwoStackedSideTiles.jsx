import React from 'react'
import PropTypes from 'prop-types'

const MainTileWithTwoStackedSideTiles = ({mainTile, sideTopTile, sideBottomTile}) => (
  <div className="tile is-ancestor">
    <div className="tile is-parent">
      <div className="tile is-child box main-box">
        {mainTile}
      </div>
    </div>
    <div className="tile is-4 is-vertical is-parent side-box">
      <div className="tile is-child box side-box">
        {sideTopTile}  
      </div>
      <div className="tile is-child box side-box">
        {sideBottomTile}  
      </div>
    </div>
  </div>
)

MainTileWithTwoStackedSideTiles.propTypes = {
  mainTile: PropTypes.element,
  sideTopTile: PropTypes.element,
  sideBottomTile: PropTypes.element
}

export default MainTileWithTwoStackedSideTiles
