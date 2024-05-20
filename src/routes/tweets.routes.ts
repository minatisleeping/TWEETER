import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controllers'
import { createTweetValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const tweetRouter = Router()

/**
 * Description: Create Tweet
 * Path: /tweets/
 * Method: POST
 * Body: TweetRequestBody
 */
tweetRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator as any,
  createTweetValidator,
  wrapReqHandler(createTweetController)
)

export default tweetRouter
