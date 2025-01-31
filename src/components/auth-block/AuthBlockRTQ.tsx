import { Button, Card, Form, type FormProps, Input, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'src/store';
import { setAuth } from 'src/store/slices/auth';
import { authApi } from 'src/services/authentication';
import { ServerErrors, SignInBody } from 'src/shared/serverTypes';

type FormFieldsType = {
  email: string;
  password: string;
  passwordCheck?: string;
};

enum AuthBlockModeEnum {
  SignIn = 'signin',
  SignUp = 'signup',
}

export default function AuthBlockRTQ() {
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthBlockModeEnum>(AuthBlockModeEnum.SignIn);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState({ signin: false, signup: false, password: false });
  const [skipSignIn, setSkipSignin] = useState(true);
  const [skipSignUp, setSkipSignUp] = useState(true);
  const [signInBody, setSignInBody] = useState<SignInBody>({ email: '', password: '' });
  const [signUpBody, setSignUpBody] = useState<SignInBody>({ email: '', password: '' });

  const {
    data: signInData,
    isLoading: signInLoading,
    error: signInError,
  } = authApi.endpoints.signIn.useQuery(signInBody, {
    skip: skipSignIn,
  });
  const {
    data: signUpData,
    isLoading: signUpLoading,
    error: signUpError,
  } = authApi.endpoints.signUp.useQuery(signUpBody, {
    skip: skipSignUp,
  });

  useEffect(() => {
    console.log('UEF signInData', signInData);
    if (signInData) {
      dispatch(setAuth(signInData.profile));
      messageApi.success(t('auth.msgSigninSuccess'));
      setSkipSignin(true);
      navigate('/operations');
    }
  }, [signInData, dispatch, messageApi, navigate, t]);

  useEffect(() => {
    if (signInError) {
      console.log('signInError', signInError);
      setError((prevState) => ({ ...prevState, signin: true }));
      if ('status' in signInError) {
        const eData = signInError.data as ServerErrors;
        messageApi.error(t(`error.${eData.errors[0].extensions.code}`));
      }
    }
  }, [messageApi, signInError, t]);

  useEffect(() => {
    if (signUpData) {
      dispatch(setAuth(signUpData.profile));
      messageApi.success(t('auth.msgSignupSuccess'));
      setSkipSignUp(true);
      navigate('/profile');
    }
  }, [signUpData, dispatch, messageApi, navigate, t]);

  useEffect(() => {
    if (signUpError) {
      if ('status' in signUpError) {
        const eData = signUpError.data as ServerErrors;
        const error = eData.errors[0].extensions.code;
        setError((prevState) =>
          error === 'ERR_INVALID_PASSWORD' ? { ...prevState, password: true } : { ...prevState, signup: true }
        );
        messageApi.error(t(`error.${error}`));
      }
    }
  }, [messageApi, signUpError, t]);

  const onFinish: FormProps<FormFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    switch (mode) {
      case 'signin':
        setSignInBody(values);
        setSkipSignin(false);
        break;
      case 'signup':
        setSignUpBody(values);
        setSkipSignUp(false);
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
          required
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
          required
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
            required
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
