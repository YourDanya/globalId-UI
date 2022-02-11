
import createApiProvider from "../utils/api-utils/createApiProvider";
import baseUrl from './baseUrl'

const authApi = createApiProvider({
	url: `auth`,
	baseUrl
});

export default authApi

