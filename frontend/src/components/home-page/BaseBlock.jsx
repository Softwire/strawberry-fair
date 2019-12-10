import React from 'react'

const BaseBlock = ({block, altBackground = "", children}) => (
  <section className={`section ${altBackground && "has-background-grey-lighter"}`}>
    <h1 className="title is-1">{block.title}</h1>
    <div className="columns">
      <div className="column is-three-fifths">
        <h3 className="subtitle is-5">{block.subtitle}</h3>
      </div>
    </div>
    {children}
  </section>
)

export default BaseBlock
