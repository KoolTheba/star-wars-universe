import React from "react"

import FilmCard from './FilmCard'

import styles from '../styles/FilmList.module.css'

const FilmList = ({filmsList, searchContext}) => {
    const searchContextElements = searchContext.split(' ').map((el) => el)

    return (
        <>
            <div className={styles.cardsWrapper}>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>Your films list for your search:</h3>
                    {searchContextElements.map((el, index) => <span key={index} className={styles.context}>{el}</span>)}
                </div>
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