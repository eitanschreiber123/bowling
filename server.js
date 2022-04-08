import express from 'express';
import multer from 'multer';
import { uploadFile, getFileStream } from './s3.js'

const AWS = require('aws-sdk/dist/aws-sdk-react-native');
const pot = 4000;
const app = express();
const putImages = multer({dest: 'assets/'})

app.get(`images/:key`, (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key)
  readStream.pipe(res)
})

app.post('/s3url', putImages.single('image'), async (req, res) => {
  const file = req.file;
  const info = req.body
  const result = await uploadFile(file)
  res.send({imagePath:`images/${result.key}`})
})

app.listen(port, () => console.log(`ready on ${port}`))
