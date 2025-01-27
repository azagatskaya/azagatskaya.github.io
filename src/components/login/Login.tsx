import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clearProfile } from 'src/store/slices/profile';
import { AppState } from 'src/store';

export type AuthModeType = 'signin' | 'signout';

export default function Login() {
  const authenticated = useSelector((state: AppState) => !!state.profile);
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthModeType>(authenticated ? 'signout' : 'signin');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthMode(authenticated ? 'signout' : 'signin');
  }, [authenticated]);

  const handleToggleAuthMode = () => {
    if (authMode !== 'signout') navigate('/auth');
    else {
      localStorage.removeItem('token');
      dispatch(clearProfile());
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
