import React from 'react';
import type { Preview } from '@storybook/react';
import ThemeContext from '../src/contexts/ThemeContext';
import LocalizationContext from '../src/contexts/LocalizationContext';

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
    (Story, { parameters }) => {
      const { theme, setTheme, palette, lang, setLang } = parameters;

      return (
        <ThemeContext.Provider value={{ theme, setTheme, palette }}>
          <LocalizationContext.Provider value={{ lang, setLang }}>
            <Story />
          </LocalizationContext.Provider>
        </ThemeContext.Provider>
      );
    },
  ],
};

export default preview;
