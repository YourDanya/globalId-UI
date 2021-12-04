import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { loginWithGoogle } from '../../redux/user.slice'
import AuthMessage from '../layout/AuthMessage'
import GoogleLoginButton from './oauth-buttons/GoogleLoginButton'

function NamePasswordAuthMenu({backToAuthMenu}) {
	return (
		<div className='buttons'>
			<Link to='/register' className='btn btn-primary'>
				Sign Up
			</Link>
			<Link to='/login' className='btn btn-light'>
				Login
			</Link>
			<button onClick={backToAuthMenu}>Choose auth method</button>
		</div>
	)
}

function AuthMenu({loginWithGoogle, loading}) {
	const [isNamePassword, setIsNamePassword] = useState(false)
	return (
		<div>
			{
				isNamePassword 
					?
						<NamePasswordAuthMenu backToAuthMenu={() => setIsNamePassword(false)}/>
					:
						<div className="buttons">
							<AuthMessage />
							<button className="btn" onClick={() => setIsNamePassword(true)}>via Name and password</button>
							<GoogleLoginButton handleToken={loginWithGoogle} isLoading={loading.user.auth}/>
						</div>
			}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
  auth: (state) => state.user.auth,
	loading: (state) => ({user: {auth: state.user.loading.auth}})
})

const mapDispatchToProps = (dispatch) => ({
  loginWithGoogle: (token) => dispatch(loginWithGoogle({token}))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu)
