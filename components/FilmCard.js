import React from "react"

import styles from '../styles/FilmCard.module.css'

const FilmCard = ({film}) => {
    return (
        <>
            <p className={styles.cardInfo}>{film.title}</p>
            <p className={styles.cardInfo}>{`Episode ${film.episode_id}`}</p>
            <p className={styles.cardInfo}>{film.release_date}</p>
        </>
    )
}

export default FilmCard