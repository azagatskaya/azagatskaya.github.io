import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import AuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { authMode, setAuthMode } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleToggleAuthMode = () => {
    setAuthMode((prevState) => (prevState === 'login' ? 'logout' : 'login'));
  };

  return (
    <Tooltip title={authMode === 'login' ? t('loginButton') : t('logoutButton')}>
      <Link to="/auth">
        <Button shape="circle" variant={'filled'} onClick={handleToggleAuthMode} color="primary">
          {authMode === 'login' ? <LoginOutlined /> : <LogoutOutlined />}
        </Button>
      </Link>
    </Tooltip>
  );
}
