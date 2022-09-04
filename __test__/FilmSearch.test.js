import React from "react";

import { render } from "@testing-library/react";
import FilmSearch from "@/components/FilmSearch";

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'luke' },
  })
}));

describe('FilmSearch', () => {
    it('renders UI elements needed', () => {
      const checkToBeInDoc = (elem) =>  expect(elem).toBeInTheDocument()
      const { getByRole, getByText } = render(<FilmSearch />);
  
      const instructionsParagraph = getByText(/instructions/i)
      const directionsList = getByRole('list')
      const searchInput = getByRole('textbox')
      const submitButton = getByRole('button', { name: /go/i})
      const resetButton = getByRole('button', { name: /reset/i})
  
      checkToBeInDoc(instructionsParagraph)
      checkToBeInDoc(directionsList)
      checkToBeInDoc(searchInput)
      checkToBeInDoc(submitButton)
      checkToBeInDoc(resetButton)
    })
})