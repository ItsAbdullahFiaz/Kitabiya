import { API_ENDPOINTS } from '../../config';
import { ApiCall } from './apiCall';

// Define types for better type safety
interface UserData {
    name: string;
    email: string;
}

interface ProductData {
    userId: string;
    images: File[];
    title: string;
    price: number;
    category: {
        id: string;
        subCategoryId: string;
    };
    condition: string;
    type: string;
    language: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
}

interface ProductSearchParams {
    query?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sort?: string;
}

// interface BroadcastData {
//     title: string;
//     body: string;
//     data?: Record<string, any>;
// }

interface NotificationData {
    token: string;
    title: string;
    body: string;
    data?: Record<string, any>;
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
    createProduct: (productData: FormData) =>
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

    searchProducts: (searchParams: ProductSearchParams) =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/search?query=${searchParams}`,
            verb: 'GET'
        }),

    getMyProducts: () =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/my-products`,
            verb: 'GET'
        }),

    getProductById: (productId: string) =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
            verb: 'GET'
        }),

    updateProduct: (productId: string, productData: FormData) =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
            verb: 'PUT',
            params: productData,
            isFormData: true
        }),

    deleteProduct: (productId: string) =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
            verb: 'DELETE'
        }),

    // broadcastNotification: (broadcastData: BroadcastData) =>
    //     ApiCall({
    //         URL: API_ENDPOINTS.NOTIFICATIONS + '/broadcast',
    //         verb: 'POST',
    //         params: broadcastData
    //     }),

    // Notification APIs
    sendNotification: (notificationData: NotificationData) =>
        ApiCall({
            URL: API_ENDPOINTS.NOTIFICATIONS,
            verb: 'POST',
            params: notificationData
        }),

    // Add recent search
    addRecentSearch: (data: { productId: string }) =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
            verb: 'POST',
            params: data
        }),

    // Get recent searches
    getRecentSearches: () =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
            verb: 'GET'
        }),

    // Clear recent searches
    clearRecentSearches: () =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
            verb: 'DELETE'
        }),

    getPopularProducts: () =>
        ApiCall({
            URL: `${API_ENDPOINTS.PRODUCTS}/popular`,
            verb: 'GET'
        }),
};

// New response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
}