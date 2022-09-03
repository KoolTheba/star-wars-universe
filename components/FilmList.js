import React from "react"

import FilmCard from './FilmCard'

import styles from '../styles/FilmList.module.css'

const FilmList = ({filmsList, searchContext}) => {
    return (
        <>
            <div className={styles.cardsWrapper}>
                <h3 className={styles.title}>Your films list!</h3>
                <ul className={styles.cardsList}>
                {filmsList.map((film) => (
                    <li key={film.episode_id} className={styles.cardItem}>
                        <FilmCard film={film} searchContext={searchContext}/>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}

export default FilmList