import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: './src/.env' })

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3()


export async function uploadFileToAWS(file) {
	const fileStream = fs.createReadStream(file.path || file.tempFilePath)

	return await s3.upload({
	  Key: file.name,
	  Body: fileStream,
		Bucket: process.env.AWS_BUCKET 
	}).promise()
}

export function getFileStreamFromAWS(Key) {

	return s3.getObject({
		Key,
		Bucket: process.env.AWS_BUCKET
	}).createReadStream()
}

export async function deleteFileFromAWS(Key) {
	return await s3.deleteObject({
	  Key,
	  Bucket: process.env.AWS_BUCKET
	}).promise()
}