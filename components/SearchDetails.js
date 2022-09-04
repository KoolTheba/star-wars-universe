import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/SearchDetails.module.css'

const SearchDetails = ({ list }) => {
  return (
        <>
            <div className={styles.contextWrapper}>
                {list.map((el, index) => <span role='text' key={index} className={styles.context}>{el}</span>)}
            </div>
        </>
  )
}

SearchDetails.propTypes = {
  list: PropTypes.array
}

export default SearchDetails
