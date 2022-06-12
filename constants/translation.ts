import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getTranslation, DefaultError } from '@common/error-code'
import UserError from '@modules/user/user-error'
import AuthError from '@modules/auth/auth-error'

// A resources that contain key and the translation to display in frontend
export const resources = {
  en: {
    translation: {
      // DEFAULT ERROR TRANSLATION
      ...getTranslation(DefaultError, 'En'),
      // USER TRANSLATION
      ...getTranslation(UserError, 'En'),
      // AUTH TRANSLATION
      ...getTranslation(AuthError, 'En'),
      AUTH_CONTINUE_WITH: `or continue with`,
      AUTH_SIGNIN: `Sign In`,
      AUTH_FORGOT_PASSWORD: `Forgot Password?`,
      AUTH_HAVE_ACCOUNT: `Already have an account?`,
      AUTH_SIGNUP: `Sign Up`,
      AUTH_DONT_HAVE_ACCOUNT: `Don't have an account yet?`,
      AUTH_VERIFY: `Verifying Account`,
      AUTH_VERIFICATION_TEXT: `We already sent an email verification link to your email address. Please check your email and click the button "Verify My Email"`,
      AUTH_RESEND_TEXT: `Didn't get email verification?`,
      // FORM TRANSLATION
      TEXT_DELETE_ACCOUNT: `By clicking delete button bellow your account and all data
      associated to your account will be lost and will need to re-signup
      to be able to access the application. Do you still want to delete
      your account?`,
      TEXT_INDEX_SUBTITLE: `Click sign up button if you don't have an account yet`,
      TEXT_WELCOME_TO_AHA: `Welcome to Aha Test`,

      TEXT_VERFY_ANNOUCE: `You need to verify your account before can access the admin
      page. Email verification link has been sent to your email
      account. Also check in your spam folder.`,
      TEXT_VERFY_QUESTION: `Did not receive an email yet?`,
      TEXT_VERFY_SUCCESS: `A verification link has been sent to your email`,

      TEXT_RESET_PWD_SUCCESS: `A link to reset password has been sent to your email. Check your inbox or spam folder.`,

      TITLE_VERFY: `Verified Your Account`,
      TITLE_STATISTIC: `Statistic`,
      TITLE_USER_DATA: `Users Data`,
      TITLE_ACCOUNT_SETTING: `Account Setting`,
      TITLE_CHANGE_PASSWORD: `CHANGE PASSWORD`,
      TITLE_DELETE_ACCOUNT: `DELETE ACCOUNT`,
      TITLE_RESET_PWD: `Reset Password`,

      MENU_CHANGE_PASSWORD: `Change Password`,
      MENU_DELETE_ACCOUNT: `Delete Account`,
      MENU_PROFILE: `Profile`,
      MENU_ACCOUNT: `Account`,
      MENU_SIGNOUT: `SignOut`,

      CARD_WELCOME: `Welcome`,
      CARD_AHA: `Aha Dashboard`,
      CARD_USER_COUNT: `User Count`,
      CARD_ACTIVE_SESSION: `Active Session`,
      CARD_AVG_ACTIVE_SESSION: `Average Active Session`,

      INPUT_TITLE_NAME: `Name`,
      INPUT_TITLE_EMAIL: `Email`,
      INPUT_PLACEHOLDER_NAME: `Fullname`,
      INPUT_PLACEHOLDER_PWD: `Password`,
      INPUT_PLACEHOLDER_REPWD: `Retype Password`,
      INPUT_PLACEHOLDER_NEW_PWD: `New Password`,
      INPUT_PLACEHOLDER_NEW_REPWD: `Retype New Password`,

      BTN_SUBMIT: `Submit`,
      BTN_LOGIN: `Login`,
      BTN_SIGNUP: `Sign Up`,
      BTN_REQ_LINK: `Request New Link`,
      BTN_CANCEL: `Cancel`,
      BTN_SAVE: `Save`,
      BTN_DELETE: `Delete`,
      BTN_VERFY_NEW_REQUEST: `Request New Email`,

      LINK_LOGIN: `Login`,
      LINK_BACK_TO_SIGNIN: `Back To Signin`,
    },
  },
}

// Using i18n to handle multilanguage purpose in future
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
