import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/password-auth/Register';
import Login from '../auth/password-auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import AuthMenu from '../auth/AuthMenu';
import Landing from '../layout/Landing';

const Routes = ({loading}) => {
// useEffect(() => console.log(loading.user.data), [loading])
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/'  component={Landing} />
        <PrivateRoute exact path='/dashboard' isLoading={loading.user.auth.isLoading || loading.user.data.isLoading} component={() => <Dashboard isLoading={loading.user.data.isLoading}/>} />
        <Route path='/auth' component={AuthMenu} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading
})

export default connect(mapStateToProps, null)(Routes);
