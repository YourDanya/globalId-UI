import ApiCore from "../utils/api-utils/ApiCore";
import baseUrl from './baseUrl'

const authApi = new ApiCore({
	postSingle: true,
	url: `auth`,
	baseUrl
});

export default authApi

