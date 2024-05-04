import { Router } from 'express'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
import { wrapReqHandler } from '../utils/handler'

const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapReqHandler(uploadSingleImageController))

export default mediasRouter
