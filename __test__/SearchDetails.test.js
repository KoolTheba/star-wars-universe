import React from 'react'
import { render } from '@testing-library/react'
import SearchDetails from '../src/components/SearchDetails'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' }
  })
}))

describe('SearchDetails', () => {
  it('renders UI elements needed', () => {
    const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()
    const { getByText } = render(<SearchDetails list={'luke'}/>)
    const contextWord = getByText('luke')
    checkToBeInDoc(contextWord)
  })
})
