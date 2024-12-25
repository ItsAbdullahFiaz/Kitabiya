import React, { createContext, useState, useContext, useEffect } from 'react';
import { tokenManager } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEY } from '../enums';

interface AuthState {
    userName: string;
    email: string;
    token: string;
    isAuthenticated: boolean;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    profilePhoto: string;
    isQuestionnaireCompleted: boolean;
}

interface AuthContextType {
    authState: AuthState;
    login: (
        userName: string,
        email: string,
        token: string,
        phoneNumber?: string,
        address?: string,
        dateOfBirth?: string,
        profilePhoto?: string,
        isQuestionnaireCompleted?: boolean
    ) => void;
    updateProfile: (
        userName?: string,
        phoneNumber?: string,
        address?: string,
        dateOfBirth?: string,
        profilePhoto?: string
    ) => void;
    updateProfilePhoto: (photoUrl: string) => void;
    updateQuestionnaire: (isCompleted: boolean) => void;
    logout: () => void;
}

const initialAuthState: AuthState = {
    userName: '',
    email: '',
    token: '',
    isAuthenticated: false,
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    profilePhoto: '',
    isQuestionnaireCompleted: false,
};

const AuthContext = createContext<AuthContextType>({
    authState: initialAuthState,
    login: () => { },
    updateProfile: () => { },
    updateProfilePhoto: () => { },
    updateQuestionnaire: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const savedAuthState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
                if (savedAuthState) {
                    const parsedAuthState = JSON.parse(savedAuthState);
                    setAuthState(parsedAuthState);
                    if (parsedAuthState.token) {
                        tokenManager.setToken(parsedAuthState.token);
                    }
                }
            } catch (error) {
                console.error('Error loading auth state:', error);
            }
        };

        loadAuthState();
    }, []);

    const login = (
        userName: string,
        email: string,
        token: string,
        phoneNumber: string = '',
        address: string = '',
        dateOfBirth: string = '',
        profilePhoto: string = '',
        isQuestionnaireCompleted: boolean = false
    ) => {
        const newAuthState = {
            userName,
            email,
            token,
            isAuthenticated: true,
            phoneNumber,
            address,
            dateOfBirth,
            profilePhoto,
            isQuestionnaireCompleted
        };

        tokenManager.setToken(token);
        setAuthState(newAuthState);

        AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuthState))
            .catch(error => console.error('Error saving auth state:', error));
    };

    const updateProfile = (
        userName?: string,
        phoneNumber?: string,
        address?: string,
        dateOfBirth?: string,
        profilePhoto?: string,
        isQuestionnaireCompleted?: boolean
    ) => {
        setAuthState(prev => {
            const newState = {
                ...prev,
                ...(userName !== undefined && { userName }),
                ...(phoneNumber !== undefined && { phoneNumber }),
                ...(address !== undefined && { address }),
                ...(dateOfBirth !== undefined && { dateOfBirth }),
                ...(profilePhoto !== undefined && { profilePhoto }),
                ...(isQuestionnaireCompleted !== undefined && { isQuestionnaireCompleted }),
            };

            AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState))
                .catch(error => console.error('Error saving auth state:', error));

            return newState;
        });
    };

    const updateProfilePhoto = (photoUrl: string) => {
        setAuthState(prev => {
            const newState = {
                ...prev,
                profilePhoto: photoUrl,
            };

            AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState))
                .catch(error => console.error('Error saving auth state:', error));

            return newState;
        });
    };

    const updateQuestionnaire = (isCompleted: boolean) => {
        setAuthState(prev => {
            const newState = {
                ...prev,
                isQuestionnaireCompleted: isCompleted,
            };

            AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState))
                .catch(error => console.error('Error saving auth state:', error));

            return newState;
        });
    };

    const logout = () => {
        tokenManager.clearToken();
        setAuthState(initialAuthState);
        AsyncStorage.removeItem(AUTH_STORAGE_KEY)
            .catch(error => console.error('Error removing auth state:', error));
    };

    return (
        <AuthContext.Provider value={{
            authState,
            login,
            updateProfile,
            updateProfilePhoto,
            updateQuestionnaire,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 