// Define environment types
type Environment = 'development' | 'production';

const ENV: Environment = __DEV__ ? 'development' : 'production';

const CONFIG = {
    development: {
        API_URL: 'https://kitabiya.glitch.me/api/v1',
    },
    production: {
        API_URL: 'https://kitabiya.glitch.me/api/v1',
    }
};

export const BASE_URL = CONFIG[ENV].API_URL;

export const API_ENDPOINTS = {
    //User Profile Data
    USERPROFILE:`${BASE_URL}/users/profile`,
    // Auth
    REGISTER: `${BASE_URL}/users/register`,
    LOGIN: `${BASE_URL}/auth/login`,

    // Products
    PRODUCTS: `${BASE_URL}/products`,

    // Notifications
    NOTIFICATIONS: `${BASE_URL}/notifications/send`,
    NOTIFICATION_BROADCASTS: `${BASE_URL}/notifications/broadcasts`
};


// const LOCAL_SERVER_URL = 'http://0.0.0.0:3000';
// const DEV_SERVER_URL = 'http://10.0.2.2:3000';