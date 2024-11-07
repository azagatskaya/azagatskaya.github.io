import { createContext, Dispatch, SetStateAction } from 'react';

export type ThemeType = 'dark' | 'light';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>> | null;
  palette: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    borderColor: string;
    error: string;
    success: string;
    fontColor: string;
    fontColorDisabled: string;
  };
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: null,
  palette: {
    primary: '',
    secondary: '',
    background: '',
    foreground: '',
    borderColor: '',
    error: '',
    success: '',
    fontColor: '',
    fontColorDisabled: '',
  },
});
ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
