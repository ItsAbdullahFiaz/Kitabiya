let currentToken: string | null = null;

export const tokenManager = {
    setToken: (token: string) => currentToken = token,
    getToken: () => currentToken,
    clearToken: () => currentToken = null
}; 