import { checkSchema } from 'express-validator'
import { isEmpty } from 'lodash'
import { ObjectId } from 'mongodb'
import { MediaType, TweetAudience, TweetType } from '~/constants/enums'
import { TWEET_MESSAGES } from '~/constants/messages'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'

const tweetTypes = numberEnumToArray(TweetType)
const tweetAudience = numberEnumToArray(TweetAudience)
const mediaType = numberEnumToArray(MediaType)

export const createTweetValidator = validate(
  checkSchema({
    type: {
      isIn: {
        options: [tweetTypes],
        errorMessage: TWEET_MESSAGES.INVALID_TYPE
      }
    },
    audience: {
      isIn: {
        options: [tweetAudience],
        errorMessage: TWEET_MESSAGES.INVALID_AUDIENCE
      }
    },
    parent_id: {
      custom: {
        options: (value, { req }) => {
          const type = req.body.type as TweetType
          //* Nếu type là retweet, comment, quote_tweet thì parent_id phải là 'tweet_id' của tweet cha
          if (
            [TweetType.RE_TWEET, TweetType.COMMENT, TweetType.QUOTE_TWEET].includes(type) &&
            !ObjectId.isValid(value)
          ) {
            throw new Error(TWEET_MESSAGES.PARENT_ID_MUST_BE_A_VALID_TWEET_ID)
          }

          if (type === TweetType.TWEET && value !== null) {
            throw new Error(TWEET_MESSAGES.PARENT_ID_MUST_BE_NULL)
          }

          return true
        }
      }
    },
    content: {
      isString: true,
      custom: {
        options: (value, { req }) => {
          const type = req.body.type as TweetType
          const hashtags = req.body.hashtags as string[]
          const mentions = req.body.mentions as string[]
          //*  Nếu type là comment, quote_tweet, tweet và k có mentions và hashtags thì content phải là
          //* string và not null
          if (
            [TweetType.TWEET, TweetType.COMMENT, TweetType.QUOTE_TWEET].includes(type) &&
            isEmpty(hashtags) &&
            isEmpty(mentions) &&
            value === ''
          ) {
            throw new Error(TWEET_MESSAGES.CONTENT_MUST_BE_A_NON_EMPTY_STRING)
          }

          if (type === TweetType.RE_TWEET && value !== '') {
            throw new Error(TWEET_MESSAGES.CONTENT_MUST_BE_A_EMPTY_STRING)
          }

          return true
        }
      }
    },
    hashtags: {
      isArray: true,
      custom: {
        options: (value) => {
          // Yếu cầu mỗi phần tử trong array là string
          if (value.some((item: any) => typeof item !== 'string')) {
            throw new Error(TWEET_MESSAGES.HASHTAG_MUST_BE_AN_ARRAY_OF_STRING)
          }

          return true
        }
      }
    },
    mentions: {
      isArray: true,
      custom: {
        options: (value) => {
          // Yếu cầu mỗi phần tử trong array là user_id
          if (value.some((item: any) => !ObjectId.isValid(item))) {
            throw new Error(TWEET_MESSAGES.MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID)
          }

          return true
        }
      }
    },
    medias: {
      isArray: true,
      custom: {
        options: (value) => {
          // Yếu cầu mỗi phần tử trong array là Media Object
          if (
            value.some((item: any) => {
              return typeof item.url !== 'string' || !mediaType.includes(item.type)
            })
          ) {
            throw new Error(TWEET_MESSAGES.MEDIA_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT)
          }

          return true
        }
      }
    }
  })
)
