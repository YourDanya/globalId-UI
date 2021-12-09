import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginWithNameAndPassword } from '../../../redux/user.slice';
import AuthMessage from '../../layout/AuthMessage';
import Spinner from '../../layout/Spinner';

const Login = ({ login, isAuthenticated, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const { name, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ name, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <AuthMessage isLoading={isLoading} />

      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            id='email-input'
            type='text'
            placeholder='nameOrEmail'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            id='password-input'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='1'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <Link to='/'>Choose another auth method</Link>
    </>
  );
};



const mapStateToProps = state => ({
  isAuthenticated: state.loading.user.auth.success,
  isLoading: state.loading.user.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(loginWithNameAndPassword(credentials))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
