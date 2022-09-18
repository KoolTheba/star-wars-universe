import React from 'react'

import styles from '../styles/FilmSearch.module.css'

const Instructions = () => {
  return (
    <>
        <section className={styles.instructionsSection}>
          <p className={styles.description}>Instructions:</p>
          <ol className={styles.directionsList}>
            <li>Search by one or more words separated by blank spaces</li>
            <li>The word(s) could be from a film title, a character, a planet or all at once!</li>
            <li>You can also search by vehicle or starship!</li>
            <li>Press Go button and see the results! <span role='img' aria-label="rocket">🚀</span></li>
          </ol>
        </section>

        <section className={styles.hintSection}>
        <p className={styles.hints}>Hints: looking for r2d2? Search for r2; looking for C3PO? Search for 3po</p>
        </section>
    </>
  )
}

export default Instructions
