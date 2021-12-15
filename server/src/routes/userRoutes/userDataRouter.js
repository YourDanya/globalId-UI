import express from "express"
import { getUserData, setUserData, activateUser, setAvatar } from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";
import { verifyImageFiles } from "../../utils/upload.utils.js";

const router = express.Router();

router.get('/user-data', getUserData)
router.get('/verify', activateUser)
router.post('/user-data', setUserData)
router.post('/user-data/profile/avatar', verifyImageFiles, setAvatar)


export default router
