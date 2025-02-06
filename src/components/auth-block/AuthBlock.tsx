import { Button, Card, Form, type FormProps, Input, Typography } from 'antd';
import React, { CSSProperties, useContext, useMemo, useState } from 'react';
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

  const onFinish: FormProps<FormFieldsType>['onFinish'] = async (values) => {
    console.log('Submit success:', values);

    switch (mode) {
      case 'signin':
        try {
          await dispatch(signin(values)).unwrap();
          messageApi.success(t('auth.msgSigninSuccess'));
          navigate('/operations');
        } catch (err) {
          setError((prevState) => ({ ...prevState, signin: true }));
          messageApi.error(t(`error.${err}`));
        }
        break;
      case 'signup':
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

  const styles: { [key: string]: CSSProperties } = useMemo(() => {
    return {
      card: { width: '100%', maxWidth: 616, marginBottom: 8, backgroundColor: palette.background },
      cardText: { flex: 'none', color: palette.fontColor },
      textField: { color: palette.fontColor, backgroundColor: palette.background },
      size: { maxWidth: 614, minWidth: 377 },
      font: { color: palette.fontColor },
      typo: { color: palette.fontColor, textAlign: 'left' },
      labelPadding: { paddingBottom: 6 },
      typoPadding: { paddingBottom: 12 },
      button: { marginTop: 16 },
    };
  }, [palette.fontColor, palette.background]);

  return (
    <Card
      title={mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
      extra={
        <Button color="primary" variant="link" onClick={handleToggleMode}>
          {mode === 'signin' ? t('auth.signUp') : t('auth.signIn')}
        </Button>
      }
      style={styles.card}
      styles={{ title: styles.cardText }}
    >
      <Typography style={{ ...styles.typo, ...styles.labelPadding }}>{'Добавленные профили:'}</Typography>
      <Typography style={styles.typo}>{'admin178@gmail.com 123qweasd'}</Typography>
      <Typography style={{ ...styles.typo, ...styles.typoPadding }}>{'admin178_1@gmail.com 123qweasd'}</Typography>
      <Form
        form={form}
        layout="vertical"
        style={styles.size}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FormFieldsType>
          label={<label style={styles.font}>{t('auth.email')}</label>}
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
            style={styles.textField}
            onFocus={() => {
              if (error.signin || error.signup)
                setError((prevState) => ({ ...prevState, signin: false, signup: false }));
            }}
          />
        </Form.Item>
        <Form.Item<FormFieldsType>
          label={<label style={styles.font}>{t('auth.password')}</label>}
          name="password"
          validateStatus={error.signin || error.signup || error.password ? 'error' : null}
          hasFeedback
          rules={[
            { min: 8, message: t('auth.msgPasswordMinLength') },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input.Password
            style={styles.textField}
            onFocus={() => {
              if (error.signin || error.signup || error.password)
                setError((prevState) => ({ ...prevState, signin: false, signup: false, password: false }));
            }}
          />
        </Form.Item>
        {mode === 'signup' ? (
          <Form.Item<FormFieldsType>
            label={<label style={styles.font}>{t('profile.newPasswordCheck')}</label>}
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
              style={styles.textField}
              onFocus={() => {
                if (error.signin || error.signup || error.password)
                  setError((prevState) => ({ ...prevState, signin: false, signup: false, password: false }));
              }}
            />
          </Form.Item>
        ) : null}
        <Form.Item label={null} style={styles.button}>
          <Button block type="primary" htmlType="submit">
            {mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
