import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import AuthMenu from '../pages/Auth/AuthMenu';
import Landing from '../pages/Landing/Landing';
import { selectAuthLoading, selectUserDataLoading } from '../../redux/loading.slice';
import Navbar from '../layout/Navbar/Navbar';


const Routes = ({isAuthLoading, isUserDataLoading}) => {
// useEffect(() => console.log(loading.user.data), [loading])
  return (
      <Switch>
        <Route exact path='/'  component={Landing} />
        <PrivateRoute exact path='/dashboard' isLoading={isAuthLoading || isUserDataLoading} component={() => <Dashboard isLoading={isUserDataLoading}/>} />
        <Route path='/auth' component={AuthMenu} />
        <Route component={NotFound} />
      </Switch>
  );
};

const mapStateToProps = (state) => ({
  isUserDataLoading: selectUserDataLoading(state).isLoading,
  isAuthLoading: selectAuthLoading(state).isLoading
})

export default connect(mapStateToProps, null)(Routes);
