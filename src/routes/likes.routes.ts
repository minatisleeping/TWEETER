import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/tweets.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'

import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const likesRouter = Router()
/**
 * Description: Like Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
likesRouter.post(
  '/like-tweet',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapReqHandler(likeTweetController)
)

/**
 * Description: Unlike Tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Params: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapReqHandler(unlikeTweetController)
)

export default likesRouter
