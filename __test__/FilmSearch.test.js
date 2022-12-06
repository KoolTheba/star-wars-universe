import React from 'react'
import { render } from '@testing-library/react'
import FilmSearch from '../src/components/FilmSearch'
import { server } from '../mocks/server'
import { rest } from 'msw'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' }
  })
}))

describe('FilmSearch', () => {
  const checkToBeInDoc = (elem) => expect(elem).toBeInTheDocument()

  it('renders UI elements needed', () => {
    const { getByText, getByRole } = render(<FilmSearch />)

    const instructionsParagraph = getByText(/instructions/i)
    const directionsList = getByRole('list')
    const searchInput = getByRole('textbox')
    const submitButton = getByRole('button', { name: /go/i })

    checkToBeInDoc(instructionsParagraph)
    checkToBeInDoc(directionsList)
    checkToBeInDoc(searchInput)
    checkToBeInDoc(submitButton)
  })

  it('handles error for no films found', async () => {
    server.resetHandlers(
      rest.get('https://swapi.dev/api/people?search=INVALID', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('https://swapi.dev/api/films?search=INVALID', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('https://swapi.dev/api/planets?search=INVALID', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('https://swapi.dev/api/starships?search=INVALID', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('https://swapi.dev/api/vehicles?search=INVALID', (req, res, ctx) =>
        res(ctx.status(500))
      )
    )

    const { findByTestId } = render(<FilmSearch />)
    const errorElement = await findByTestId('error')
    checkToBeInDoc(errorElement)
  })
})
