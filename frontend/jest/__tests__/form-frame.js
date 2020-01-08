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
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"Hello, world!\"></iframe>"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })

    test("given an iframe with an valid, but not google forms, url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://www.google.com/\"></iframe>"}} />)
  
      expect(formFrame.isEmptyRender()).toBeTruthy()
    })
  })

  describe("renders an iframe if", () => {
    test("given an invalid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/hello"}} />)
  
      expect(formFrame.is("iframe")).toBeTruthy()
    })

    test("given a valid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/d/e/1FAIpQLSdnbGnGcafdKpNXKZ83mcDnF8lMJ-awaM0-j-135d1RFEC_jQ/viewform?embedded=true"}} />)
  
      expect(formFrame.is("iframe")).toBeTruthy()
    })

    test("given an iframe with an invalid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/hello\"></iframe>"}} />)
  
      expect(formFrame.is("iframe")).toBeTruthy()
    })

    test("given an iframe with a valid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdnbGnGcafdKpNXKZ83mcDnF8lMJ-awaM0-j-135d1RFEC_jQ/viewform?embedded=true\"></iframe>"}} />)
  
      expect(formFrame.is("iframe")).toBeTruthy()
    })
  })
})
