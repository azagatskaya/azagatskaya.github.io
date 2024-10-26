import React, { ReactNode, useContext } from 'react';
import { Flex, Radio } from 'antd';
import { MoonFilled, MoonOutlined, SunFilled, SunOutlined } from '@ant-design/icons/lib/icons';
import ThemeContext, { ThemeType } from '../../contexts/ThemeContext';
import { RadioChangeEvent } from 'antd/lib';

export default function ThemeSwitch(): ReactNode {
  const { setTheme, theme, palette } = useContext(ThemeContext);

  const handleChangeTheme = (e: RadioChangeEvent) => {
    setTheme((e.target as HTMLInputElement).value as ThemeType);
  };

  return (
    <Flex vertical={false} gap="middle">
      <Radio.Group defaultValue={theme} onChange={handleChangeTheme} size={'large'}>
        <Radio.Button value="dark" style={{ backgroundColor: palette.foreground }}>
          {theme === 'dark' ? (
            <MoonFilled style={{ color: '#303f9f' }} />
          ) : (
            <MoonOutlined style={{ color: '#303f9f' }} />
          )}
        </Radio.Button>
        <Radio.Button value="light" style={{ backgroundColor: palette.background }}>
          {theme === 'light' ? (
            <SunFilled style={{ color: '#f57f17' }} />
          ) : (
            <SunOutlined style={{ color: '#f57f17' }} />
          )}
        </Radio.Button>
      </Radio.Group>
    </Flex>
  );
}
