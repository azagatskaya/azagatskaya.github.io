import React, { ReactNode, useContext } from 'react';
import { Flex, Radio } from 'antd';
import { MoonFilled, MoonOutlined, SunFilled, SunOutlined } from '@ant-design/icons/lib/icons';
import ThemeContext, { ThemeType } from '../../contexts/ThemeContext';
import { RadioChangeEvent } from 'antd/lib';

const DarkThemeIcon = ({ theme }: { theme: ThemeType }): ReactNode => {
  return theme === 'dark' ? <MoonFilled style={styles.iconDark} /> : <MoonOutlined style={styles.iconDark} />;
};

const LightThemeIcon = ({ theme }: { theme: ThemeType }): ReactNode => {
  return theme === 'light' ? <SunFilled style={styles.iconLight} /> : <SunOutlined style={styles.iconLight} />;
};

export default function ThemeSwitch(): ReactNode {
  const { setTheme, theme, palette } = useContext(ThemeContext);

  const handleChangeTheme = (e: RadioChangeEvent) => {
    setTheme((e.target as HTMLInputElement).value as ThemeType);
  };

  return (
    <Flex vertical={false} gap="middle">
      <Radio.Group defaultValue={theme} onChange={handleChangeTheme} size={'large'}>
        <Radio.Button value="dark" style={{ backgroundColor: palette.foreground }}>
          <DarkThemeIcon theme={theme} />
        </Radio.Button>
        <Radio.Button value="light" style={{ backgroundColor: palette.background }}>
          <LightThemeIcon theme={theme} />
        </Radio.Button>
      </Radio.Group>
    </Flex>
  );
}

const styles = {
  iconDark: { color: '#303f9f' },
  iconLight: { color: '#f57f17' },
};
