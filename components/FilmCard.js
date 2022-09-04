import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import styles from '../styles/FilmCard.module.css'

const FilmCard = ({ film, searchContext }) => {
  const yearsPassed = new Date(new Date() - new Date(film.release_date)).getFullYear() - 1970

  return (
        <>
            <Link href={`/film/${encodeURIComponent(film.episode_id)}/?search=${searchContext}`}>
                <a>
                    <p data-testid="titleParagraph" className={styles.cardInfo}>{film.title}</p>
                    <p data-testid="episodeParagraph" className={styles.cardInfo}>{`Episode ${film.episode_id}`}</p>
                    <p data-testid="dateParagraph" className={styles.cardInfo}>{film.release_date} {`(${yearsPassed} years ago)`}</p>
                </a>
          </Link>
        </>
  )
}

FilmCard.propTypes = {
  film: PropTypes.object,
  searchContext: PropTypes.string
}

export default FilmCard
