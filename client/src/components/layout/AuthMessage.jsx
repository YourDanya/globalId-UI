import React from 'react'
import { connect } from 'react-redux'
import WithSpinner from './WithSpinner/WithSpinner'

const AuthMessage = ({message}) => {
	return (
		<div>
			{message}
		</div>
	)
}

const mapStateToProps = (state) => ({
	message: state.loading.user.auth.message
})

export default WithSpinner(connect(mapStateToProps)(AuthMessage))
