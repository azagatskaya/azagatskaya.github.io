import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { ReactNode, useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { LocalizationContext, LangContextType } from 'src/contexts/LocalizationContext';

export default function LanguageSelect(): ReactNode {
  const { theme } = useContext<ThemeContextType>(ThemeContext);
  const { lang, setLang } = useContext<LangContextType>(LocalizationContext);

  return (
    <Menu
      onClick={(e) => setLang(e.key)}
      selectedKeys={[lang]}
      mode="vertical"
      theme={theme}
      items={[
        {
          key: 'lang',
          icon: <GlobalOutlined />,
          children: [
            {
              key: 'ru',
              label: 'Русский',
            },
            {
              key: 'en',
              label: 'English',
            },
          ],
        },
      ]}
    />
  );
}
