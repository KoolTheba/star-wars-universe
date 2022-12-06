import React from 'react'

import { render, waitFor } from '@testing-library/react'
import FilmDetails from '../src/components/FilmDetails'

import { server } from '../mocks/server'
import { rest } from 'msw'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { filmId: 1, search: 'luke' }
  })
}))

describe('FilmDetails', () => {
  const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()

  it('renders UI elements needed', async () => {
    const { getByRole, getByTestId } = render(<FilmDetails />)

    await waitFor(async () => {
      const button = getByRole('button', { name: /back to results/i })
      const mainHeading = getByRole('heading', { name: /the/i })
      const episodeParagraph = getByTestId('episodeParagraph')
      const directorParagraph = getByTestId('directorParagraph')
      const producerParagraph = getByTestId('producerParagraph')
      const dateParagraph = getByTestId('dateParagraph')

      checkToBeInDoc(button)
      checkToBeInDoc(mainHeading)
      checkToBeInDoc(directorParagraph)
      checkToBeInDoc(producerParagraph)
      checkToBeInDoc(episodeParagraph)
      checkToBeInDoc(dateParagraph)
    })
  })

  it('renders error messages when there is an error in the request', async () => {
    server.resetHandlers(
      rest.get('https://swapi.dev/api/films/1', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ detail: 'Not found' })
        )
      })
    )

    const { getByRole, getByTestId } = render(<FilmDetails />)

    await waitFor(async () => {
      const errorMessage = getByTestId('errorMessage')
      const button = getByRole('button', { name: /take me back Home/i })

      checkToBeInDoc(errorMessage)
      checkToBeInDoc(button)
    })
  })
})
