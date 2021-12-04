import ApiCore from "../utils/api-utils/ApiCore";
import baseUrl from './baseUrl'

const userApi = new ApiCore({
	getAll: true,
	getSingle: true,
	post: true,
	put: false,
	patch: true,
	delete: false,
	url: `users`,
	baseUrl
});

export default userApi