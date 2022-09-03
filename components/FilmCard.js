import React from "react"
import Link from 'next/link'

import styles from '../styles/FilmCard.module.css'

const FilmCard = ({film, searchContext}) => {
    const yearsPassed =  new Date(new Date() - new Date(film.release_date)).getFullYear() - 1970

    return (
        <>
            <Link href={`/film/${encodeURIComponent(film.episode_id)}/?search=${searchContext}`}>
                <a>
                    <p className={styles.cardInfo}>{film.title}</p>
                    <p className={styles.cardInfo}>{`Episode ${film.episode_id}`}</p>
                    <p className={styles.cardInfo}>{film.release_date} {`(${yearsPassed} years ago)`}</p>
                </a>
          </Link>
        </>
    )
}

export default FilmCard