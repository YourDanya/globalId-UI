import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WithSpinner from '../layout/WithSpinner/WithSpinner';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  return (
  <Route
    {...rest}
    render={props =>
      { 
        return (isAuthenticated || isLoading) ? <Component {...props} /> : <Redirect to="/auth" />
      }
    }
  />
);}


const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.success
});

export default connect(mapStateToProps)(PrivateRoute)
