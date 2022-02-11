	export function toMilliseconds({ months, days, hours, minutes }) {
	  return months * 2592000000 + days * 86400000 + hours * 3600000 + minutes * 60000
	}

	  export function msToDateTime(allMilliseconds) {
	    let milliseconds = allMilliseconds % 1000
	    let allSeconds = Math.trunc(allMilliseconds / 1000)
	    let seconds = allSeconds % 60
	    let allMinutes = Math.trunc(allSeconds / 60)
	    let minutes = allMinutes % 60
	    let allHours = Math.trunc(allMinutes / 60)
	    let hours = allHours % 24
	    let allDays = Math.trunc(allHours / 24)
	    let days = allDays % 30
	    let allMonths = Math.trunc(allDays / 30)


	    return `${allMonths && allMonths + ' months' || ''} ${days && days + ' days' || ''} ${hours && hours + ' hours' || ''} ${minutes && minutes + ' min' || ''}  ${(allMilliseconds <= 300000 && seconds) && seconds + ' sec' || ''}`
	  }