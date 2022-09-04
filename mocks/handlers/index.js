import { rest } from "msw";

import data from '../data/filmDetail.json'

export const handlers = [
    rest.get("https://swapi.dev/api/films/4", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(data)
        );
    })
];