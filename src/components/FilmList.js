import React from 'react'
import PropTypes from 'prop-types'

import FilmCard from './FilmCard'
import SearchDetails from './SearchDetails'

import styles from '../styles/FilmList.module.css'

const FilmList = ({ filmsList, searchContext }) => {
  return (
        <>
            <div className={styles.cardsWrapper}>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>Your films list for your search:</h3>
                    <SearchDetails list={searchContext}/>
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

FilmList.propTypes = {
  filmsList: PropTypes.array,
  searchContext: PropTypes.string
}

export default FilmList
