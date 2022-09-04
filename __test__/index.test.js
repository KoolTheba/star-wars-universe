import React from "react";

import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' },
  }),
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Star Wars films search you can\!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})