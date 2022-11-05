import React from 'react'

import { render } from '@testing-library/react'
import FilmList from '../src/components/FilmList'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' }
  })
}))

describe('FilmList', () => {
  it('renders UI elements needed', () => {
    const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()
    const { getByRole } = render(<FilmList filmsList={[]} searchContext={'luke'}/>)

    const mainHeading = getByRole('heading', { name: /your films list for your search:/i })
    const cardsList = getByRole('list')

    checkToBeInDoc(mainHeading)
    checkToBeInDoc(cardsList)
  })
})
