import AsyncStorage from "@react-native-async-storage/async-storage";
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
        const token = await AsyncStorage.getItem('TOKEN');
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
        let data;
        const clonedResponse = response.clone();

        try {
            data = await response.json();
        } catch (parseError) {
            // Handle non-JSON responses using the cloned response
            const textResponse = await clonedResponse.text();
            console.error('Failed to parse JSON response:', textResponse);
            return {
                error: 'PARSE_ERROR',
                message: 'Invalid JSON response from server',
                rawResponse: textResponse
            };
        }

        if (response.ok) {
            console.log('Response:', JSON.stringify(data));
            return data;
        } else {
            if (response.status === 401) {
                const newToken = await getAuthToken(true);
                if (newToken) {
                    options.headers = {
                        ...options.headers,
                        'Authorization': `Bearer ${newToken}`
                    };
                    const retryResponse = await fetch(URL, options);
                    const retryData = await retryResponse.json();

                    if (retryResponse.ok) {
                        return retryData;
                    }
                }
            }

            console.error('Error response:', data);
            return { error: response.status, message: data };
        }
    } catch (error: any) {
        console.error('API call error:', error);
        return { error: error.message };
    } finally {
        setLoading(false);
    }
};
