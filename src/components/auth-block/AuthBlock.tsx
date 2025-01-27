import { Button, Card, Form, type FormProps, Input, message, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generateToken } from 'src/store/slices/token';
import users from 'src/shared/mock/users';
import { ProfileType, setProfile } from 'src/store/slices/profile';
import { useNavigate } from 'react-router';

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
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthBlockModeEnum>(AuthBlockModeEnum.SignIn);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FormFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    dispatch(generateToken(values.email));

    const profile = users.find((u) => u.email === values.email);
    let newProfile: ProfileType;

    switch (mode) {
      case 'signin':
        newProfile = { ...profile, ...values };
        dispatch(setProfile(newProfile));
        navigate('/operations');
        break;
      case 'signup':
        if (!profile) {
          newProfile = {
            email: values.email,
            password: values.password,
            nickname: null,
            about: null,
            role: 0,
          };
          users.push(newProfile);
          dispatch(setProfile(newProfile));
          navigate('/profile');
        } else {
          messageApi.error(t('auth.msgEmailExists'));
        }
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
      <Typography style={{ color: palette.fontColor }}>{'admin@gmail.com 123qweasd (Админ)'}</Typography>
      <Typography style={{ color: palette.fontColor }}>{'user@gmail.com 123qweasd (Пользователь)'}</Typography>
      {contextHolder}
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
          hasFeedback
          rules={[
            {
              type: 'email',
              message: t('auth.msgWrongEmailFormat'),
            },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input style={{ color: palette.fontColor, backgroundColor: palette.background }} />
        </Form.Item>
        <Form.Item<FormFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('auth.password')}</label>}
          name="password"
          hasFeedback
          rules={[
            { min: 8, message: t('auth.msgPasswordMinLength') },
            { required: true, message: t('auth.msgRequiredField') },
          ]}
        >
          <Input.Password style={{ color: palette.fontColor, backgroundColor: palette.background }} />
        </Form.Item>
        {mode === 'signup' ? (
          <Form.Item<FormFieldsType>
            label={<label style={{ color: palette.fontColor }}>{t('profile.newPasswordCheck')}</label>}
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
            <Input.Password style={{ color: palette.fontColor, backgroundColor: palette.background }} />
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
