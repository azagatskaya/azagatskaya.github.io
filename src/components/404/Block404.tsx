import { Typography } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Block404() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();

  return <Typography style={{ color: palette.fontColor }}>{t('error.msgPageNotFound')}</Typography>;
}
