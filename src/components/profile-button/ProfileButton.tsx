import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

export default function ProfileButton() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authenticated = useSelector((state: AppState) => !!state.profile);

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <Tooltip title={t('profileButton')}>
      <Button
        disabled={!authenticated}
        shape="circle"
        variant={'filled'}
        onClick={handleClick}
        color="primary"
        style={authenticated ? {} : { color: palette.fontColorDisabled, backgroundColor: '#FFFFFF33' }}
      >
        <UserOutlined />
      </Button>
    </Tooltip>
  );
}
