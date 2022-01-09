
import React, { useState } from 'react'
import { Tooltip } from '@material-ui/core'

function ChangeNameForm({changeName, user}) {
	const [message, setMessage] = useState('')
	return (
		<div>
			<form onSubmit={ async (e) => {
				e.preventDefault()
				const newName = e.target.newName.value
				await changeName(newName)
					.then(res => setMessage(res))
					.catch(err => setMessage(err.message))
			}} className='change-name-form'>
				<p>Change username</p>
				<br />
				<input type="text" name="newName" />
				<button>Submit</button>


				<div>
					{message}
				</div>
			</form>
		</div>
	)
}

export default ChangeNameForm
