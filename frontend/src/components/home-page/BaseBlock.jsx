import React from 'react'
import PropTypes from 'prop-types'

const BaseBlock = ({block, altBackground = "", children}) => (
    <section className={`section ${altBackground && "has-background-light-grey is-viewport-width"}`}>
      <div className="container">
        <h1 className="title">{block.title}</h1>
        <div className="columns">
          <div className="column is-three-fifths">
            <h3 className="subtitle">{block.subtitle}</h3>
          </div>
        </div>
        {children}
      </div>
    </section>
)

BaseBlock.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.node,
    subtitle: PropTypes.node
  }),
  altBackground: PropTypes.bool,
  children: PropTypes.node
}

export default BaseBlock
