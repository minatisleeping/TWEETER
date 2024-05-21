import { Router } from 'express'
import { bookmarkTweetController, unBookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapReqHandler } from '~/utils/handler'

const bookmarksRouter = Router()

/**
 * Description: Create Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapReqHandler(bookmarkTweetController))

/**
 * Description: UnBookmark Tweet
 * Path: /
 * Method: DELETE
 * Params: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapReqHandler(unBookmarkTweetController)
)

export default bookmarksRouter
