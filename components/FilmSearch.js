import React, { useState, useReducer, useEffect } from "react"
import { useRouter } from 'next/router'

import FilmList from '../components/FilmList'
import styles from '../styles/Home.module.css'

const initialState = {
  loading: false,
  data: null,
  error: null
};

function fetchPostReducer(state, action) {
  if(action.type === "loading"){
    return {
      ...state,
      loading: true
    }
  } else if (action.type === "fetchComplete") {
    return {
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
        <section>
          <p className={styles.description}>Instructions:</p>
          <ol>
            <li>Search by one or more words separated by blank spaces</li>
            <li>The word(s) could be from a film title, a character, a planet or all at once!</li>
            <li>Press Go button and see the results! 🚀</li>
          </ol>
        </section>

        <section>
          <p>Hints:</p>
          <ul>
            <li>Looking for r2d2? Search for r2</li>
            <li>Looking for C3PO? Search for 3po</li>
          </ul>
        </section>

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

        {loading && <span>In our magic we work...not hurry you must be!</span>}
        {error && <span>No films you found. Reset and search again.</span>}
        {data && <FilmList filmsList={data}/>}
        </>
    )
}

export default FilmSearch