import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// Redux
import { connect, Provider } from 'react-redux';

import './App.css';
import { createStructuredSelector } from 'reselect';
import { getUserData } from './redux/user.slice';



const App = ({ getUserData, match}) => {
useEffect(() => {
  getUserData()
}, [])
  return (
        <>
          <Navbar />
          <Routes />
        </>
  );
};

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(getUserData())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
