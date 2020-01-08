/* eslint-disable no-undef */
import React from 'react'
import { shallow } from 'enzyme'

import { HomePage } from '../../src/templates/home-page'
import ContentBlocks from '../../src/components/home-page/ContentBlocks'

const sampleContentBlocks = []

describe("HomePage", () => {
  let homePage

  beforeEach(() => {
    homePage = shallow(<HomePage contentBlocks={sampleContentBlocks} />)
  })
})
