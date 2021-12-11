import React, {  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/user/user.slice';
import { selectAuthLoading } from '../../../redux/loading.slice';
import styles from './Navbar.module.sass'


const Navbar = ({ isAuthenticated, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <span className={styles.hide_if_small}>Dashboard</span>
        </Link>
      </li>
      {
        isAuthenticated ? 
          <li>
        <Link to='/' onClick={logout}>Logout</Link>
      </li> :
      ''
      }
      
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='auth'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={styles.navbar}>
      <h1>
        <Link to='/'>
           MERN Boilerplate
        </Link>
      </h1>
        <>{isAuthenticated ? authLinks : guestLinks}</>
      )
    </nav>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: selectAuthLoading(state).success
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
