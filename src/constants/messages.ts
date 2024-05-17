export const USER_MESSAGES = {
  VALIDATION_ERROR: 'VALIDATION ERROR!',
  //name
  NAME_IS_REQUIRED: 'Name is required!',
  NAME_MUST_BE_A_STRING: 'Name must be a string!',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100!',
  //email
  EMAIL_ALREADY_EXISTED: 'Email already existed!',
  EMAIL_IS_REQUIRED: 'Email is required!',
  EMAIL_IS_INVALID: 'Email is invalid!',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before!',
  EMAIL_VERIFY_SUCCESS: 'Email verify successfully!',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect!',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required!',
  EMAIL_VERIFY_TOKEN_IS_INCORRECT: 'Email verify token is incorrect!',
  VERIFY_EMAIL_SUCCESS: 'Verify email successfully!',
  //password
  PASSWORD_IS_REQUIRED: 'Password is required!',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string!',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50!',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol!',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required!',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string!',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm length must be from 6 to 50!',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol!',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password!',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601!',
  //user
  USER_NOT_FOUND: 'User not found!',
  USER_ALREADY_VERIFIED_BEFORE: 'User already verified before!',
  USER_BANNED: 'User banned!',
  USERNAME_IS_INVALID:
    'Username must be 4-15 characters long and contain only letters numbers, underscores not only numbers!',
  USERNAME_ALREADY_EXISTED: 'Username the same as the previous one!',
  //other
  LOGIN_SUCCESS: 'Login successfully!',
  REGISTER_SUCCESS: 'Register successfully!',
  LOGOUT_SUCCESS: 'Logout successfully!',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required!',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid!',
  REFRESH_TOKEN_IS_ALREADY_USED_OR_NOT_EXISTED: 'Refresh token is already used or not existed!',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required!',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid!',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exists!',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password!',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required!',
  FORGOT_PASSWORD_TOKEN_IS_INCORRECT: 'Forgot password token is incorrect!',

  RESEND_EMAIL_VERIFY_SUCCESS: 'Resend email verify successfully!',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successfully!',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully!',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully!',
  GET_ME_SUCCESS: 'Get me successfully!',
  USER_NOT_VERIFIED: 'User not verified!',

  // IMAGE
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string!',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Image url length must be from 1 to 400!',

  // BIO
  BIO_MUST_BE_A_STRING: 'Bio must be a string!',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 2000!',

  // LOCATION
  LOCATION_MUST_BE_A_STRING: 'Location must be a string!',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200!',

  // WEBSITE
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string!',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200!',

  // USERNAME
  USERNAME_MUST_BE_A_STRING: 'Username must be a string!',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50!',

  // COVER_PHOTO
  COVER_PHOTO_MUST_BE_A_STRING: 'Cover photo must be a string!',
  COVER_PHOTO_LENGTH_MUST_BE_LESS_THAN_400: 'Cover photo length must be less than 400!',

  UPDATE_ME_SUCCESS: 'Update me successfully!',
  GET_PROFILE_SUCCESS: 'Get profile successfully!',
  INVALID_FOLLOWED_USER_ID: 'Invalid followed user id!',
  FOLLOWED_USER_NOT_FOUND: 'Followed user not found!',
  FOLLOWED_BEFORE: 'Already followed before!',
  FOLLOW_SUCCESS: 'Follow successfully!',
  INVALID_USER_ID: 'Invalid user id!',
  NOT_FOLLOWED: 'Not followed!',
  ALREADY_UNFOLLOWED: 'Already unfollowed!',
  UNFOLLOW_SUCCESS: 'Unfollow successfully!',
  USERNAME_ALREADY_EXISTS: 'Username already exists!',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match!',
  CONFIRM_NEW_PASSWORD_MUST_BE_THE_SAME_AS_NEW_PASSWORD: 'Confirm new password must be the same as new password!',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully!',
  EMAIL_NOT_VERIFIED: 'Email not verified!',
  UPLOAD_IMAGE_SUCCESS: 'Upload image successfully!',
  UPLOAD_VIDEO_SUCCESS: 'Upload video successfully',
  UPLOAD_SUCCESS: 'Upload successfully',

  // GMAIL
  GMAIL_NOT_VERIFIED: 'Gmail not verified!',

  GET_VIDEO_STATUS_SUCCESS: 'Get video status successfully!',
  GET_VIDEO_STATUS_FAIL: 'Get video status fail!'
} as const
