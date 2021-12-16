import { getFileStreamFromAWS } from "../utils/s3.utils.js"

export async function getImage(req, res) {
	const key = req.params.key
	const readStream = getFileStreamFromAWS(key)
	readStream.pipe(res)
}