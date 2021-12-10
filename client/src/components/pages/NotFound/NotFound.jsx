import React, {  } from 'react';
import styles from './NotFound.module.sass'
const NotFound = () => {
  return (
    <>
      <h1 className={`${styles.text_primary} ${styles.x_large}`}> Page Not Found</h1>
      <p className={styles.large}>Sorry, this page does not exist</p>
    </>
  );
};

export default NotFound;
