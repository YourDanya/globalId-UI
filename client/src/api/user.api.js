
import createApiProvider from "../utils/api-utils/createApiProvider";
import baseUrl from './baseUrl'

const userApi = createApiProvider({
	url: `users`,
	baseUrl
});

export default userApi