import React, { ReactNode, useContext, useMemo } from 'react';
import Header from '../header/Header';
import { Layout as AntLayout } from 'antd';
import ThemeContext from '../../contexts/ThemeContext';

const { Header: AntHeader, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactNode {
  const { palette } = useContext(ThemeContext);

  const { headerStyle, contentStyle, layoutStyle } = useMemo(() => {
    const headerStyle: React.CSSProperties = {
      textAlign: 'center',
      color: palette.fontColor,
      height: 60,
      paddingInline: 0,
      lineHeight: '60px',
      backgroundColor: palette.background,
    };

    const contentStyle: React.CSSProperties = {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '120px',
      color: palette.fontColor,
      backgroundColor: palette.background,
      padding: '24px 36px',
      borderRadius: 8,
    };

    const layoutStyle = {
      overflow: 'hidden',
      height: '100vh',
      backgroundColor: palette.background,
    };
    return { headerStyle, contentStyle, layoutStyle };
  }, [palette]);

  return (
    <AntLayout style={layoutStyle}>
      <AntHeader style={headerStyle}>
        <Header />
      </AntHeader>
      <Content style={contentStyle}>{children}</Content>
    </AntLayout>
  );
}
