import axios from 'axios';
import {
	handleResponse,
	handleError
} from './handleResponse';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally

const DEFAULT_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_SERVER : process.env.REACT_APP_DEVELOPMENT_SERVER



const createApiProvider = (BASE_URL = DEFAULT_BASE_URL) => ({
	getAll: async (resource) => {
		return await axios
			.get(`${BASE_URL}/${resource}`, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	getSingle: async (resource, id) => {
		return await axios
			.get(`${BASE_URL}/${resource}/${id}`, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	post: async (resource, model) => {
		return await axios
			.post(`${BASE_URL}/${resource}`, model, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	postSingle: async (resource, id, model) => {
		console.log('inside post single')
		console.log(`${BASE_URL}/${resource}/${id}`)
		return await axios
			.post(`${BASE_URL}/${resource}/${id}`, model, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	put: async (resource, model) => {
		return await axios
			.put(`${BASE_URL}/${resource}`, model, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	patch: async (resource, model) => {
		return await axios
			.patch(`${BASE_URL}/${resource}`, model, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},

	remove: async (resource, id) => {
		return await axios
			.delete(`${BASE_URL}/${resource}`, id, {withCredentials: true})
			.then(handleResponse)
			.catch(handleError);
	},
})

export default createApiProvider