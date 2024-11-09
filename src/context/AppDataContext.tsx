import React, { useState, createContext, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import { theme } from '../enums';
import { langTranslations } from '../assets/lang';
import { getStoredStringValue, storeStringValue } from '../utils';

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
};

const AppDataContext = createContext<AppDataContextType>(defaultAppDataContext);
const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [appTheme, setAppTheme] = useState({});
  const [activeThemeMode, setActiveThemeMode] = useState(AUTO_THEME_MODE);

  const [activeLang, setActiveLang] = useState(DEFAULT_LANG);
  const [appLang, setAppLang] = useState({});

  useEffect(() => {
    getStoredStringValue('@ThemeState', setActiveThemeMode, AUTO_THEME_MODE)
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
    getStoredStringValue('@LangState', setActiveLang, DEFAULT_LANG)
  }, [])

  useEffect(() => {
    const mLangData = langTranslations.find(i => i.value === activeLang);
    setAppLang(mLangData?.data);
    storeStringValue('@LangState', activeLang)
  }, [activeLang]);

  const contextValue = useMemo(
    () => ({
      appTheme,
      activeThemeMode,
      setActiveThemeMode,
      appLang,
      activeLang,
      setActiveLang,
      langTranslations,
    }),
    [
      appTheme,
      activeThemeMode,
      setActiveThemeMode,
      appLang,
      activeLang,
      setActiveLang,
      langTranslations,
    ],
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AUTO_THEME_MODE, LIGHT_THEME_MODE, DARK_THEME_MODE, AppDataContext, AppDataProvider };
