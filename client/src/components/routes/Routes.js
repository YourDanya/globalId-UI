import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import AuthMenu from '../pages/Auth/AuthMenu';
import Landing from '../pages/Landing/Landing';
import { selectAuthLoading, selectFetchUserDataLoading } from '../../redux/loading.slice';
import ProfileSettingsContainer from "../pages/profile-settings/ProfileSettings.container";
import Dashboard from "../pages/dashboard/Dashboard";
import PasswordReset from "../pages/password-reset/PasswordReset.Component";


const Routes = ({isAuthLoading, isUserDataLoading}) => {

  return <Switch>
        <Route exact path='/'  component={Landing} />
        <PrivateRoute exact path='/dashboard' isLoading={isAuthLoading || isUserDataLoading} component={() => <Dashboard isLoading={isUserDataLoading}/>} />
        <PrivateRoute path={ '/profile-settings' } isLoading={ isAuthLoading || isUserDataLoading } component={ () => <ProfileSettingsContainer isLoading={isUserDataLoading} /> }/>
        <Route path={ '/reset-password/:token' } component={PasswordReset}/>
        <Route path='/auth' component={AuthMenu} />
        <Route component={NotFound} />
      </Switch>
};

const mapStateToProps = (state) => ({
  isUserDataLoading: selectFetchUserDataLoading(state).isLoading,
  isAuthLoading: selectAuthLoading(state).isLoading
})

export default connect(mapStateToProps, null)(Routes);
