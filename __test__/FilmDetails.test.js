import React from "react";

import { render } from "@testing-library/react";
import FilmDetails from "@/components/FilmDetails";

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { filmId: 4, search: 'luke' },
  })
}));

describe('FilmDetails', () => {
    it.skip('renders UI elements needed', () => {
      const checkToBeInDoc = (elem) =>  expect(elem).toBeInTheDocument()
      const { getByRole, getByTestId } = render(<FilmDetails />);
  
      const button = getByRole('button', {name: /back to results/i })
      const mainHeading = getByRole('heading', {name: /the/i })
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