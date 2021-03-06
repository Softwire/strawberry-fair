/* eslint-disable no-undef */
import React from 'react'
import { shallow } from 'enzyme'

import { FormFrame } from '../../src/components/FormFrame'

describe("FormFrame", () => {
  describe("doesn't render if", () => {
    test("not public", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: false}} />)
  
      expect(formFrame).toBeEmptyRender()
    })

    test("given a meaningless link", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "Hello, world!"}} />)
  
      expect(formFrame).toBeEmptyRender()
    })
  
    test("given a valid, but not google forms, url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://www.google.com/"}} />)
  
      expect(formFrame).toBeEmptyRender()
    })

    test("given an iframe with an invalid url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"Hello, world!\"></iframe>"}} />)
  
      expect(formFrame).toBeEmptyRender()
    })

    test("given an iframe with an valid, but not google forms, url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://www.google.com/\"></iframe>"}} />)
  
      expect(formFrame).toBeEmptyRender()
    })
  })

  describe("renders an iframe if", () => {
    test("given an invalid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/hello"}} />)
  
      expect(formFrame).toMatchSelector("iframe")
    })

    test("given a valid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/d/e/1FAIpQLSdnbGnGcafdKpNXKZ83mcDnF8lMJ-awaM0-j-135d1RFEC_jQ/viewform?embedded=true"}} />)
  
      expect(formFrame).toMatchSelector("iframe")
    })

    test("given an iframe with an invalid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/hello\"></iframe>"}} />)
  
      expect(formFrame).toMatchSelector("iframe")
    })

    test("given an iframe with a valid google forms url", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdnbGnGcafdKpNXKZ83mcDnF8lMJ-awaM0-j-135d1RFEC_jQ/viewform?embedded=true\"></iframe>"}} />)
  
      expect(formFrame).toMatchSelector("iframe")
    })
  })

  describe("renders the iframe with the expected height if", () => {
    test("only a url is given", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/hello"}} />)

      expect(formFrame).toMatchSelector("iframe[height=1427]")
    })

    test("an iframe without a height is given", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/hello\"></iframe>"}} />)

      expect(formFrame).toMatchSelector("iframe[height=1427]")
    })

    test("an iframe with a height is given", () => {
      const testHeight = 500
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: `<iframe src="https://docs.google.com/forms/hello" height="${testHeight}" ></iframe>`}} />)

      expect(formFrame).toMatchSelector(`iframe[height="${testHeight}"]`)  // Speech marks required here I believe due to using shallow wrapping
    })
  })

  describe("renders the iframe with the expected source if", () => {
    test("only a url is given", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "https://docs.google.com/forms/hello"}} />)

      expect(formFrame).toMatchSelector("iframe[src=\"https://docs.google.com/forms/hello\"]")
    })

    test("an iframe is given", () => {
      const formFrame = shallow(<FormFrame form={{isPublic: true, link: "<iframe src=\"https://docs.google.com/forms/hello\"></iframe>"}} />)

      expect(formFrame).toMatchSelector("iframe[src=\"https://docs.google.com/forms/hello\"]")
    })
  })
})
