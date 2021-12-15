import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserData, selectUserData } from '../../../redux/user/user.slice';
import brokenImage from '../../../assets/icons/broken-image.png'
import WithSpinner from '../../layout/WithSpinner/WithSpinner';

import styles from './Dashboard.module.sass'
import baseUrl from '../../../api/baseUrl';
import axios from 'axios';
import userProfileApi from '../../../api/userProfile.api';
import { changeAvatar } from '../../../redux/profile/profile.slice';


const Dashboard = ({user, changeAvatar}) => {


async function handleAvatarInput(event) {
  changeAvatar(event.target.files[0])
}
  return (
    <>
      <h1 className={styles.header}>Welcome to the DashBoard!</h1>
      <label htmlFor="Change avatar">Change avatar</label>
      <input type='file' name='Change avatar' onChange={handleAvatarInput} />
      <img alt='avatar' className={styles.avatar} src={user?.avatar ? `${baseUrl}/images/${user.avatar}` : brokenImage }/>
      <p className={styles.userName}>{user ? `Welcome ${user.name}` : `Error!`}</p>
    </>
  )
};

const mapStateToProps = state => ({
  user: selectUserData(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeAvatar: (avatar) => dispatch(changeAvatar(avatar))
})

export default WithSpinner(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
