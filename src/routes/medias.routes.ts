import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controllers'
import { wrapReqHandler } from '../utils/handler'

const mediasRouter = Router()

mediasRouter.post('/upload-image', wrapReqHandler(uploadImageController))

export default mediasRouter
