import express from "express"

import { getUserData, setUserData, activateUser, updateUserData, setAvatar, updateMyPassword} from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";
import { verifyImageFiles } from "../../utils/upload.utils.js";

const router = express.Router();

router.use(jwtParser)

router.route('/user-data/')
    .get(getUserData)
    .post(setUserData)

router.route('/user-data/profile')
    .post(updateUserData)

router.route('/updateMyPassword')
    .post(updateMyPassword)

router.get('/verify', activateUser)

router.get('/verify', activateUser)
router.post('/user-data/profile/avatar', verifyImageFiles, setAvatar)


export default router
