export function verifyImageFiles(req, res, next) {
	if (!Object.keys(req.files).length > 0) return res.status(400).send('You didn\t upload any file')
	for (const file in req.files) {
		if (!req.files[file].mimetype.startsWith('image')) return res.status(400).send('The file is not an image')}
	next()
}