  export function displayPriceFromWei(wei, etherToCurrency, currencyName) {
		const decimals = currencyName == 'UAH' ? 2 : 3

		return Math.trunc((wei * etherToCurrency / Math.pow(10, 18)) * (10 ** decimals)) / (10 ** decimals) + ' ' + currencyName
  }

  export function displayPriceFromEther(ether, etherToCurrency, currencyName) {
		const decimals = currencyName == 'UAH' ? 2 : 3

		return Math.trunc(ether * etherToCurrency * (10 ** decimals)) / (10 ** decimals) + ' ' + currencyName
  }