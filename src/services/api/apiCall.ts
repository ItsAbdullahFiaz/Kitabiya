import { tokenManager } from '../../utils/tokenManager';
import { getAuthToken } from "../auth";

interface ApiCallProps {
    params?: any;
    URL: string;
    verb: string;
    isFormData?: boolean;
    setLoading?: (loading: boolean) => void;
}

export const ApiCall = async ({
    params,
    URL,
    verb,
    isFormData = false,
    setLoading = () => { }
}: ApiCallProps) => {
    setLoading(true);

    try {
        const token = tokenManager.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('URL:', URL);
        params && console.log('Params:', params);

        let options: RequestInit = {
            method: verb,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (verb !== 'GET') {
            if (isFormData) {
                options.body = params;
            } else {
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json'
                };
                options.body = JSON.stringify(params);
            }
        }

        const response = await fetch(URL, options);
        const data = await response.json();

        if (response.ok) {
            console.log('Response:', JSON.stringify(data));
            return data;
        } else {
            if (response.status === 401) {
                const newToken = await getAuthToken(true);
                if (newToken) {
                    tokenManager.setToken(newToken);
                    options.headers = {
                        ...options.headers,
                        'Authorization': `Bearer ${newToken}`
                    };
                    const retryResponse = await fetch(URL, options);
                    const retryData = await retryResponse.json();

                    if (retryResponse.ok) {
                        console.log('Retry Response:', JSON.stringify(retryData));
                        return retryData;
                    }
                }
            }

            console.error('Error response:', response?.status);
            return { error: response.status, message: data };
        }
    } catch (error: any) {
        console.error('API call error:', error);
        return { error: error.message };
    } finally {
        setLoading(false);
    }
};
