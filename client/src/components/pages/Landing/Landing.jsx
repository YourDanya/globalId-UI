import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuthLoading } from '../../../redux/loading.slice';
import styles from './Landing.module.sass'


const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className={styles.landing}>
      <h2 style={{color: 'black'}}>Choose auth method</h2>
      <div className={styles.dark_overlay}>
        <div className={styles.landing_inner}>
          <h1 className={styles.x_large}>MERN Boilerplate</h1>
        </div>
      </div>
    </section>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: selectAuthLoading(state).success
});

export default connect(mapStateToProps)(Landing);
