import 'dotenv/config'
import { Request } from 'express'
import { getNameFromFullname, handleUploadImage } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Others'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)

        return {
          url: isProduction
            ? `${process.env.HOST}/static/${newName}.jpg`
            : `${process.env.LOCALHOST}:${process.env.PORT}/static/${newName}.jpg`,
          type: MediaType.IMAGE
        }
      })
    )
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
