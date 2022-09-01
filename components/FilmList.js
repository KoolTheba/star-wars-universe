import React from "react"

import FilmCard from './FilmCard'

import styles from '../styles/FilmList.module.css'

const FilmList = ({filmsList, error}) => {

    if(!error && filmsList.length === 0){
        return <span>There are no films under that criteria</span>
    }

    return (
        <>
            <div className={styles.cardsWrapper}>
                <h3>Films listed</h3>
                <ul className={styles.cardsList}>
                {filmsList.map((film) => (
                    <li key={film.episode_id} className={styles.cardItem}>
                        <FilmCard film={film}/>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}

export default FilmList