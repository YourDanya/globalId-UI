import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import AuthMenu from '../pages/Auth/AuthMenu';
import Landing from '../pages/Landing/Landing';
import { selectAuthLoading, selectUserDataLoading } from '../../redux/loading.slice';
import Navbar from '../layout/Navbar/Navbar';
import Dashboard from "../pages/Dashboard/Dashboard";
import WithSpinner from "../layout/WithSpinner/WithSpinner";
import ProfileSettingsContainer from "../pages/profile-settings/Profile.container";


const Routes = ({isAuthLoading, isUserDataLoading}) => {
// useEffect(() => console.log(loading.user.data), [loading])

  return <Switch>
        <Route exact path='/'  component={Landing} />
        <PrivateRoute exact path='/dashboard' isLoading={isAuthLoading || isUserDataLoading} component={() => <Dashboard isLoading={isUserDataLoading}/>} />
        <PrivateRoute path={ '/profile-settings' } isLoading={ isAuthLoading || isUserDataLoading } component={ () => <ProfileSettingsContainer isLoading={isUserDataLoading} /> }/>
        <Route path='/auth' component={AuthMenu} />
        <Route component={NotFound} />
      </Switch>
};

const mapStateToProps = (state) => ({
  isUserDataLoading: selectUserDataLoading(state).isLoading,
  isAuthLoading: selectAuthLoading(state).isLoading
})

export default connect(mapStateToProps, null)(Routes);
