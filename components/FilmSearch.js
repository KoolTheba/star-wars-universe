import React, { useState, useReducer, useEffect } from "react"

import FilmList from '../components/FilmList'
import styles from '../styles/Home.module.css'

const initialState = {
  loading: true,
  data: null,
  error: null
};

function fetchPostReducer(state, action) {
  if (action.type === "fetchComplete") {
    return {
      data: action.data.results,
      loading: false,
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: "Error fetching films"
    };
  } else {
    throw new Error();
  }
}

const searchByTerm = async (term) => {
  const urlsList = [
    `https://swapi.dev/api/films?search=${term}`,
    `https://swapi.dev/api/people?search=${term}`,
    `https://swapi.dev/api/planets?search=${term}`
  ]

  const results = await Promise.all(urlsList.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(res => res.json())))
  
  const result = results.filter(el => el.results.length)
  return result[0].results[0].films 
    ? result[0].results[0].films
    : [result[0].results[0].url]
}

const FilmSearch = () => {
  const [state, dispatch] = useReducer(fetchPostReducer, initialState);

  const [searchValue, setSearchValue] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

   useEffect(() => {
    const searchValuesList = searchValue.length > 0 ? searchValue.trim().split(' ') : []

    const fetchFilmList = () => {
      Promise.all(searchValuesList.map(el => searchByTerm(el)))
      .then((arr) => {
        return arr.reduce((p,c) => p.filter(e => c.includes(e)))
      }).then((commomFilms) => {
        return Promise.all(commomFilms.map(url => fetch(url).then(res => res.json())))
      }).then((data) => dispatch({ type: "fetchComplete", data }))
      .catch((error) => dispatch({ type: "error", error }))
    }

    isSubmitted && fetchFilmList()
    setSearchValue([])

    }, [isSubmitted]);

    const handleChange = (e) => {
      setSearchValue(e.target.value)
    }

    const handleSearch = (e) => {
      e.preventDefault()
      setIsSubmitted(true)
    }

    const handleReset = () => {
      setSearchValue([])
      setIsSubmitted(false)
    }

    const { error, data} = state

    return (
        <>
        <p className={styles.description}>Instructions:</p>
        <ol>
          <li>Search by one or more words separated by blank spaces</li>
          <li>The word(s) could be from a film title, a character, a planet or all at once!</li>
          <li>Press Go button and see the results! 🚀</li>
        </ol>

        <form>
          <input
            type='text'
            placeholder='Search by title, character or planet...'
            value={searchValue}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Go!</button>
          <button onClick={handleReset}>Reset</button>
        </form>

        {data && <FilmList filmsList={data} error={error}/>}
        </>
    )
}

export default FilmSearch