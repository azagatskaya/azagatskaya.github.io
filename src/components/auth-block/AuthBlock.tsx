import { Button, Card, Form, type FormProps, Input, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'src/store';
import { signin, signup } from 'src/store/slices/auth';

type FormFieldsType = {
  email: string;
  password: string;
  passwordCheck?: string;
};

enum AuthBlockModeEnum {
  SignIn = 'signin',
  SignUp = 'signup',
}

export default function AuthBlock() {
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthBlockModeEnum>(AuthBlockModeEnum.SignIn);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState({ signin: false, signup: false, password: false });

  const onFinish: FormProps<FormFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);

    switch (mode) {
      case 'signin':
        (async () => {
          try {
            await dispatch(signin(values)).unwrap();
            messageApi.success(t('auth.msgSigninSuccess'));
            navigate('/operations');
          } catch (err) {
            setError((prevState) => ({ ...prevState, signin: true }));
            messageApi.error(t(`error.${err}`));
          }
        })();
        break;
      case 'signup':
        (async () => {
          try {
            await dispatch(signup(values)).unwrap();
            messageApi.success(t('auth.msgSignupSuccess'));
            navigate('/profile');
          } catch (err) {
            setError((prevState) =>
              err === 'ERR_INVALID_PASSWORD' ? { ...prevState, password: true } : { ...prevState, signup: true }
            );
            messageApi.error(t(`error.${err}`));
          }
        })();
        break;
    }
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
      <Typography style={{ color: palette.fontColor }}>{'Добавленные профили:'}</Typography>
      <Typography style={{ color: palette.fontColor }}>{'admin178@gmail.com 123qweasd'}</Typography>
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
          validateStatus={error.signin || error.signup ? 'error' : null}
          hasFeedback
          rules={[
            {
              type: 'email',
              message: t('auth.msgWrongEmailFormat'),
            },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input
            style={{ color: palette.fontColor, backgroundColor: palette.background }}
            onFocus={() => {
              if (error.signin || error.signup)
                setError((prevState) => ({ ...prevState, signin: false, signup: false }));
            }}
          />
        </Form.Item>
        <Form.Item<FormFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('auth.password')}</label>}
          name="password"
          validateStatus={error.signin || error.signup || error.password ? 'error' : null}
          hasFeedback
          rules={[
            { min: 8, message: t('auth.msgPasswordMinLength') },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input.Password
            style={{ color: palette.fontColor, backgroundColor: palette.background }}
            onFocus={() => {
              if (error.signin || error.signup || error.password)
                setError((prevState) => ({ ...prevState, signin: false, signup: false, password: false }));
            }}
          />
        </Form.Item>
        {mode === 'signup' ? (
          <Form.Item<FormFieldsType>
            label={<label style={{ color: palette.fontColor }}>{t('profile.newPasswordCheck')}</label>}
            validateStatus={error.signin || error.signup || error.password ? 'error' : null}
            name="passwordCheck"
            dependencies={['password']}
            hasFeedback
            rules={[
              { min: 8, message: t('profile.msgPasswordMinLength') },
              { max: 56, message: t('profile.msgPasswordMaxLength') },
              { required: true, message: t('profile.msgRequiredField') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if ((!value && !getFieldValue('password')) || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('profile.msgPasswordsNotMatched')));
                },
              }),
            ]}
          >
            <Input.Password
              style={{ color: palette.fontColor, backgroundColor: palette.background }}
              onFocus={() => {
                if (error.signin || error.signup || error.password)
                  setError((prevState) => ({ ...prevState, signin: false, signup: false, password: false }));
              }}
            />
          </Form.Item>
        ) : null}
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
