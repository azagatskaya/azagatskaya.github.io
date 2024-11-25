import { Button, Card, Form, type FormProps, Input } from 'antd';
import React, { useState } from 'react';

type FormFieldsType = {
  email: string;
  password: string;
};

enum AuthBlockModeEnum {
  SignIn = 'signin',
  SignUp = 'signup',
}

export default function AuthBlock() {
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
      title={mode === 'signin' ? 'Sign In' : 'Sign Up'}
      extra={
        <Button color="primary" variant="link" onClick={handleToggleMode}>
          {mode === 'signin' ? 'Sign Up' : 'Sign In'}
        </Button>
      }
      style={{ width: '100%', maxWidth: 616, marginBottom: 8 }}
      styles={{ title: { flex: 'none' } }}
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
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Некорректный email',
            },
            { required: true, message: 'Поле не должно быть пустым' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormFieldsType>
          label="Password"
          name="password"
          rules={[
            { min: 8, message: 'Длина пароля должна быть не менее 8 символов' },
            { required: true, message: 'Поле не должно быть пустым' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
