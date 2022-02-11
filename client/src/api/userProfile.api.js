import createApiProvider from "../utils/api-utils/createApiProvider";
import baseUrl from './baseUrl'

const userProfileApi = createApiProvider({
  url: `users/user-data/profile`,
  baseUrl
});

export default userProfileApi