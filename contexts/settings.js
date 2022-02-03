import {
  createContext, useCallback,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE } from '../utils/config';

export const SettingsContext = createContext(null);

const useProvideContext = () => {
  const [settings, setSettings] = useLocalStorage(LOCAL_STORAGE.SETTINGS_KEY, { theme: 'light', themeDirection: 'ltr' });

  const setTheme = useCallback((theme) => {
    setSettings({ ...settings, theme });
  }, [settings, setSettings]);

  return {
    themeDirection: settings.themeDirection,
    theme: settings.theme,
    setTheme,
  };
};

export default function SettingsProvider({ children }) {
  const context = useProvideContext();
  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
}
