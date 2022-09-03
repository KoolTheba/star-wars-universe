import React from "react"

import FilmCard from './FilmCard'
import SearchDetails from "./SearchDetails"

import { arrayHandler } from "../utils/arrayTransform"

import styles from '../styles/FilmList.module.css'

const FilmList = ({filmsList, searchContext}) => {
    const searchContextElements = arrayHandler(searchContext)

    return (
        <>
            <div className={styles.cardsWrapper}>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>Your films list for your search:</h3>
                    <SearchDetails list={searchContextElements}/>
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