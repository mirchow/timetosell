import React from 'react'
import renderer from 'react-test-renderer'
import NotFound from '../NotFound'

describe('NotFound', () => {
  const result = renderer.create(<NotFound />).toJSON()

  it('should render full html structure correctly', () => {
    expect(result).toMatchSnapshot()
  })
})