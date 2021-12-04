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



const App = ({auth, getUserData}) => {
useEffect(() => {
  getUserData()
}, [])
  return (
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
  );
};

const mapStateToProps = createStructuredSelector({
  auth: (state) => state.user.auth
})

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(getUserData())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
