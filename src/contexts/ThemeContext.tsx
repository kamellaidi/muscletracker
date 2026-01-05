import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, getColors } from '../utils/theme';

interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: ReturnType<typeof getColors>;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_color_scheme';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider pour gérer le thème de l'application
 *
 * Fonctionnalités :
 * - Basculer entre mode clair et sombre
 * - Persister la préférence dans AsyncStorage
 * - Fournir les couleurs actuelles à tous les composants
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [colors, setColors] = useState(getColors('light'));

  /**
   * Charger la préférence de thème au montage
   */
  useEffect(() => {
    loadThemePreference();
  }, []);

  /**
   * Charge la préférence de thème depuis AsyncStorage
   */
  const loadThemePreference = async () => {
    try {
      const savedScheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedScheme === 'dark' || savedScheme === 'light') {
        setColorScheme(savedScheme);
        setColors(getColors(savedScheme));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du thème:', error);
    }
  };

  /**
   * Sauvegarde la préférence de thème dans AsyncStorage
   */
  const saveThemePreference = async (scheme: ColorScheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème:', error);
    }
  };

  /**
   * Change le thème
   */
  const setTheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    setColors(getColors(scheme));
    saveThemePreference(scheme);
  };

  /**
   * Bascule entre mode clair et sombre
   */
  const toggleTheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setTheme(newScheme);
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook pour accéder au thème
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
