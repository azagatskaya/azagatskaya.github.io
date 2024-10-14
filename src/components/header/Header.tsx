import React, { ReactNode, useContext } from 'react';
import Logo from '../logo/Logo';
import ThemeSwitch from '../theme-switch/ThemeSwitch';
import ThemeContext from '../../contexts/ThemeContext';
import LanguageSelect from '../language-select/LanguageSelect';
import { Flex } from 'antd';

const style: React.CSSProperties = {
  height: 60,
  position: 'sticky',
  top: 0,
  padding: '15px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function Header(): ReactNode {
  const { palette, theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        ...style,
        backgroundColor: palette.background,
        borderBottom: `1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
      }}
    >
      <Logo />
      <Flex vertical={false} gap={16} justify={'flex-end'} align={'center'}>
        <ThemeSwitch />
        <LanguageSelect />
      </Flex>
    </div>
  );
}
