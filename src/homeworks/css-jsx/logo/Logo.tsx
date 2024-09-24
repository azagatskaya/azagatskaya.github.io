import React from 'react';
import logo from './logo.svg';
import styles from './logo.module.sass';

export default function Logo(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <img src={logo} alt="logoImage" />
      <h1>{'Company'}</h1>
    </div>
  );
}
