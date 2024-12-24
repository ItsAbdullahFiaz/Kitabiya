enum SCREENS {
  SPLASH = 'Splash',
  GET_STARTED = 'GETSTARTED',
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  FORGOT_PASSWORD = 'FORGOTPASSWORD',
  HOME = 'Home',
  MY_BOOK = 'MYBOOK',
  MESSAGE = 'MESSAGE',
  ACCOUNT = 'ACCOUNT',
  SEARCH = 'SEARCH',
  AUDIO = 'AUDIO',
  BOOK_DETAIL = 'BOOKDETAIL',
  ADD_SCREEN = 'ADDSCREEN',
  CHECK_YOUR_EMAIL = 'CHECKYOUREMAIL',
  CHAT = 'CHAT',
  NOTIFICATION = 'NOTIFICATION',
  POPULAR = 'POPULAR',
  PROFILE = "PROFILE",
  PRIVACY_POLICY = 'PRIVACYPOLICY',
  HELP_CENTER = 'HELPCENTER',
  FIRSTQUESTION = 'FIRSTQUESTION',
  SECONDQUESTION = 'SECONDQUESTION',
  THIRDQUESTION = 'THIRDQUESTION',
  FOURTHQUESTION = 'FOURTHQUESTION',
}
enum STACK {
  MAIN = 'Main',
  DRAWER = 'Drawer',
  BOTTOM = 'Bottom',
  ONBOARDING = 'Onboarding',
  AUTH = 'Auth'
}

const AUTH_STORAGE_KEY = '@auth_state';

export { SCREENS, STACK, AUTH_STORAGE_KEY };
