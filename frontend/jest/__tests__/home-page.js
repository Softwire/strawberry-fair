/* eslint-disable no-undef */
import React from 'react'
import { shallow } from 'enzyme'

import { HomePage } from '../../src/templates/home-page'
import ContentBlocks from '../../src/components/home-page/ContentBlocks'
import CalendarBlock from '../../src/components/home-page/CalendarBlock'
import NewsBlock from '../../src/components/home-page/NewsBlock'
import TwitterBlock from '../../src/components/home-page/TwitterBlock'

const sampleContentBlocks = []
const sampleNewsArticles = []

describe("HomePage", () => {
  let homePage

  beforeEach(() => {
    homePage = shallow(<HomePage contentBlocks={sampleContentBlocks} newsArticles={sampleContentBlocks} />)
  })

  test("renders the ContentBlocks first", () => {
    expect(homePage.childAt(0).shallow()).toMatchElement(<ContentBlocks />)
  })

  test("renders the CalendarBlock next", () => {
    expect(homePage.childAt(1).shallow()).toMatchElement(<CalendarBlock />)
  })

  test("renders the NewsBlock next", () => {
    expect(homePage.childAt(2).shallow()).toMatchElement(<NewsBlock newsArticles={sampleNewsArticles} />)
  })

  test("renders the TwitterBlock last", () => {
    expect(homePage.childAt(3).shallow()).toMatchElement(<TwitterBlock />)
  })
})
