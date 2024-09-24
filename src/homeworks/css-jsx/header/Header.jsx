import React from 'react';

import styles from './header.module.sass';
import Logo from '../logo/Logo';
export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
    </div>
  );
}
