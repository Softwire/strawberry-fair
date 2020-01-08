import React from 'react'
import { shallow } from 'enzyme'

import { FormFrame } from '../../src/components/FormFrame'

describe("FormFrame", () => {
  describe("doesn't render if", () => {
    test("not public", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: false}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })

    test("given a meaningless link", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "Hello, world!"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })
  
    test("given a valid, but not google forms, url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://www.google.com/"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })

    test("given an iframe with an invalid url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"Hello, world!\">"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })

    test("given an iframe with an valid, but not google forms, url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://www.google.com/\">"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })
  })
})
