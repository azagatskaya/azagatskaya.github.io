import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function ProfileButton() {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('profileButton')}>
      <Link to="/profile">
        <Button shape="circle" variant={'filled'} onClick={null} color="primary">
          <UserOutlined />
        </Button>
      </Link>
    </Tooltip>
  );
}
