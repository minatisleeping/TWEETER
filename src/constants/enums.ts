export enum UserVerifyStatus {
  UNVERIFIED,
  VERIFIED,
  BANNED
}

export enum TokenType {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FORGOT_PASSWORD_TOKEN,
  EMAIL_VERIFY_TOKEN
}

export enum MediaType {
  IMAGE,
  VIDEO,
  HLS
}

export enum EncodingStatus {
  Pending, // Đang chờ ở hàng đợi (chưa được encode)
  Processing, // Đang encode
  Success, // Encode thành công
  Failed // Encode thất bại
}

export enum TweetAudience {
  EVERYONE, // 0
  TWITTER_CIRCLE // 1
}

export enum TweetType {
  TWEET,
  RE_TWEET,
  COMMENT,
  QUOTE_TWEET
}
