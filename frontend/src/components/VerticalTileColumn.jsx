import React from 'react'
import '../styling/styles.sass'

const VerticalTileColumn = props => {
    return (
      <div className="column is-one-quarter">
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            {props.children}
          </div>
        </div>
      </div>
    )
  }

  export default VerticalTileColumn

  export const StrawberryCard = props => (
      <div className="tile is-child has-background-primary box"> {props.children} </div>
      )



  export const StrawberryTile  = ({image, text}) =>(
        <StrawberryCard>
            <figure className="image is-64x64">
                <img  src={image} alt='A strawberry'/>
            </figure>
            <p className="has-text-white">{text}</p>
        </StrawberryCard>
    )
  
  