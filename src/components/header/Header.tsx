import React, { CSSProperties, ReactNode, useContext, useMemo } from 'react';
import Logo from '../logo/Logo';
import ThemeSwitch from '../theme-switch/ThemeSwitch';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import LanguageSelect from '../language-select/LanguageSelect';
import { Button, Flex, Layout as AntLayout } from 'antd';
import Login from 'src/components/login/Login';
import ProfileButton from 'src/components/profile-button/ProfileButton';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const { Header: AntHeader } = AntLayout;

export default function Header(): ReactNode {
  const { t } = useTranslation();
  const { palette, theme } = useContext<ThemeContextType>(ThemeContext);

  const headerStyle: CSSProperties = useMemo(() => {
    return {
      position: 'fixed',
      top: 0,
      zIndex: 1,
      textAlign: 'center',
      color: palette.fontColor,
      height: 60,
      width: '100%',
      paddingInline: 0,
      lineHeight: '60px',
      backgroundColor: palette.background,
      borderBottom: `1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
  }, [palette.background, palette.fontColor, theme]);

  return (
    <AntHeader style={headerStyle}>
      <Logo />
      <Flex vertical={false} gap={16} justify={'flex-end'} align={'center'}>
        <Link to="/operations">
          <Button color="primary" variant="solid" onClick={null}>
            {t('operations.listTitle')}
          </Button>
        </Link>
        <ProfileButton />
        <Login />
        <ThemeSwitch />
        <LanguageSelect />
      </Flex>
    </AntHeader>
  );
}
