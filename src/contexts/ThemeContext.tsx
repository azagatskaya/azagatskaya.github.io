import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { message } from 'antd';
import { MessageInstance } from 'antd/lib/message/interface';

export type ThemeType = 'dark' | 'light';

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>> | null;
  messageApi: MessageInstance | null;
  contextHolder: React.ReactElement | null;
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

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: null,
  messageApi: null,
  contextHolder: null,
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

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [messageApi, contextHolder] = message.useMessage();

  const palette = useMemo(
    () => ({
      primary: theme === 'light' ? '#3d96c8' : '#2a698c',
      secondary: theme === 'light' ? '#c83d95' : '#14a37f',
      background: theme === 'light' ? '#fff' : '#121212',
      foreground: theme === 'light' ? '#00000011' : '#001529',
      borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
      error: theme === 'light' ? '#d32f2f' : '#c62828',
      success: theme === 'light' ? '#2e7d32' : '#1b5e20',
      fontColor: theme === 'light' ? '#000' : '#fff',
      fontColorDisabled: theme === 'light' ? '#00000044' : '#ffffff44',
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, palette, messageApi, contextHolder }}>
      {children}
    </ThemeContext.Provider>
  );
};
