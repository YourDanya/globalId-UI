import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { selectAuthLoading, selectUserDataLoading } from '../../../redux/loading.slice'
import { loginWithGoogle } from '../../../redux/user.slice'
import AuthMessage from '../../layout/AuthMessage'
import GoogleLoginButton from './oauth-buttons/GoogleLoginButton'
import Login from './password-auth/Login'
import Register from './password-auth/Register'

import styles from './AuthMenu.module.sass'

function PasswordAuthMenu({ history, match }) {
	return (
		<div>
			<Switch>
				<Route exact path= {`${match.url}/register`} component={Register} />
				<Route exact path={`${match.url}/login`} component={Login} />
				<div>
					<Link to={`${match.url}/register`} className={`${styles.btn} ${styles.primary}`}>
						Sign Up
					</Link>
					<Link to={`${match.url}/login`} className={`${styles.btn} ${styles.light}`}>
						Login
					</Link>
					<button onClick={history.goBack}>Choose auth method</button>
				</div>
			</Switch>

		</div>
	)
}


function AuthMenu({ isAuthenticated, isLoadingUser, isLoadingAuth, loginWithGoogle, history, match }) {
	return (isAuthenticated || isLoadingUser) ? <Redirect to='/dashboard' /> : (
		<div>
			<Switch>
				<Route path={`${match.url}/with-password`} component={PasswordAuthMenu} />
				<div>
					<AuthMessage />
					<button className={styles.btn} onClick={() => history.push(`${match.url}/with-password`)}>via Name and password</button>
					<GoogleLoginButton handleToken={loginWithGoogle} isLoading={isLoadingAuth} />
				</div>
			</Switch>
		</div>
	)
}

const mapStateToProps = state => ({
	isLoadingUser: selectUserDataLoading(state).isLoading,
	isLoadingAuth: selectAuthLoading(state).isLoading,
  isAuthenticated: selectAuthLoading(state).success
})

const mapDispatchToProps = (dispatch) => ({
	loginWithGoogle: (token) => dispatch(loginWithGoogle({ token })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu)
