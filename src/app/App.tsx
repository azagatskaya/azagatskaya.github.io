import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Layout from 'src/components/layout/Layout';
import ThemeContext, { ThemeType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LocalizationContext from 'src/contexts/LocalizationContext';
import AuthContext, { AuthType } from 'src/contexts/AuthContext';
import AuthBlock from 'src/components/auth-block/AuthBlock';

function App() {
  const [theme, setTheme] = useState<ThemeType>('light');
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('ru');
  const [authMode, setAuthMode] = useState<AuthType>('login');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

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
    <ThemeContext.Provider value={{ theme, setTheme, palette }}>
      <LocalizationContext.Provider value={{ lang, setLang }}>
        <AuthContext.Provider value={{ authMode, setAuthMode }}>
          <Layout>
            <AuthBlock />
          </Layout>
        </AuthContext.Provider>
      </LocalizationContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
