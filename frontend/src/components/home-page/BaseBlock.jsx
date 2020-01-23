import React from 'react'
import PropTypes from 'prop-types'

const BaseBlock = ({block, altBackground = "", children}) => (
    <div className={`home-page-section ${altBackground && "has-background-light-grey is-viewport-width"}`}>
      <section className={`section ${altBackground && "section-root"}`}>
        <div className="container">
            <h1 className="title is-3 is-size-4-mobile">{block.title}</h1>
            <div className="columns">
              <div className="column is-three-fifths">
                <h3 className="subtitle is-5">{block.subtitle}</h3>
              </div>
            </div>
            {children}
        </div>
    </section>
  </div>
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
