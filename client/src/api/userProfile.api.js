import ApiCore from "../utils/api-utils/ApiCore";
import baseUrl from './baseUrl'

const userProfileApi = new ApiCore({
  getAll: true,
  getSingle: true,
	postSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: `users/user-data/profile`,
  baseUrl
});

export default userProfileApi