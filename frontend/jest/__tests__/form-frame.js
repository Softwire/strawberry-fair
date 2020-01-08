import React from 'react'
import { shallow } from 'enzyme'

import { FormFrame } from '../../src/components/FormFrame'

describe("FormFrame", () => {
  test("is null if not public", () => {
    const formFrame = shallow(<FormFrame form={{isPublic: false}} />)

    expect(formFrame.isEmptyRender()).toBeTruthy()
  })
})
