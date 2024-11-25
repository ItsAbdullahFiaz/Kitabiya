import React, { useState, createContext, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import { theme } from '../enums';
import { langTranslations } from '../assets/lang';
import { getStoredStringValue, storeStringValue } from '../utils';
import { getAuthToken } from '../services/auth';

const DEFAULT_LANG = langTranslations[4].value;
const AUTO_THEME_MODE = '0'
const LIGHT_THEME_MODE = '1';
const DARK_THEME_MODE = '2';

interface AppDataContextType {
  appTheme: any; // You can specify a more specific type here if possible
  activeThemeMode: string;
  setActiveThemeMode: React.Dispatch<React.SetStateAction<string>>;
  appLang: any; // You can specify a more specific type here if possible
  activeLang: string;
  setActiveLang: React.Dispatch<React.SetStateAction<string>>;
  langTranslations: typeof langTranslations;
  authToken: string | null;
  tokenExpiration: string | null;
  setAuthToken: (token: string | null, expiration: string | null) => void;
  refreshToken: () => Promise<string | null>;
  isTokenExpired: () => boolean;
}

// Provide a default value for appTheme
const defaultAppDataContext: AppDataContextType = {
  appTheme: theme.light,
  activeThemeMode: '',
  setActiveThemeMode: () => { },
  appLang: langTranslations[0],
  activeLang: '',
  setActiveLang: () => { },
  langTranslations: langTranslations,
  authToken: null,
  tokenExpiration: null,
  setAuthToken: () => { },
  refreshToken: async () => null,
  isTokenExpired: () => true,
};

const AppDataContext = createContext<AppDataContextType>(defaultAppDataContext);
const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [appTheme, setAppTheme] = useState({});
  const [activeThemeMode, setActiveThemeMode] = useState(AUTO_THEME_MODE);

  const [activeLang, setActiveLang] = useState(DEFAULT_LANG);
  const [appLang, setAppLang] = useState({});
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      const theme = await getStoredStringValue('@ThemeState')
      setActiveThemeMode(theme ?? AUTO_THEME_MODE)
    }
    fetchTheme()
  }, [])

  useEffect(() => {
    if (activeThemeMode === AUTO_THEME_MODE) {
      const colorScheme = Appearance.getColorScheme()
      if (colorScheme === 'dark') {
        setAppTheme(theme.dark);
      } else {
        setAppTheme(theme.light);
      }
      const subscribe = Appearance.addChangeListener(({ colorScheme }) => {
        if (colorScheme === 'dark') {
          setAppTheme(theme.dark);
        } else {
          setAppTheme(theme.light);
        }
      })
      return () => subscribe.remove()
    } else if (activeThemeMode === DARK_THEME_MODE) {
      setAppTheme(theme.dark);
    } else {
      setAppTheme(theme.light);
    }
  }, [activeThemeMode]);

  useEffect(() => {
    const fetchLang = async () => {
      const lang = await getStoredStringValue('@LangState');
      setActiveLang(lang ?? DEFAULT_LANG);
    };
    fetchLang();
  }, [])

  useEffect(() => {
    const mLangData = langTranslations.find(i => i.value === activeLang);
    setAppLang(mLangData?.data);
    storeStringValue('@LangState', activeLang)
  }, [activeLang]);

  const setAuthToken = (token: string | null, expiration: string | null) => {
    setAuthTokenState(token);
    setTokenExpiration(expiration);
  };

  // Check token expiration
  const isTokenExpired = () => {
    if (!tokenExpiration) return true;
    return new Date(tokenExpiration) <= new Date();
  };

  // Token refresh function
  const refreshToken = async () => {
    try {
      const tokenResult = await getAuthToken(true);
      if (tokenResult) {
        storeStringValue('TOKEN', tokenResult.token);
        storeStringValue('TOKEN_EXPIRATION', tokenResult.expirationTime);
        setAuthToken(tokenResult.token, tokenResult.expirationTime);
        return tokenResult.token;
      }
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  // Load token on mount
  useEffect(() => {
    const loadToken = async () => {
      const token = await getStoredStringValue('TOKEN');
      const expiration = await getStoredStringValue('TOKEN_EXPIRATION');
      setAuthToken(token, expiration);
    };
    loadToken();
  }, []);

  const contextValue = useMemo(
    () => ({
      appTheme,
      activeThemeMode,
      setActiveThemeMode,
      appLang,
      activeLang,
      setActiveLang,
      langTranslations,
      authToken,
      tokenExpiration,
      setAuthToken,
      refreshToken,
      isTokenExpired,
    }),
    [
      appTheme,
      activeThemeMode,
      setActiveThemeMode,
      appLang,
      activeLang,
      setActiveLang,
      langTranslations,
      authToken,
      tokenExpiration,
    ],
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AUTO_THEME_MODE, LIGHT_THEME_MODE, DARK_THEME_MODE, AppDataContext, AppDataProvider };
