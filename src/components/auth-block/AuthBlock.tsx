import { Button, Card, Form, type FormProps, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

type FormFieldsType = {
  email: string;
  password: string;
};

enum AuthBlockModeEnum {
  SignIn = 'signin',
  SignUp = 'signup',
}

export default function AuthBlock() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthBlockModeEnum>(AuthBlockModeEnum.SignIn);
  const [form] = Form.useForm();

  const onFinish: FormProps<FormFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    form.resetFields();
  };

  const onFinishFailed: FormProps<FormFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const handleToggleMode = () => {
    setMode((prevState) =>
      prevState === AuthBlockModeEnum.SignIn ? AuthBlockModeEnum.SignUp : AuthBlockModeEnum.SignIn
    );
  };

  return (
    <Card
      title={mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
      extra={
        <Button color="primary" variant="link" onClick={handleToggleMode}>
          {mode === 'signin' ? t('auth.signUp') : t('auth.signIn')}
        </Button>
      }
      style={{ width: '100%', maxWidth: 616, marginBottom: 8, backgroundColor: palette.background }}
      styles={{ title: { flex: 'none', color: palette.fontColor } }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 614, minWidth: 377 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FormFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('auth.email')}</label>}
          name="email"
          rules={[
            {
              type: 'email',
              message: t('auth.msgWrongEmailFormat'),
            },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          s
          <Input style={{ color: palette.fontColor, backgroundColor: palette.background }} />
        </Form.Item>
        <Form.Item<FormFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('auth.password')}</label>}
          name="password"
          rules={[
            { min: 8, message: t('auth.msgPasswordMinLength') },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input.Password style={{ color: palette.fontColor, backgroundColor: palette.background }} />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
