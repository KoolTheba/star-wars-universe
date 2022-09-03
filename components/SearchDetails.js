import React from "react";

import styles from '../styles/SearchDetails.module.css'

const SearchDetails = ({list}) => {
    return (
        <>
            {list.map((el, index) => <span key={index} className={styles.context}>{el}</span>)}
        </>
    )
}

export default SearchDetails