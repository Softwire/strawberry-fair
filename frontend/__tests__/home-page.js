import React from "react"
import renderer from "react-test-renderer"
import HomePage from "../src/templates/home-page"


describe("Home Page", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<HomePage />).toJSON()
    expect(tree).toMatchSnapshot()
  }))