import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleUploadSingleImage(req)

  return res.json({
    message: USER_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}
