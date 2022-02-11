import classes from './WithSpinner.module.sass'

import React from 'react'

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
	// useEffect(() => console.log(is))
	return (
		isLoading
			?
				<div className={classes.container}>
					<div className={classes.spinner}></div>
				</div>
			:
				<WrappedComponent {...otherProps} />
	)

}

export default WithSpinner


