import express from "express"
import { getUserData, setUserData, activateUser, updateUserData} from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";

const router = express.Router();

router.use(jwtParser)

router.route('/user-data/')
    .get(getUserData)
    .post(setUserData)

router.route('/user-data/profile')
    .post(updateUserData)

router.get('/verify', activateUser)



export default router
