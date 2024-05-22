import { Router } from 'express'
import { createTweetController, getTweetChildrenController, getTweetController } from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const tweetRouter = Router()

/**
 ** Description: Create Tweet
 * Path: /
 * Method: POST
 * Body: TweetRequestBody
 * Header: { Authorization: Bearer <access_token> }
 */
tweetRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapReqHandler(createTweetController)
)

/**
 ** Description: Get Tweet
 * Path: /:tweet_id
 * Method: GET
 * Params: { tweet_id: string }
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  // audienceValidator,
  wrapReqHandler(getTweetController)
)

/**
 ** Description: Get Tweet Children
 * Method: GET
 * Path: /:tweet_id/children
 * Header: { Authorization?: Bearer <access_token> }
 * Query: { limit?: number, page?: number, tweet_type: TweetType }
 */
tweetRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  // audienceValidator,
  wrapReqHandler(getTweetChildrenController)
)

export default tweetRouter
