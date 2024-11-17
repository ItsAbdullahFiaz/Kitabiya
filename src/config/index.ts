const LIVE_SERVER_URL = 'https://kitabiya.glitch.me';
const LOCAL_SERVER_URL = 'http://0.0.0.0:3000';
const DEV_SERVER_URL = 'http://10.0.2.2:3000';

export const NOTIFICATION_SERVER_URL = __DEV__
    ? LIVE_SERVER_URL
    : LIVE_SERVER_URL;