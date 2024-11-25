interface ApiCallProps {
    params?: any;
    URL: string;
    verb: string;
    isFormData?: boolean;
    setLoading?: (loading: boolean) => void;
    authToken: string | null;
    isTokenExpired: () => boolean;
    refreshToken: () => Promise<string | null>;
    setAuthToken: any;
}

export const ApiCall = async ({
    params,
    URL,
    verb,
    isFormData = false,
    setLoading = () => { },
    authToken,
    isTokenExpired,
    refreshToken,
    setAuthToken,
}: ApiCallProps) => {
    setLoading(true);

    try {
        if (!authToken || isTokenExpired()) {
            const newToken = await refreshToken();
            if (!newToken) {
                throw new Error('No valid authentication token found');
            }
        }

        let options: RequestInit = {
            method: verb,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        };

        if (verb !== 'GET') {
            if (isFormData) {
                options.body = params;
            } else {
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json',
                };
                options.body = JSON.stringify(params);
            }
        }

        let response = await fetch(URL, options);

        if (response.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${newToken}`,
                };
                response = await fetch(URL, options);
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return { error: response.status, message: data };
        }
    } catch (error: any) {
        if (error.message === 'Session expired. Please login again.') {
            setAuthToken(null);
        }
        return { error: error.message };
    } finally {
        setLoading(false);
    }
};
