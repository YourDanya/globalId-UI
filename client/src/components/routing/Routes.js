import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/password-auth/Register';
import Login from '../auth/password-auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';

const Routes = ({loading}) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={() => <Dashboard isLoading={loading.user.data}/>} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: {
    user: {
      data: state.user.loading.data
    }
  }
})

export default connect(mapStateToProps, null)(Routes);
