import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Layout from 'src/components/layout/Layout';
import OperationCompact from 'src/components/operation/operation-compact/OperationCompact';
import ThemeContext, { ThemeType } from 'src/contexts/ThemeContext';
import OperationFull from 'src/components/operation/operation-full/OperationFull';
import { useTranslation } from 'react-i18next';
import LocalizationContext from 'src/contexts/LocalizationContext';

function App() {
  const [theme, setTheme] = useState<ThemeType>('light');
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('ru');
  console.log('i18n', i18n);

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
        <Layout>
          <OperationCompact
            amount={6799}
            name={'Трата'}
            categoryName={'Ноутбук'}
            desc={'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)'}
          />
          <OperationFull
            amount={6799}
            name={'Трата'}
            categoryName={'Ноутбук'}
            desc={'Покупка техники для офиса (ноутбук Apple MacBook Pro 14 M3 2023)'}
            createdAt={'2024-09-18'}
          />
        </Layout>
      </LocalizationContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
