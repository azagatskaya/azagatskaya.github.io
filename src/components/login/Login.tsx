import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { clearAuth } from 'src/store/slices/auth';
import { removeTokenFromLocalStorage } from 'src/shared/token';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';

export type AuthModeType = 'signin' | 'signout';

export default function Login() {
  const { messageApi } = useContext<ThemeContextType>(ThemeContext);
  const authenticated = useSelector((state: AppState) => !!state.auth?.email);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState<AuthModeType>(authenticated ? 'signout' : 'signin');

  useEffect(() => {
    setAuthMode(authenticated ? 'signout' : 'signin');
  }, [authenticated]);

  const handleToggleAuthMode = () => {
    if (authMode !== 'signout') navigate('/auth');
    else {
      removeTokenFromLocalStorage();
      dispatch(clearAuth());
      messageApi.success(t('auth.msgSignOutSuccess'));
    }
    setAuthMode((prevState) => (prevState === 'signin' ? 'signout' : 'signin'));
  };

  return (
    <Tooltip title={authMode === 'signin' ? t('loginButton') : t('logoutButton')}>
      <Button shape="circle" variant={'filled'} onClick={handleToggleAuthMode} color="primary">
        {authMode === 'signin' ? <LoginOutlined /> : <LogoutOutlined />}
      </Button>
    </Tooltip>
  );
}
