import React from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { connect } from 'react-redux'
import { setAuthLoading } from '../../../redux/loading.slice'
import WithSpinner from '../../layout/WithSpinner/WithSpinner'

function GoogleLoginButton({handleToken, setLoading}) {
	const handleClick = () => setLoading({isLoading: true, success: false, message: ''})
	const handleResponse = (response) => {
		console.log(response)
		handleToken(response.tokenId)
	}
	const handleFailure = (error) => {
		setLoading({success: false, message: 'Error logging in with google', isLoading: false})
	} 
	return (
		<div onClick={handleClick}>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText={'Log in with google'}
				onSuccess={handleResponse}
				onFailure={handleFailure}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	setLoading: (loading) => dispatch(setAuthLoading(loading))
})

export default WithSpinner(connect(null, mapDispatchToProps)(GoogleLoginButton))
