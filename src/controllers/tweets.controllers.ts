import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEET_MESSAGES } from '~/constants/messages'
import { LikeTweetReqBody } from '~/models/requests/Like.requests'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import likeService from '~/services/likes.services'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)

  return res.json({
    message: TWEET_MESSAGES.CREATE_TWEET_SUCCESS,
    result
  })
}

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likeService.likeTweet(user_id, tweet_id)

  return res.json({
    message: TWEET_MESSAGES.LIKE_TWEET_SUCCESS,
    result
  })
}

// export const unlikeTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
//   const { user_id } = req.decoded_authorization as TokenPayload
//   const result = await tweetsService.createTweet(user_id, req.body)

//   return res.json({
//     message: TWEET_MESSAGES.CREATE_TWEET_SUCCESS,
//     result
//   })
// }
