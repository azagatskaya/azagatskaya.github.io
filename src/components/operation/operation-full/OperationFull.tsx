import React, { ReactNode, useContext, useState } from 'react';
import { Category, Operation } from '../../../homeworks/ts1/3_write';
import { RenameTypeField } from '../../operation/lib/renameTypeField';
import { Button, Card, DatePicker, Form, Input, Typography } from 'antd';
import type { FormProps } from 'antd';
import ThemeContext from '../../../contexts/ThemeContext';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input;

type FieldType = {
  createdAt?: string;
  amount?: number;
  categoryName?: string;
  name?: string;
  desc?: string;
};

const onFinish: FormProps<OperationFullProps>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<OperationFullProps>['onFinishFailed'] = (errorInfo) => {
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

export default function OperationFull({ amount, categoryName, name, desc, createdAt }: OperationFullProps): ReactNode {
  const { palette } = useContext(ThemeContext);
  const [mode, setMode] = useState<ModeType>('preview');
  const { t } = useTranslation();

  const handleToggleMode = (): void => {
    setMode((prevState: ModeType) => (prevState === 'edit' ? 'preview' : 'edit'));
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
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          required
          label={<label style={{ color: palette.fontColor }}>{t('operations.createdAt')}</label>}
          rules={[{ required: true }]}
        >
          {mode === 'edit' ? (
            <DatePicker
              style={{
                ...styles.date,
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
              value={dayjs(createdAt)}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{createdAt}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          label={<label style={{ color: palette.fontColor }}>{t('operations.operationName')}</label>}
          rules={[{ required: true }]}
        >
          {mode === 'edit' ? (
            <Input
              value={name}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{name}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          label={<label style={{ color: palette.fontColor }}>{t('operations.amount')}</label>}
          rules={[{ required: true }]}
        >
          {mode === 'edit' ? (
            <Input
              value={amount}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{amount}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType>
          required
          label={<label style={{ color: palette.fontColor }}>{t('operations.categoryName')}</label>}
          rules={[{ required: true }]}
        >
          {mode === 'edit' ? (
            <Input
              value={categoryName}
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>{categoryName}</Typography>
          )}
        </Form.Item>
        <Form.Item<FieldType> label={<label style={{ color: palette.fontColor }}>{t('operations.description')}</label>}>
          {mode === 'edit' ? (
            <TextArea
              value={desc}
              autoSize
              style={{
                color: palette.fontColor,
                backgroundColor: palette.background,
                borderColor: palette.borderColor,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content, marginTop: 5, marginBottom: 5 }}>
              {desc}
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
