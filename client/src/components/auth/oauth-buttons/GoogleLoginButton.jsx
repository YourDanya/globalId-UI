import React from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import WithSpinner from '../../layout/WithSpinner/WithSpinner'

function GoogleLoginButton({handleToken, isLoading}) {
	const handleResponse = (response) => {
		console.log(response)
		handleToken(response.tokenId)
	}
	return (
		<div>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText={'Log in with google'}
				onSuccess={handleResponse}
				onFailure={handleResponse}
				
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	)
}

export default GoogleLoginButton
