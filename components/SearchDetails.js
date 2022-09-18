import React from 'react'
import PropTypes from 'prop-types'

import { arrayHandler } from '../utils/arrayTransform'

import styles from '../styles/SearchDetails.module.css'

const SearchDetails = ({ list }) => {
  const searchList = list && arrayHandler(list)
  return (
    <>
        <div className={styles.contextWrapper}>
            {searchList.map((el, index) => <span role='text' key={index} className={styles.context}>{el}</span>)}
        </div>
    </>
  )
}

SearchDetails.propTypes = {
  list: PropTypes.string
}

export default SearchDetails
