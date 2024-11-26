import { Button, Card, Form, type FormProps, Input } from 'antd';
import React from 'react';

type ProfileFieldsType = {
  nickname: string;
  about: string;
};

type PasswordFieldsType = {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
};

export default function Profile() {
  const [profileForm] = Form.useForm();
  const [pwdChangeForm] = Form.useForm();

  const onFinish: FormProps<ProfileFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    profileForm.resetFields();
  };

  const onFinishFailed: FormProps<ProfileFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const onPwdChange: FormProps<PasswordFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    pwdChangeForm.resetFields();
  };

  const onPwdChangeFailed: FormProps<PasswordFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  return (
    <Card
      title={'Profile'}
      style={{ width: '100%', maxWidth: 616, marginBottom: 8 }}
      styles={{ title: { flex: 'none' } }}
    >
      <Form
        form={profileForm}
        layout="vertical"
        style={{ maxWidth: 614, minWidth: 377 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ProfileFieldsType>
          label="Псевдоним"
          name="nickname"
          rules={[
            { max: 32, message: 'Длина не должна превышать 32 символов' },
            { required: true, message: 'Поле не должно быть пустым' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<ProfileFieldsType>
          label="О себе"
          name="about"
          rules={[
            { max: 256, message: 'Длина не должна превышать 256 символов' },
            { required: true, message: 'Поле не должно быть пустым' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {'Сохранить'}
          </Button>
        </Form.Item>
      </Form>
      <Form
        form={pwdChangeForm}
        layout="vertical"
        style={{ maxWidth: 614, minWidth: 377 }}
        onFinish={onPwdChange}
        onFinishFailed={onPwdChangeFailed}
        autoComplete="off"
      >
        <Form.Item<PasswordFieldsType>
          label="Пароль"
          name="password"
          rules={[
            { min: 8, message: 'Минимальная длина пароля 8 символов' },
            { max: 56, message: 'Длина не должна превышать 56 символов' },
            { required: true, message: 'Поле не должно быть пустым' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<PasswordFieldsType>
          label="Новый пароль"
          name="newPassword"
          dependencies={['password']}
          rules={[
            { min: 8, message: 'Минимальная длина пароля 8 символов' },
            { max: 56, message: 'Длина не должна превышать 56 символов' },
            { required: true, message: 'Поле не должно быть пустым' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value !== getFieldValue('password')) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Новый пароль должен отличаться от текущего'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<PasswordFieldsType>
          label="Повторите пароль"
          name="newPasswordCheck"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Поле не должно быть пустым' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((!value && !getFieldValue('newPassword')) || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {'Изменить пароль'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
