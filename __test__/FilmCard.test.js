import React from 'react'

import { render } from '@testing-library/react'
import FilmCard from '../src/components/FilmCard'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' }
  })
}))

describe('FilmCard', () => {
  it('renders UI elements needed', () => {
    const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()
    const { getByRole, getByTestId } = render(<FilmCard film={{ release_date: '1977-05-25' }} searchContext={'luke'}/>)

    const link = getByRole('link')
    const titleParagraph = getByTestId('titleParagraph')
    const episodeParagraph = getByTestId('episodeParagraph')
    const dateParagraph = getByTestId('dateParagraph')

    checkToBeInDoc(link)
    checkToBeInDoc(titleParagraph)
    checkToBeInDoc(episodeParagraph)
    checkToBeInDoc(dateParagraph)
  })
})
