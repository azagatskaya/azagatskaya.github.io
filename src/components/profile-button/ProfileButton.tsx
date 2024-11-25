import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';

export default function ProfileButton() {
  return (
    <Tooltip title={'Profile'}>
      <Button shape="circle" variant={'filled'} onClick={null} color="primary">
        <UserOutlined />
      </Button>
    </Tooltip>
  );
}
