import React, { ReactNode, useContext, useMemo } from 'react';
import { Layout as AntLayout } from 'antd';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import Header from 'src/components/header/Header';

const { Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactNode {
  const { palette } = useContext<ThemeContextType>(ThemeContext);

  const { contentStyle, layoutStyle } = useMemo(() => {
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
    return { contentStyle, layoutStyle };
  }, [palette.background, palette.fontColor]);

  return (
    <AntLayout style={layoutStyle}>
      <Header />
      <Content style={contentStyle}>{children}</Content>
    </AntLayout>
  );
}
