import {OAuth2Client} from 'google-auth-library'
import dotenv from 'dotenv'

dotenv.config('src/.env')

export async function decodeGoogleCredentials(req, res, next) {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
	    let token = req.body.token;
	    	const ticket = await client.verifyIdToken({
	    		idToken: token,
	    		audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
	    	});
				if (!ticket) return res.status(400).send(`cant verify Google token (${token})`)
	    	const payload = ticket.getPayload();
	    	req.credentials = payload
				next()
}