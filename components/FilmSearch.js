import React, { useState, useReducer, useEffect } from "react"
import { useRouter } from 'next/router'

import FilmList from '../components/FilmList'
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
    `https://swapi.dev/api/planets?search=${term}`
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
  const [state, dispatch] = useReducer(fetchPostReducer, initialState);

  const [searchValue, setSearchValue] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()

   useEffect(() => {
    const searchValuesList = searchValue.length > 0 ? searchValue.trim().split(' ') : []

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
      })
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
      router.push({
        pathname: '/',
        query: { searchValue },
      })
    }

    const handleReset = () => {
      setSearchValue([])
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
            <li>Press Go button and see the results! 🚀</li>
          </ol>
        </section>

        <section className={styles.hintSection}>
          <p className={styles.hints}>Hints: Looking for r2d2? Search for r2; looking for C3PO? Search for 3po</p>
        </section>

        <form className={styles.form}>
          <input
            className={styles.formInput}
            type='text'
            placeholder='Search by title, character or planet...'
            value={searchValue}
            onChange={handleChange}
          />
          <button className={styles.ctaButton} onClick={handleSearch}>Go!</button>
          <button className={styles.resetButton} onClick={handleReset}>Reset</button>
        </form>

        {loading && <span className={styles.loading}>Working the Force is...not hurry you must be!</span>}
        {error && <span className={styles.error}>No films you found. Reset and search again.</span>}
        {data && <FilmList filmsList={data} searchContext={searchValue} />}
        </>
    )
}

export default FilmSearch