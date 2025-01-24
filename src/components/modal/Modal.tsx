import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Modal as AntModal, Typography } from 'antd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useNavigate, useParams } from 'react-router';
import OperationFull, { OperationProps } from 'src/components/operation/operation-full/OperationFull';
import { CloseOutlined } from '@ant-design/icons';
import withAuth from 'src/shared/hocs/withAuth';
import { Operation } from 'src/homeworks/ts1/3_write';
import { getId } from 'src/shared/mock/products';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { addOperation, updateOperation } from 'src/store/slices/operations';

const defaultOperation: Operation = {
  id: `pr_${getId(6)}`,
  name: 'Трата',
  createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
  amount: 0,
  category: { id: '', name: '' },
  type: 'Cost',
};

export default withAuth(function Modal(): ReactNode {
  const { operationId } = useParams();
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const operations = useSelector((state: AppState) => state.operations);
  const dispatch = useDispatch();

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

  const handleItemChange = (values: OperationProps) => {
    console.log('operationId', operationId);
    const itemIndex = operations.findIndex((op) => op.id === values.id);
    if (itemIndex > -1) {
      // update operation
      let updatedItem = { ...operations[itemIndex] };
      Object.entries(values).map(([key, val]) => {
        if (updatedItem[key as keyof OperationProps] !== val) {
          updatedItem = {
            ...updatedItem,
            [key === 'categoryName' ? 'category' : (key as keyof OperationProps)]:
              key === 'categoryName' ? { ...operations[itemIndex].category, name: val } : key === 'amount' ? +val : val,
          };
        }
      });
      dispatch(updateOperation(updatedItem));
    } else {
      // add operation
      const newOperation = {
        ...defaultOperation,
        ...values,
        amount: +values.amount,
        category: { ...defaultOperation.category, name: values.name },
      };
      dispatch(addOperation(newOperation));
      navigate(`/operations/${newOperation.id}`);
    }
  };

  return visible
    ? createPortal(
        <AntModal
          title={
            <Typography style={{ color: palette.fontColor }}>
              {operationId === 'create' ? t('operations.modalTitleAdd') : t('operations.modalTitleUpdate')}
            </Typography>
          }
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
