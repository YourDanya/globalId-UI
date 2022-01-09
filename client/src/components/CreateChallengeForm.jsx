import axios from 'axios'
import React, { useState } from 'react'

function CreateChallengeForm({ user, createChallenge }) {
	
	const [error, setError] = useState('')
	const [currencyIndex, setCurrencyIndex] = useState(0)
	const currencies = ['MATIC', 'UAH', 'USD']
	function toMilliseconds({months, days, hours, minutes}) {
		return  months * 2592000000 + days * 86400000 + hours * 3600000 + minutes * 60000
	}
	function changeCurrency() {
		const nextCurrencyIndex = currencyIndex < 2 ? currencyIndex + 1 : 0
		setCurrencyIndex(nextCurrencyIndex)
	}
	return (
		<form onSubmit={async (e) => {
			e.preventDefault()
			console.log(e.target.elements);
			let timeoutAfterMilliseconds = toMilliseconds({
				months:  parseInt(e.target.timeoutMonths.value),
				days: parseInt(e.target.timeoutDays.value),
				hours: parseInt(e.target.timeoutHours.value),
				minutes: parseInt(e.target.timeoutMinutes.value),
			})
			let maticPrice
			switch(currencies[currencyIndex]) {
				case 'UAH': maticPrice = (await axios.get('https://api.coinbase.com/v2/prices/MATIC-UAH/spot')).data.data.amount
				break
				case 'USD': maticPrice = (await axios.get('https://api.coinbase.com/v2/prices/MATIC-USD/spot')).data.data.amount
				break
				case 'MATIC': maticPrice = 1
				break
			}
			let challengerStakeAtRisk = Math.trunc((e.target.challengerStakeAtRisk.value / maticPrice) * 1000) / 1000
			if (challengerStakeAtRisk >= user.balance) {
				setError('Not enough money')
				return
			}
			let inspectorReward = Math.trunc(((e.target.inspectorReward.value || 0) / maticPrice) * 1000) / 1000
			if (challengerStakeAtRisk < inspectorReward) {
				setError('Inspector reward should be less or equal than whole stake')
				return
			}
			console.log(inspectorReward);
			let inspectorAddress = e.target.inspectorAddress.value
			let description = e.target.description.value
			const newChallenge = {
				timeoutAfterMilliseconds,
				challengerStakeAtRisk,
				inspectorAddress,
				description,
				inspectorReward
			}
			console.log(newChallenge);
			await createChallenge(newChallenge)
		}} className='create-challenge-form'>
			<p>Your balance is {user[`balance${currencyIndex !== 0 ? currencies[currencyIndex] : ''}`]} {currencies[currencyIndex]}</p>
			<span>Bet some money on your success</span>
			<br />
			<input type="text" name="challengerStakeAtRisk"/>
			<button type="button" style={{width: '70px'}} onClick={changeCurrency}>{currencies[currencyIndex]}</button> choose currency
			<br />
			<span>Reward to inspector for their attention (optional)</span>
			<br />
			<input type="text" name="inspectorReward" id="" />
			<br />
			<span>Who will inspect your challenge (address)</span>
			<br />
			<input type="text" name="inspectorAddress"/>
			<br />
			<span>Define your challenge. Description</span>
			<textarea type="text" name="description" style={{height: '100px', width: '400px'}}/>
			<br />
			<span>What time do you need to succeed (optional)</span>
			<br />
			<input max="12" min="0" style={{width: '50px'}} type="number" name="timeoutMonths" defaultValue="0"/><span>months</span><br />
			<input max="30" min="0" style={{width: '50px'}} type="number" name="timeoutDays" defaultValue="0"/><span>days</span><br />
			<input max="24" min="0" style={{width: '50px'}} type="number" name="timeoutHours" defaultValue="0"/><span>hours</span><br />
			<input max="60" min="0" style={{width: '50px'}} type="number" name="timeoutMinutes" defaultValue="0"/><span>minutes</span><br />
			<br />
			<input type="submit" title='Submit' />
			<p>{error}</p>
		</form>
	);
}

export default CreateChallengeForm
