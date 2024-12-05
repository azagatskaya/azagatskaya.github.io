import React, { ReactNode, useContext } from 'react';
import { Modal as AntModal, Typography } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import ThemeContext from 'src/contexts/ThemeContext';

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
}

export default function Modal({ visible, setVisible, children }: ModalProps): ReactNode {
  const { palette } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleClose = () => {
    setVisible(false);
  };

  return visible
    ? createPortal(
        <AntModal
          title={<Typography style={{ color: palette.fontColor }}>{t('operations.modalTitle')}</Typography>}
          centered
          open={visible}
          closeIcon
          onCancel={handleClose}
          footer={[]}
          width={650}
          styles={{
            content: { backgroundColor: palette.background, color: palette.fontColor },
            body: { minHeight: 402 },
            header: { backgroundColor: palette.background, color: palette.fontColor },
          }}
        >
          {children}
        </AntModal>,
        document.body
      )
    : null;
}
