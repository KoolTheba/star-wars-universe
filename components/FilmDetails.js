import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../styles/FilmDetails.module.css'

const FilmDetails = () => {
    const router = useRouter()
    const { query: { filmId, search }} = router

    const [filmDetails, setFilmDetails] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {                
        const filmUrl = `https://swapi.dev/api/films/${parseInt(filmId)}`
    
        fetch(filmUrl)
        .then(res => res.json())
        .then(data => data.detail ? setError(data.detail) : setFilmDetails(data))
        .catch(err => setError(err))
    }, [])

    if(!error && !filmDetails){
        return <span className={styles.loading}>Working the Force is...not hurry you must be!</span>
    }

    if(error){
        return (
            <>
                <span className={styles.error}>Danger!! An error we had!!</span>
                <Link href={'/'}>
                    <a>
                        <p className={styles.backButton}>Back Home!</p>
                    </a>
                </Link>
            </>
        )
    }

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
                        query: { search },
                        })
                    }}
                    >
                    Back to results
                </button>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>{filmDetails.title}</h1>
                    <p className={styles.subtitle}>Episode: {filmId}</p>
                </div>
                <div className={styles.filmDetailsWrapper}>
                    <p>Director: {filmDetails.director}</p>
                    <p>Producer: {filmDetails.producer}</p>
                    <p>Release date: {filmDetails.release_date && filmDetails.release_date.split('-').reverse().join('-')}</p>
                </div>
            </>
            }
        </div>
    )
}

export default FilmDetails