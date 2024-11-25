import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';
import AuthContext from '../../contexts/AuthContext';

export default function Login() {
  const { authMode, setAuthMode } = useContext(AuthContext);

  const handleToggleAuthMode = () => {
    setAuthMode((prevState) => (prevState === 'login' ? 'logout' : 'login'));
  };

  return (
    <Tooltip title={authMode}>
      <Button shape="circle" variant={'filled'} onClick={handleToggleAuthMode} color="primary">
        {authMode === 'login' ? <LoginOutlined /> : <LogoutOutlined />}
      </Button>
    </Tooltip>
  );
}
