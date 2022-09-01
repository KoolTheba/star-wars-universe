import React from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/FilmDetails.module.css'

const FilmDetails = () => {
    const { query: { filmId }} = useRouter()

    return (
        <div className={styles.container}>
            <h1>Film Details: {filmId}</h1>
        </div>
    )
}

export default FilmDetails