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
  rest.get('https://swapi.dev/api/people?search=luke', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(peopleDetail)
    )
  }),
  rest.get('https://swapi.dev/api/films?search=luke', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(emptyResults)
    )
  }),
  rest.get('https://swapi.dev/api/planets?search=luke', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(emptyResults)
    )
  }),
  rest.get('https://swapi.dev/api/starships?search=luke', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(emptyResults)
    )
  }),
  rest.get('https://swapi.dev/api/vehicles?search=luke', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(emptyResults)
    )
  }),
  rest.get('https://swapi.dev/api/films/4', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(filmDetail)
    )
  })
]
