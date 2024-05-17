import 'dotenv/config'
import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Followers'
import VideoStatus from '~/models/schemas/VideoStatus.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ic4ersm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('🚀 ~ DatabaseService ~ connect ~ error:', error)
      throw error
    }
  }

  indexUsers() {
    this.users.createIndex({ email: 1, password: 1 })
    this.users.createIndex({ email: 1 }, { unique: true })
    this.users.createIndex({ username: 1 }, { unique: true })
  }

  indexRefreshTokens() {
    this.refresh_tokens.createIndex({ token: 1 })
    this.refresh_tokens.createIndex(
      { exp: 1 },
      {
        expireAfterSeconds: 0
      }
    )
  }

  indexVideoStatus() {
    this.videoStatus.createIndex({ name: 1 })
  }

  indexFollowers() {
    this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USERS as string)
  }

  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_COLLECTION_REFRESH_TOKENS as string)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_COLLECTION_FOLLOWERS as string)
  }

  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(process.env.DB_COLLECTION_VIDEO_STATUS as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
