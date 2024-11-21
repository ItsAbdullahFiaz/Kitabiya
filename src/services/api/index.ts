import { API_ENDPOINTS } from '../../config';
import { ApiCall } from './apiCall';

// Define types for better type safety
interface UserData {
    name: string;
    email: string;
    password: string;
}

interface ProductData {
    title: string;
    price: number;
    images: File[];
    // ... other product fields
}

interface NotificationData {
    token: string;
    title: string;
    body: string;
    data: {
        type: string;
        senderId: string;
        receiverId: string;
        screen: string;
    };
}

// Use a more functional approach if you don't need class features
export const apiService = {
    // Auth APIs
    registerUser: (userData: UserData) =>
        ApiCall({
            URL: API_ENDPOINTS.REGISTER,
            verb: 'POST',
            params: userData
        }),

    // Product APIs
    createProduct: (productData: ProductData) =>
        ApiCall({
            URL: API_ENDPOINTS.PRODUCTS,
            verb: 'POST',
            params: productData,
            isFormData: true
        }),

    getProducts: () =>
        ApiCall({
            URL: API_ENDPOINTS.PRODUCTS,
            verb: 'GET'
        }),

    // Notification APIs
    sendNotification: (notificationData: NotificationData) =>
        ApiCall({
            URL: API_ENDPOINTS.NOTIFICATIONS,
            verb: 'POST',
            params: notificationData
        }),
};
