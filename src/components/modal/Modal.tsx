import React, { CSSProperties, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Modal as AntModal, Typography } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useNavigate, useParams } from 'react-router';
import OperationFull from 'src/components/operation/operation-full/OperationFull';
import { CloseOutlined } from '@ant-design/icons';
import withAuth from 'src/shared/hocs/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'src/store';
import { clearCurrentOperation, getOperation } from 'src/store/slices/operations';

export default withAuth(function Modal(): ReactNode {
  const { operationId } = useParams();
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentOperation = useSelector((state: AppState) => state.operations.currentOperation);

  useEffect(() => {
    if (operationId && operationId !== 'create') {
      try {
        (async () => {
          await dispatch(getOperation(operationId));
          setVisible(true);
        })();
      } catch (err) {
        messageApi.error(t(`error.${err}`));
      }
    } else if (operationId === 'create') setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    dispatch(clearCurrentOperation());
    navigate('/operations');
  };

  const styles: { [key: string]: CSSProperties } = useMemo(() => {
    return {
      textField: { color: palette.fontColor, backgroundColor: palette.background },
      font: { color: palette.fontColor },
      fontDisabled: { color: palette.fontColorDisabled },
      modalBody: { minHeight: 402 },
    };
  }, [palette.fontColor, palette.background, palette.fontColorDisabled]);

  return visible
    ? createPortal(
        <AntModal
          title={
            <Typography style={styles.font}>
              {operationId === 'create' ? t('operations.modalTitleAdd') : t('operations.modalTitleUpdate')}
            </Typography>
          }
          centered
          open={visible}
          closeIcon={<CloseOutlined style={styles.fontDisabled} />}
          onCancel={handleClose}
          footer={[]}
          width={650}
          styles={{
            content: styles.textField,
            body: styles.modalBody,
            header: styles.textField,
          }}
        >
          {(operationId !== 'create' && currentOperation) || operationId === 'create' ? (
            <OperationFull id={operationId} />
          ) : null}
        </AntModal>,
        document.body
      )
    : null;
});
