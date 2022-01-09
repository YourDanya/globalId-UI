import express from "express"

import {resetUserPassword, getUserData, setUserData, activateUser, updateUserData, setAvatar, updateUserPassword, forgotUserPassword, getAllUsers} from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";
import { verifyImageFiles } from "../../utils/upload.utils.js";

const router = express.Router();


router.route('/user-data/')
    .get(jwtParser, getUserData)
    .post(jwtParser, setUserData)

router.route('/user-data/all-users')
    .get(getAllUsers)

router.route('/user-data/profile')
    .post(jwtParser, updateUserData)

router.route('/update-password')
    .post(jwtParser, updateUserPassword)

router.route('/forgot-password')
    .post(jwtParser, forgotUserPassword)

router.route('/reset-password/:token')
    .post(jwtParser, resetUserPassword)

router.get('/verify', jwtParser, activateUser)

router.get('/verify', jwtParser, activateUser)
router.post('/user-data/profile/avatar', jwtParser, verifyImageFiles, setAvatar)


export default router
