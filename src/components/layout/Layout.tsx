import React, { ReactNode, useContext, useMemo } from 'react';
import { Flex, Layout as AntLayout } from 'antd';
import ThemeContext from '../../contexts/ThemeContext';
import Logo from '../logo/Logo';
import ThemeSwitch from '../theme-switch/ThemeSwitch';
import LanguageSelect from '../language-select/LanguageSelect';

const { Header: AntHeader, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactNode {
  const { palette, theme } = useContext(ThemeContext);

  const { headerStyle, contentStyle, layoutStyle } = useMemo(() => {
    const headerStyle: React.CSSProperties = {
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

    const contentStyle: React.CSSProperties = {
      textAlign: 'center',
      lineHeight: '120px',
      color: palette.fontColor,
      backgroundColor: palette.background,
      padding: '24px 36px',
      borderRadius: 8,
    };

    const layoutStyle = {
      overflow: 'hidden',
      minHeight: '100vh',
      backgroundColor: palette.background,
      paddingTop: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    };
    return { headerStyle, contentStyle, layoutStyle };
  }, [palette.background, palette.fontColor, theme]);

  return (
    <AntLayout style={layoutStyle}>
      <AntHeader style={headerStyle}>
        <Logo />
        <Flex vertical={false} gap={16} justify={'flex-end'} align={'center'}>
          <ThemeSwitch />
          <LanguageSelect />
        </Flex>
      </AntHeader>
      <Content style={contentStyle}>{children}</Content>
    </AntLayout>
  );
}
