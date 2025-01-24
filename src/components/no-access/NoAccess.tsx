import { Typography } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function NoAccess() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();

  return <Typography style={{ color: palette.fontColor }}>{t('error.msgNoAccess')}</Typography>;
}
