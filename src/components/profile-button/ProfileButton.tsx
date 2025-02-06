import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

export default function ProfileButton() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authenticated = useSelector<AppState>((state: AppState) => !!state.auth?.email);
  const [disabled, setDisabled] = useState(!authenticated);

  useEffect(() => {
    setDisabled(!authenticated);
  }, [authenticated]);

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <Tooltip title={t('profileButton')}>
      <Button
        disabled={disabled}
        shape="circle"
        variant={'filled'}
        onClick={handleClick}
        color="primary"
        style={disabled ? { color: palette.fontColorDisabled, backgroundColor: '#FFFFFF33' } : {}}
      >
        <UserOutlined />
      </Button>
    </Tooltip>
  );
}
