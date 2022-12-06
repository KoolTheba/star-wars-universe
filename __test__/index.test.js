import React from 'react'
import { render } from '@testing-library/react'
import Home from '../src/pages/index'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' }
  })
}))

describe('Home', () => {
  it('renders UI elements needed', () => {
    const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()
    const { getByRole } = render(<Home />)

    const mainHeading = getByRole('heading', {
      name: /Star Wars films search you can!/i
    })
    const bb8Image = getByRole('img', { name: /bb8 character/i })
    const footer = getByRole('contentinfo')
    const redirectionLink = getByRole('link', { name: /@KoolTheba/i })

    checkToBeInDoc(mainHeading)
    checkToBeInDoc(bb8Image)
    checkToBeInDoc(footer)
    checkToBeInDoc(redirectionLink)
  })
})
