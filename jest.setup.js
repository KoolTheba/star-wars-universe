// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'
import '@testing-library/jest-dom'

import { server } from './mocks/server'

beforeEach(() => server.resetHandlers())

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
