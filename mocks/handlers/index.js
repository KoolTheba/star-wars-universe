import { rest } from 'msw'

import filmDetail from '../data/filmDetail.json'
import peopleDetail from '../data/peopleDetail.json'

const emptyResults = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const handlers = [
  rest.get('https://swapi.dev/api/people', (req, res, ctx) => {
    const query = req.url.searchParams.get('search')
    if (query === 'luke') {
      return res(
        ctx.status(200),
        ctx.json(peopleDetail)
      )
    }
  }),
  rest.get('https://swapi.dev/api/films', (req, res, ctx) => {
    const query = req.url.searchParams.get('search')
    if (query === 'luke') {
      return res(
        ctx.status(200),
        ctx.json(emptyResults)
      )
    }
  }),
  rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
    const query = req.url.searchParams.get('search')
    if (query === 'luke') {
      return res(
        ctx.status(200),
        ctx.json(emptyResults)
      )
    }
  }),
  rest.get('https://swapi.dev/api/starships', (req, res, ctx) => {
    const query = req.url.searchParams.get('search')
    if (query === 'luke') {
      return res(
        ctx.status(200),
        ctx.json(emptyResults)
      )
    }
  }),
  rest.get('https://swapi.dev/api/vehicles', (req, res, ctx) => {
    const query = req.url.searchParams.get('search')
    if (query === 'luke') {
      return res(
        ctx.status(200),
        ctx.json(emptyResults)
      )
    }
  }),
  rest.get('https://swapi.dev/api/films/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(filmDetail)
    )
  })
]
