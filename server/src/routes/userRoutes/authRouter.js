import express from "express"
import {login, loginWithGoogle, loginWithWeb3, logout, signUp} from '../../controllers/user/authController.js'
import { decodeGoogleCredentials } from "../../utils/oAuth.utils.js";
import { confirmAddressSignature } from "../../utils/web3.utils.js";

const router = express.Router();

router.post('/login-with-web3', confirmAddressSignature, loginWithWeb3)
// router.post('/login-with-google', decodeGoogleCredentials, loginWithGoogle)
// router.post('/login', login)
// router.post('/signup', signUp)
router.post('/logout', logout)

export default router