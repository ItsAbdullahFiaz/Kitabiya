import { useContext } from 'react';
import { AppDataContext } from '../context';
import { API_ENDPOINTS } from '../config';
import { ApiCall } from '../services/api/apiCall';

// Define your types as before
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

interface NotificationData {
    token: string;
    title: string;
    body: string;
    data?: Record<string, any>;
}

interface BroadcastData {
    title: string;
    body: string;
}

// Custom hook to wrap API calls
export const useApiService = () => {
    const { authToken, isTokenExpired, refreshToken, setAuthToken } = useContext(AppDataContext);

    console.log('AUTHHHHHHHH', authToken)

    const apiService = {
        // Auth APIs
        registerUser: (userData: UserData) =>
            ApiCall({
                URL: API_ENDPOINTS.REGISTER,
                verb: 'POST',
                params: userData,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        // Product APIs
        createProduct: (productData: FormData) =>
            ApiCall({
                URL: API_ENDPOINTS.PRODUCTS,
                verb: 'POST',
                params: productData,
                isFormData: true,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        getProducts: () =>
            ApiCall({
                URL: API_ENDPOINTS.PRODUCTS,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        searchProducts: (searchParams: ProductSearchParams) =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/search?query=${searchParams.query}`,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        getMyProducts: () =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/my-products`,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        getProductById: (productId: string) =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        updateProductApi: (productId: string, productData: FormData) =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
                verb: 'PUT',
                params: productData,
                isFormData: true,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        deleteProductApi: (productId: string) =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
                verb: 'DELETE',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        sendNotificationApi: (notificationData: NotificationData) =>
            ApiCall({
                URL: API_ENDPOINTS.NOTIFICATIONS,
                verb: 'POST',
                params: notificationData,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        getPopularProducts: () =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/popular`,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        clearRecentSearchesApi: () =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
                verb: 'DELETE',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        getRecentSearches: () =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
                verb: 'GET',
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        addRecentSearch: (data: { productId: string }) =>
            ApiCall({
                URL: `${API_ENDPOINTS.PRODUCTS}/recent-searches`,
                verb: 'POST',
                params: data,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),

        broadcastNotification: (broadcastData: BroadcastData) =>
            ApiCall({
                URL: API_ENDPOINTS.NOTIFICATIONS + '/broadcast',
                verb: 'POST',
                params: broadcastData,
                authToken,
                isTokenExpired,
                refreshToken,
                setAuthToken,
            }),
    };

    return apiService;
};
