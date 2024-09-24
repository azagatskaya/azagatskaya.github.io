import React from 'react';
import styles from './layout.module.sass';
import Header from '../header/Header';

interface LayoutProps {
  children: React.JSX.Element;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
