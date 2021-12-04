import express from "express"
import { getUserData, setUserData, activateUser } from "../../controllers/user/dataController.js";
import { jwtParser } from "../../utils/jwt.utils.js";

const router = express.Router();

router.get('/user-data', jwtParser, getUserData)
router.get('/verify', jwtParser, activateUser)
router.post('/user-data', jwtParser, setUserData)


export default router
