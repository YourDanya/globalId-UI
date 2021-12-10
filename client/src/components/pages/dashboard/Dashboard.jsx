import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectUserData } from '../../../redux/user.slice';
import Spinner from '../../layout/Spinner';
import WithSpinner from '../../layout/WithSpinner/WithSpinner';

const Dashboard = ({user}) => {

  return (
    <>
      <h1 className='large text-primary'>Welcome to the DashBoard!</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
    </>
  )
};

const mapStateToProps = state => ({
  user: selectUserData(state)
});

export default WithSpinner(connect(mapStateToProps)(Dashboard));
