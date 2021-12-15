import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuthLoading } from '../../redux/loading.slice';

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
  isAuthenticated: selectAuthLoading(state).success
});

export default connect(mapStateToProps)(PrivateRoute)
