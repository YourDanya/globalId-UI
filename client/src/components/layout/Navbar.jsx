import React, {  } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/user.slice';

const Navbar = ({ isAuthenticated, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
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
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> MERN Boilerplate
        </Link>
      </h1>
        <>{isAuthenticated ? authLinks : guestLinks}</>
      )
    </nav>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.success
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
