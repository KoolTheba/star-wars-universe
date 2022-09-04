import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import SearchDetails from './SearchDetails'

import { arrayHandler } from '../utils/arrayTransform'

import styles from '../styles/FilmDetails.module.css'

const FilmDetails = () => {
  const router = useRouter()
  const { query: { filmId, search } } = router

  const [filmDetails, setFilmDetails] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const filmUrl = `https://swapi.dev/api/films/${parseInt(filmId)}`

    fetch(filmUrl)
      .then(res => res.json())
      .then(data => data.detail ? setError(data.detail) : setFilmDetails(data))
      .catch(err => setError(err))
  }, [filmId])

  if (!error && !filmDetails) {
    return (
            <div className={styles.loadingContainer}>
                <span className={styles.loading}>Working the Force is...not hurry you must be!</span>
            </div>
    )
  }

  if (error) {
    return (
            <>
                <div className={styles.errorContainer}>
                    <span data-testid="errorMessage" role="text" className={styles.error}>Danger. An error we had</span>
                    <Link href={'/'}>
                        <a>
                            <button className={styles.homeButton}>Take me back Home</button>
                        </a>
                    </Link>
                </div>
            </>
    )
  }

  const searchTermsList = arrayHandler(search)

  return (
        <div className={styles.container}>
            {filmDetails &&
            <>
                <button
                    className={styles.backButton}
                    type="button"
                    onClick={() => {
                      router.push({
                        pathname: '/',
                        query: { search }
                      })
                    }}
                    >
                    Back to results
                </button>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>{filmDetails.title}</h1>
                    <p data-testid="episodeParagraph" className={styles.subtitle}>Episode: {filmId}</p>
                </div>
                <div className={styles.searchTermsWrapper}>
                    <SearchDetails list={searchTermsList}/>
                </div>
                <div className={styles.filmDetailsWrapper}>
                    <div className={styles.specialWrapper}>
                        <p data-testid="directorParagraph">Director: {filmDetails.director}</p>
                        <p data-testid="producerParagraph">Producer: {filmDetails.producer}</p>
                    </div>
                    <p data-testid="dateParagraph">Release date: {filmDetails.release_date && filmDetails.release_date.split('-').reverse().join('-')}</p>
                </div>
            </>
            }
        </div>
  )
}

export default FilmDetails
