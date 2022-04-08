import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config()
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accesKey = process.env.AWS_ACCESS_KEY
const secretAccesKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new S3({
  region,
  accesKey,
  secretAccesKey
})

export const uploadFile = file => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

const getFileStream = fileKey => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream
