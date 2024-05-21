import Bookmark from '~/models/schemas/Bookmarks.schema'
import databaseService from './database.services'
import { ObjectId, WithId } from 'mongodb'

class BookmarkService {
  async createBookmarkTweet(user_id: string, tweetId: string) {
    const result = await databaseService.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweetId)
      },
      {
        $setOnInsert: new Bookmark({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweetId)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return result.value as WithId<Bookmark>
  }
}

const bookmarkService = new BookmarkService()
export default bookmarkService
