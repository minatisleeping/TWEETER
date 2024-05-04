import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  // const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 3000 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      //! mimetype có thể là null nên dùng optional chaining(?.)
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('Invalid file type') as any)
      }
      return valid
    }
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)

      // * vì files.image là undefined nên phải chuyển về boolean để kiểm tra
      if (!files.image) return reject(new Error('File is empty'))

      resolve(files)
    })
  })
}
