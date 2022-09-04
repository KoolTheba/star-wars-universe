import React from "react";

import styles from '../styles/SearchDetails.module.css'

const SearchDetails = ({list}) => {
    return (
        <>
            <div className={styles.contextWrapper}>
                {list.map((el, index) => <span key={index} className={styles.context}>{el}</span>)}
            </div>
        </>
    )
}

export default SearchDetails