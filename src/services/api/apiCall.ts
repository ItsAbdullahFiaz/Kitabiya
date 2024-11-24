import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const data = await response.json();

        if (response.ok) {
            console.log('Response:', JSON.stringify(data));
            return data;
        } else {
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
