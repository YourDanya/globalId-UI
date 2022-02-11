
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectModifyProfileLoading } from '../redux/loading.slice'
import { modifyProfile } from '../redux/profile/profile.slice'
import { selectUser } from '../redux/user/user.slice'

function ChangeNameForm({user, loading, changeName}) {
	return (
		<div>
			<form onSubmit={ async (e) => {
				e.preventDefault()
				const newName = e.target.newName.value
				changeName(newName)
			}} className='change-name-form'>
				<p>Change username</p>
				<br />
				<input type="text" name="newName" />
				<button>Submit</button>


				<div>
					{loading.message}
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => ({
	user: selectUser(state),
	loading: selectModifyProfileLoading(state)
})

const mapDispatchToProps = (dispatch) => ({
	changeName: (name) => dispatch(modifyProfile({name}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNameForm)
