interface ApiCallProps {
    params?: any;
    URL: string;
    verb: string;
    token?: string | null;
    isFormData?: boolean;
    setLoading?: (loading: boolean) => void;
}

export const ApiCall = async ({
    params,
    URL,
    verb,
    token = null,
    isFormData = false,
    setLoading = () => { }
}: ApiCallProps) => {
    setLoading(true);

    try {
        console.log('URL:', URL);
        params && console.log('Params:', params);

        let options: RequestInit = {
            method: verb,
            headers: {
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
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
            console.log('Response:', data);
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
