

import axios from 'axios'
import React, { useState } from 'react'
import { createChallenge } from '../redux/gameActions/gameActions.slice'
import { selectDisplayedCurrency, selectPrices, switchDisplayedCurrency } from '../redux/currency/currency.slice'
import { selectUser } from '../redux/user/user.slice'
import { toMilliseconds } from '../utils/convertation-utils/date.utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

function CreateChallengeForm({ user, displayedCurrency, prices, createChallenge, switchDisplayedCurrency }) {

	const [error, setError] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()

		//stakes
		const displayedCurrencyToToken = (() => {
			if (displayedCurrency == 'MATIC') return 1
			return prices.find(price => price.from == 'MATIC' && price.to == displayedCurrency).value
		})()

		let challengerStakeAtRisk = Math.trunc((e.target.challengerStakeAtRisk.value / displayedCurrencyToToken) * 1000) / 1000
		if (challengerStakeAtRisk >= user.balance) {
			setError('Not enough money')
			return
		}
		let inspectorReward = Math.trunc(((e.target.inspectorReward.value || 0) / displayedCurrencyToToken) * 1000) / 1000
		if (challengerStakeAtRisk < inspectorReward) {
			setError('Inspector reward should be less or equal than whole stake')
			return
		}

		//--
		let inspectorAddress = e.target.inspectorAddress.value

		//--
		let description = e.target.description.value

		//challenge timeout
		let timeoutAfterMilliseconds = toMilliseconds({
			months: parseInt(e.target.timeoutMonths.value),
			days: parseInt(e.target.timeoutDays.value),
			hours: parseInt(e.target.timeoutHours.value),
			minutes: parseInt(e.target.timeoutMinutes.value),
		})

		//--
		const newChallenge = {
			timeoutAfterMilliseconds,
			challengerStakeAtRisk,
			inspectorAddress,
			description,
			inspectorReward
		}

		createChallenge(newChallenge)


		console.log('New challenge created:')
		console.log(newChallenge);
	}


	return (
		<form onSubmit={onSubmit} className='create-challenge-form'>
			<p>Your balance is {user[`balance${displayedCurrency !== 'MATIC' ? displayedCurrency : ''}`]} {displayedCurrency}</p>
			<span>Bet some money on your success</span>
			<br />
			<input type="text" name="challengerStakeAtRisk" />
			<button type="button" style={{ width: '70px' }} onClick={switchDisplayedCurrency}>{displayedCurrency}</button> choose currency
			<br />
			<span>Reward to inspector for their attention (optional)</span>
			<br />
			<input type="text" name="inspectorReward" id="" />
			<br />
			<span>Who will inspect your challenge (address)</span>
			<br />
			<input type="text" name="inspectorAddress" />
			<br />
			<span>Define your challenge. Description</span>
			<textarea type="text" name="description" style={{ height: '100px', width: '400px' }} />
			<br />
			<span>What time do you need to succeed (optional)</span>
			<br />
			<input max="12" min="0" style={{ width: '50px' }} type="number" name="timeoutMonths" defaultValue="0" /><span>months</span><br />
			<input max="30" min="0" style={{ width: '50px' }} type="number" name="timeoutDays" defaultValue="0" /><span>days</span><br />
			<input max="24" min="0" style={{ width: '50px' }} type="number" name="timeoutHours" defaultValue="0" /><span>hours</span><br />
			<input max="60" min="0" style={{ width: '50px' }} type="number" name="timeoutMinutes" defaultValue="0" /><span>minutes</span><br />
			<br />
			<input type="submit" title='Submit' />
			<p>{error}</p>
		</form>
	);
}

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	prices: selectPrices,
	displayedCurrency: selectDisplayedCurrency
})

const mapDispatchToProps = (dispatch) => ({
	createChallenge: (payload) => dispatch(createChallenge(payload)),
	switchDisplayedCurrency: () => dispatch(switchDisplayedCurrency())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengeForm)
