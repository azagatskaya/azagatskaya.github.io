import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { ReactNode, useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import LocalizationContext from '../../contexts/LocalizationContext';

export default function LanguageSelect(): ReactNode {
  const { theme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LocalizationContext);

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
