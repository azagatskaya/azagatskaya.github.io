import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Modal as AntModal, Typography } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useNavigate, useParams } from 'react-router';
import { defaultOperation, OperationsContext, OperationsContextType } from 'src/contexts/OperationsContext';
import OperationFull from 'src/components/operation/operation-full/OperationFull';
import { CloseOutlined } from '@ant-design/icons';
import withAuth from 'src/shared/hocs/withAuth';

export default withAuth(function Modal(): ReactNode {
  const { operationId } = useParams();
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { operations, handleItemChange } = useContext<OperationsContextType>(OperationsContext);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(!!operationId);
  }, [operationId]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setVisible(false);
    navigate('/operations');
  };

  const operation = useMemo(() => {
    return visible && operationId && operationId !== 'create'
      ? operations.find((op) => op.id === operationId)
      : defaultOperation;
  }, [operationId, operations, visible]);

  return visible
    ? createPortal(
        <AntModal
          title={<Typography style={{ color: palette.fontColor }}>{t('operations.modalTitle')}</Typography>}
          centered
          open={visible}
          closeIcon={<CloseOutlined style={{ color: palette.fontColorDisabled }} />}
          onCancel={handleClose}
          footer={[]}
          width={650}
          styles={{
            content: { backgroundColor: palette.background, color: palette.fontColor },
            body: { minHeight: 402 },
            header: { backgroundColor: palette.background, color: palette.fontColor },
          }}
        >
          {operation ? (
            <OperationFull
              id={operationId}
              amount={operation.amount}
              categoryName={operation.category.name}
              name={operation.name}
              desc={operation.desc}
              createdAt={operation.createdAt}
              handleItemChange={handleItemChange}
            />
          ) : (
            <Typography style={{ color: palette.fontColor }}>{t('operations.msgUnknownOperationId')}</Typography>
          )}
        </AntModal>,
        document.body
      )
    : null;
});
