import React from 'react';
import styles from './layout.module.sass';
import Header from '../header/Header';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
