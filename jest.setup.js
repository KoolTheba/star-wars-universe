// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());