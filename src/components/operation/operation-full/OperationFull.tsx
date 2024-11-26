import React, { ReactNode, useContext, useReducer, useState } from 'react';
import { Category, Operation } from '../../../homeworks/ts1/3_write';
import { RenameTypeField } from '../../operation/lib/renameTypeField';
import { Button, Card, DatePicker, Form, Input, Typography } from 'antd';
import type { FormProps } from 'antd';
import ThemeContext from '../../../contexts/ThemeContext';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input;

type FieldType = {
  createdAt?: string;
  amount?: number;
  categoryName?: string;
  name?: string;
  desc?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 122,
    marginLeft: 10,
  },
  date: {
    width: '100%',
  },
  content: {
    paddingLeft: 12,
  },
};

type RenamedCatName = RenameTypeField<Pick<Category, 'name'>, 'name', 'categoryName'>;

type OperationProps = Pick<Operation, 'amount' | 'name' | 'desc' | 'createdAt'>;
type OperationFullProps = OperationProps & RenamedCatName;

type ModeType = 'edit' | 'preview';

enum OpStateActionEnum {
  InputChange = 'inputChange',
}

type ActionPayloadType = {
  name: string;
  value: string | number;
};

interface OpStateAction {
  type: OpStateActionEnum;
  payload: ActionPayloadType;
}

const opStateReducer = (state: FieldType, action: OpStateAction) => {
  switch (action.type) {
    case OpStateActionEnum.InputChange: {
      return action?.payload?.name && (action?.payload?.value || action.payload.value === '')
        ? {
            ...state,
            [action.payload.name]: action.payload.value,
          }
        : state;
    }
    default:
      return state;
  }
};

const msgRequiredField = 'Обязательное поле';

export default function OperationFull({ amount, categoryName, name, desc, createdAt }: OperationFullProps): ReactNode {
  const { palette } = useContext(ThemeContext);
  const [mode, setMode] = useState<ModeType>('preview');
  const { t } = useTranslation();
  const [opState, dispatchOpState] = useReducer(opStateReducer, {
    amount: amount ?? 0,
    categoryName: categoryName ?? '',
    name: name ?? '',
    desc: desc ?? '',
    createdAt: createdAt ?? '',
  });

  const handleToggleMode = (): void => {
    setMode((prevState: ModeType) => (prevState === 'edit' ? 'preview' : 'edit'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    dispatchOpState({
      type: OpStateActionEnum.InputChange,
      payload: { name, value },
    });
  };

  const handleDateChange = (_: Dayjs, dateString: string | string[]) => {
    dispatchOpState({
      type: OpStateActionEnum.InputChange,
      payload: { name: 'createdAt', value: dateString.toString() },
    });
  };

  return (
    <Card
      title={<Typography style={{ ...styles.title, color: palette.fontColor }}>{t('operations.title')}</Typography>}
      extra={
        <Button
          shape="circle"
          variant={'filled'}
          onClick={handleToggleMode}
          color="primary"
          style={{
            color: '#fff',
            backgroundColor: palette.primary,
          }}
        >
          <EditOutlined />
        </Button>
      }
      style={{
        margin: '16px 0',
        width: 600,
        textAlign: 'left',
        backgroundColor: palette.background,
        borderColor: palette.borderColor,
      }}
      styles={{
        header: { width: 600, padding: '12px 14px 12px 24px', borderBottom: `1px solid ${palette.borderColor}` },
        body: { padding: '16px 24px' },
      }}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          required
          initialValue={dayjs(opState.createdAt)}
          label={<label style={{ color: palette.fontColor }}>{t('operations.createdAt')}</label>}
          rules={[
            {
              type: 'date',
              message: 'Некорректная дата',
            },
            { required: true, message: msgRequiredField },
          ]}
        >
          {mode === 'edit' ? (
            <DatePicker
              value={dayjs(opState.createdAt)}
              name={'createdAt'}
              onChange={handleDateChange}
              style={{
                ...styles.date,
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.createdAt}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          initialValue={opState.name}
          name="name"
          label={<label style={{ color: palette.fontColor }}>{t('operations.operationName')}</label>}
          rules={[
            { required: true, message: msgRequiredField },
            { max: 32, message: 'Максимальное количество символов: 32' },
          ]}
        >
          {mode === 'edit' ? (
            <Input
              value={opState.name}
              name={'name'}
              onChange={handleInputChange}
              maxLength={32}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.name}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          initialValue={opState.amount}
          name="amount"
          label={<label style={{ color: palette.fontColor }}>{t('operations.amount')}</label>}
          rules={[{ required: true, message: msgRequiredField }]}
        >
          {mode === 'edit' ? (
            <Input
              value={opState.amount}
              name={'amount'}
              onChange={handleInputChange}
              type="number"
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.amount}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          initialValue={opState.categoryName}
          name="categoryName"
          label={<label style={{ color: palette.fontColor }}>{t('operations.categoryName')}</label>}
          rules={[
            { required: true, message: msgRequiredField },
            { max: 32, message: 'Максимальное количество символов: 32' },
          ]}
        >
          {mode === 'edit' ? (
            <Input
              value={opState.categoryName}
              name={'categoryName'}
              onChange={handleInputChange}
              maxLength={32}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.categoryName}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          name="desc"
          initialValue={opState.desc}
          label={<label style={{ color: palette.fontColor }}>{t('operations.description')}</label>}
          rules={[{ max: 256, message: 'Максимальное количество символов: 256' }]}
        >
          {mode === 'edit' ? (
            <TextArea
              value={opState.desc}
              name={'desc'}
              onChange={handleInputChange}
              autoSize
              maxLength={256}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content, marginTop: 5, marginBottom: 5 }}>
              {opState.desc}
            </Typography>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            disabled={mode !== 'edit'}
            variant={'filled'}
            color="primary"
            htmlType="submit"
            style={{
              ...styles.button,
              color: mode !== 'edit' ? palette.fontColorDisabled : '#fff',
              backgroundColor: mode !== 'edit' ? palette.foreground : palette.success,
              borderColor: palette.borderColor,
            }}
            icon={<CheckCircleOutlined />}
          >
            {t('save')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}