import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectUserData } from '../../../redux/user/user.slice';
import Spinner from '../../layout/Spinner';
import WithSpinner from '../../layout/WithSpinner/WithSpinner';

import styles from './Dashboard.module.sass'


const Dashboard = ({user}) => {

  return (
    <>
      <h1 className={styles.header}>Welcome to the DashBoard!</h1>
      <p className={styles.userName}>{user ? `Welcome ${user.name}` : `Error!`}</p>
    </>
  )
};

const mapStateToProps = state => ({
  user: selectUserData(state)
});

export default WithSpinner(connect(mapStateToProps)(Dashboard));
