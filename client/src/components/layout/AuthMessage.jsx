import React from 'react'
import { connect } from 'react-redux'
import { selectAuthLoading } from '../../redux/loading.slice'
import WithSpinner from './WithSpinner/WithSpinner'

const AuthMessage = ({message}) => {
	return (
		<div>
			{message}
		</div>
	)
}

const mapStateToProps = (state) => ({
	message: selectAuthLoading(state).message
})

export default WithSpinner(connect(mapStateToProps)(AuthMessage))
