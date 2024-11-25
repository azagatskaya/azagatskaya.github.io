import React from 'react';
import type { Preview } from '@storybook/react';
import AuthContext from '../src/contexts/AuthContext';
import ThemeContext from '../src/contexts/ThemeContext';
import LocalizationContext from '../src/contexts/LocalizationContext';
// import { I18nextProvider, useTranslation } from 'react-i18next';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Russian' },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, { parameters, globals }) => {
      const { theme, setTheme, palette, lang, setLang, authMode, setAuthMode } = parameters;
      // const { locale } = globals;
      // const { i18n } = useTranslation();
      //
      // useEffect(() => {
      //   i18n.changeLanguage(locale);
      // }, [locale]);

      return (
        // <I18nextProvider i18n={i18n}>
        <ThemeContext.Provider value={{ theme, setTheme, palette }}>
          <LocalizationContext.Provider value={{ lang, setLang }}>
            <AuthContext.Provider value={{ authMode, setAuthMode }}>
              <Story />
            </AuthContext.Provider>
          </LocalizationContext.Provider>
        </ThemeContext.Provider>
        // </I18nextProvider>
      );
    },
  ],
};

export default preview;
