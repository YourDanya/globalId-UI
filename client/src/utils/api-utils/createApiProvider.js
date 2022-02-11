import axios from 'axios';
import {
	handleResponse,
	handleError
} from './handleResponse';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally

const DEFAULT_BASE_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_SERVER : process.env.REACT_APP_DEVELOPMENT_SERVER



const createApiProvider = ({baseUrl = DEFAULT_BASE_URL, url}) => ({
	getAll: async ({ withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.get(`${baseUrl}/${url}`, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},

	getSingle: async (id, { withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.get(`${baseUrl}/${url}/${id}`, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},

	post: async (model, { withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.post(`${baseUrl}/${url}`, model, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},

	// postSingle: async (id, model) => {
	postSingle: async (id, model, { withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.post(`${baseUrl}/${url}/${id}`, model, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},

	put: async (model, {withCredentials =  true, ...otherSettings} = {withCredentials: true}) => {
		return await axios
			.put(`${baseUrl}/${url}`, model, {withCredentials, ...otherSettings})
			.then(handleResponse)
			.catch(handleError);
	},

	patch: async (model, { withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.patch(`${baseUrl}/${url}`, model, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},

	remove: async (id, { withCredentials = true, ...otherSettings } = {withCredentials: true}) => {
		return await axios
			.delete(`${baseUrl}/${url}`, id, { withCredentials, ...otherSettings })
			.then(handleResponse)
			.catch(handleError);
	},
})
export default createApiProvider