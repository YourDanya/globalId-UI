import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { loginWithGoogle } from '../../redux/user.slice'
import AuthMessage from '../layout/AuthMessage'
import GoogleLoginButton from './oauth-buttons/GoogleLoginButton'
import Login from './password-auth/Login'
import Register from './password-auth/Register'

function PasswordAuthMenu({ history, match }) {
	return (
		<div className='buttons'>
			<Switch>
				<Route exact path= {`${match.url}/register`} component={Register} />
				<Route exact path={`${match.url}/login`} component={Login} />
				<div>
					<Link to={`${match.url}/register`} className='btn btn-primary'>
						Sign Up
					</Link>
					<Link to={`${match.url}/login`} className='btn btn-light'>
						Login
					</Link>
					<button onClick={history.goBack}>Choose auth method</button>
				</div>
			</Switch>

		</div>
	)
}


function AuthMenu({ loginWithGoogle, loading, history, match, isAuthenticated }) {
	return (isAuthenticated || loading.user.data) ? <Redirect to='dashboard' /> : (
		<div>
			<Switch>
				<Route path={`${match.url}/with-password`} component={PasswordAuthMenu} />
				<div className="buttons">
					<AuthMessage />
					<button className="btn" onClick={() => history.push(`${match.url}/with-password`)}>via Name and password</button>
					<GoogleLoginButton handleToken={loginWithGoogle} isLoading={loading.user.auth} />
				</div>
			</Switch>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	auth: (state) => state.user.auth,
	loading: (state) => ({ user: { auth: state.user.loading.auth, data: state.user.loading.data } }),
  isAuthenticated: (state) => state.user.auth.success
})

const mapDispatchToProps = (dispatch) => ({
	loginWithGoogle: (token) => dispatch(loginWithGoogle({ token })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu)
