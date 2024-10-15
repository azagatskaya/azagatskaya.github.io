import React, { ReactNode } from 'react';
import { Button, Typography, Modal as AntModal } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  message: string;
}

export default function Modal({ visible, setVisible, message }: ModalProps): ReactNode {
  const { t } = useTranslation();

  const handleClose = () => {
    setVisible(false);
  };

  return visible
    ? createPortal(
        <AntModal
          title="Модальное окно"
          open={visible}
          onOk={handleClose}
          onCancel={handleClose}
          closeIcon
          footer={[
            <Button key="submit" type="primary" onClick={handleClose}>
              {t('ok')}
            </Button>,
          ]}
        >
          <Typography>{message}</Typography>
        </AntModal>,
        document.body
      )
    : null;
}
