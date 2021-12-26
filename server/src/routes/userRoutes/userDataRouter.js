import express from "express"

import {resetUserPassword, getUserData, setUserData, activateUser, updateUserData, setAvatar, updateUserPassword, forgotUserPassword} from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";
import { verifyImageFiles } from "../../utils/upload.utils.js";

const router = express.Router();

router.use(jwtParser)

router.route('/user-data/')
    .get(getUserData)
    .post(setUserData)

router.route('/user-data/profile')
    .post(updateUserData)

router.route('/update-password')
    .post(updateUserPassword)

router.route('/forgot-password')
    .post(forgotUserPassword)

router.route('/reset-password/:token')
    .post(resetUserPassword)

router.get('/verify', activateUser)

router.get('/verify', activateUser)
router.post('/user-data/profile/avatar', verifyImageFiles, setAvatar)


export default router
