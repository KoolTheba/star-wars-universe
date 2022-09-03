import React from "react"

import styles from '../styles/FilmCard.module.css'

const FilmCard = ({film}) => {
    const yearsPassed =  new Date(new Date() - new Date(film.release_date)).getFullYear() - 1970

    return (
        <>
            <p className={styles.cardInfo}>{film.title}</p>
            <p className={styles.cardInfo}>{`Episode ${film.episode_id}`}</p>
            <p className={styles.cardInfo}>{film.release_date} {`(${yearsPassed} years ago)`}</p>
        </>
    )
}

export default FilmCard