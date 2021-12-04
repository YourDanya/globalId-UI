import express from "express"
import {login, loginWithGoogle, logout, signUp} from '../../controllers/user/authController.js'
import { decodeGoogleCredentials } from "../../utils/oAuth.utils.js";

const router = express.Router();

router.post('/login-with-google', decodeGoogleCredentials, loginWithGoogle)
router.post('/login', login)
router.post('/signup', signUp)
router.post('/logout', logout)

export default router