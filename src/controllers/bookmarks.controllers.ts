import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BookmarkTweetReqBody } from '~/models/requests/Bookmark.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import bookmarkService from '~/services/bookmarks.services'
import 'dotenv/config'
import { BOOKMARK_MESSAGES } from '~/constants/messages'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, any, BookmarkTweetReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const tweet_id = req.body.tweet_id
  const result = await bookmarkService.createBookmarkTweet(user_id, tweet_id)

  return res.json({
    message: BOOKMARK_MESSAGES.BOOKMARK_CREATED_SUCCESSFULLY,
    result
  })
}
