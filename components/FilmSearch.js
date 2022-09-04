import React, { useState, useReducer, useEffect, useRef, useCallback } from "react"
import { useRouter } from 'next/router'

import { removeSpaces, removeSpecialChars } from "../utils/searchValueParsers"
import { saveToStorage, loadFromStorage, removeFromStorage } from '../utils/localStorage'

import FilmList from './FilmList'
import styles from '../styles/FilmSearch.module.css'

const initialState = {
  loading: false,
  data: null,
  error: null
};

function fetchPostReducer(state, action) {
  if(action.type === "loading"){
    return {
      loading: true,
      data: null,
      error: null
    }
  } else if (action.type === "fetchComplete") {
    return {
      loading: false,
      data: action.data,
      error: null
    };
  } else if (action.type === "error") {
    return {
      loading: false,
      data: null,
      error: "Error searching for films"
    };
  } else {
    throw new Error();
  }
}

const searchByTerm = async (term) => {
  const urlsList = [
    `https://swapi.dev/api/films?search=${term}`,
    `https://swapi.dev/api/people?search=${term}`,
    `https://swapi.dev/api/planets?search=${term}`,
    `https://swapi.dev/api/starships?search=${term}`,
    `https://swapi.dev/api/vehicles?search=${term}"`
  ]

  const results = await Promise.all(urlsList.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(res => res.json())))
  .catch((error) => dispatch({ type: "error", error }))
  
  const result = results.filter(el => el.results.length)
  return result[0].results[0].films 
    ? result[0].results[0].films
    : [result[0].results[0].url]
}

const FilmSearch = () => {
  const router = useRouter()

  const [state, dispatch] = useReducer(fetchPostReducer, initialState);

  const [searchValue, setSearchValue] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const searchValueRef = useCallback(node => {
    if(router.query.search) {
      setSearchValue(router.query.search)
      setIsSubmitted(true)
    }
  }, [router.query.search])

  useEffect(() => {
    const searchValuesList = searchValue.length > 0 ? removeSpaces(searchValue).split(' ') : []

    const fetchFilmList = () => {
      dispatch({ type: "loading" })

      Promise.all(searchValuesList.map(el => searchByTerm(el)))
      .then((arr) => {
        return arr.reduce((p,c) => p.filter(e => c.includes(e)))
      }).then((commomFilms) => {
        return Promise.all(commomFilms.map(url => fetch(url).then(res => res.json())))
      })
      .then((data) => {
        dispatch({ type: "fetchComplete", data })
        setSearchValue('')
      })
      .catch((error) => dispatch({ type: "error", error }))
    }

    isSubmitted && fetchFilmList()

    }, [isSubmitted]);

    const handleChange = (e) => {
      setSearchValue(removeSpecialChars((e.target.value)))
    }

    const handleSearch = (e) => {
      e.preventDefault()
      setIsSubmitted(true)

      const parserNoChars = removeSpecialChars(searchValue)
      const parsedSearchValue = removeSpaces(parserNoChars)
      router.push({
        pathname: '/',
        query: { search: parsedSearchValue }
      })
    }

    const handleReset = () => {
      setSearchValue('')
      setIsSubmitted(false)
    }

    const { loading, data, error } = state

    return (
        <>
        <section className={styles.instructionsSection}>
          <p className={styles.description}>Instructions:</p>
          <ol className={styles.directionsList}>
            <li>Search by one or more words separated by blank spaces</li>
            <li>The word(s) could be from a film title, a character, a planet or all at once!</li>
            <li>You can also search by vehicle or starship!</li>
            <li>Press Go button and see the results! <span role='img' aria-label="rocket">🚀</span></li>
          </ol>
        </section>

        <section className={styles.hintSection}>
          <p className={styles.hints}>Hints: looking for r2d2? Search for r2; looking for C3PO? Search for 3po</p>
        </section>

        <form className={styles.form}>
          <input
            className={styles.formInput}
            type='text'
            placeholder='Search by title, character or planet...'
            value={searchValue}
            onChange={handleChange}
            ref={searchValueRef}
          />
          <button className={styles.ctaButton} onClick={handleSearch}>Go!</button>
          <button className={styles.resetButton} onClick={handleReset}>Reset</button>
        </form>

        {loading && <span className={styles.loading}>Working the Force is...not hurry you must be!</span>}
        {error && <span className={styles.error}>No films you found. Reset and search again.</span>}
        {data && <FilmList filmsList={data} searchContext={router.query.search} />}
        </>
    )
}

export default FilmSearch