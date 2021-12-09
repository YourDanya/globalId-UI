import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthMenu from '../auth/AuthMenu';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <h2 style={{color: 'black'}}>Choose auth method</h2>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>MERN Boilerplate</h1>
          
          <div className='buttons'>
          </div>
        </div>
      </div>
    </section>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.loading.user.auth.success
});

export default connect(mapStateToProps)(Landing);
