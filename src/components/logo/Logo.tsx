import React, { ReactNode } from 'react';
import logo from './logo.svg';
import styles from './logo.module.sass';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function Logo(): ReactNode {
  const { t } = useTranslation();

  return (
    <Link to="/">
      <div className={styles.container}>
        <img src={logo} alt="logoImage" />
        <h1>{t('companyName')}</h1>
      </div>
    </Link>
  );
}
