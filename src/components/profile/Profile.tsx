import { Button, Card, Form, type FormProps, Input, Typography } from 'antd';
import React, { CSSProperties, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'src/store';
import { clearAuth, updatePassword, updateProfile } from 'src/store/slices/auth';
import { getTokenFromLocalStorage } from 'src/shared/token';
import { UpdateProfileBody } from 'src/shared/serverTypes';

type PasswordFieldsType = {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
};

export default function Profile() {
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const profile = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [profileForm] = Form.useForm();
  const [pwdChangeForm] = Form.useForm();
  const [error, setError] = useState({ password: false, update: false });

  const onFinish: FormProps<UpdateProfileBody>['onFinish'] = async (values) => {
    console.log('Submit success:', values);
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        await dispatch(updateProfile({ token, ...values })).unwrap();
        messageApi.success(t('profile.msgProfileUpdateSuccess'));
      } else dispatch(clearAuth());
    } catch (err) {
      setError((prevState) => ({ ...prevState, update: true }));
      messageApi.error(t(`error.${err}`));
    }
  };

  const onFinishFailed: FormProps<UpdateProfileBody>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const onPwdChange: FormProps<PasswordFieldsType>['onFinish'] = async (values) => {
    console.log('Submit success:', values);
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        await dispatch(
          updatePassword({ token, body: { password: values.password, newPassword: values.newPassword } })
        ).unwrap();
        messageApi.success(t('profile.msgPasswordChangeSuccess'));
        pwdChangeForm.resetFields();
      } else dispatch(clearAuth());
    } catch (err) {
      setError((prevState) => ({ ...prevState, password: true }));
      messageApi.error(t(`error.${err}`));
    }
  };

  const onPwdChangeFailed: FormProps<PasswordFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const styles: { [key: string]: CSSProperties } = useMemo(() => {
    return {
      card: {
        width: '100%',
        maxWidth: 616,
        marginBottom: 8,
        backgroundColor: palette.background,
      },
      cardText: { flex: 'none', color: palette.fontColor },
      textField: { color: palette.fontColor, backgroundColor: palette.background },
      size: { maxWidth: 614, minWidth: 377 },
      font: { color: palette.fontColor },
      typo: { color: palette.fontColor, fontWeight: 600, textAlign: 'left', paddingBottom: 12 },
      label: { color: palette.fontColor },
      button: { marginTop: 16 },
    };
  }, [palette.fontColor, palette.background]);

  return (
    <Card title={t('profile.formTitle')} style={styles.card} styles={{ title: styles.cardText }}>
      <Form
        form={profileForm}
        layout="vertical"
        style={{ ...styles.size, ...styles.font }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography style={styles.typo}>{`Email: ${profile.email}`}</Typography>
        <Form.Item<UpdateProfileBody>
          label={<label style={styles.label}>{t('profile.nickname')}</label>}
          validateStatus={error.update ? 'error' : null}
          name="name"
          initialValue={profile ? profile.name : null}
          rules={[{ pattern: /^\S{7,32}$/g, message: t('profile.msgNicknameReqex') }]}
        >
          <Input
            style={styles.textField}
            onFocus={() => {
              if (error.update) setError((prevState) => ({ ...prevState, update: false }));
            }}
          />
        </Form.Item>
        <Form.Item label={null} style={styles.button}>
          <Button block type="primary" htmlType="submit">
            {t('save')}
          </Button>
        </Form.Item>
      </Form>
      <Form
        form={pwdChangeForm}
        layout="vertical"
        style={styles.size}
        onFinish={onPwdChange}
        onFinishFailed={onPwdChangeFailed}
        autoComplete="off"
      >
        <Form.Item<PasswordFieldsType>
          label={<label style={styles.font}>{t('profile.password')}</label>}
          name="password"
          validateStatus={error.password ? 'error' : null}
          hasFeedback
          help={error.password ? t('profile.msgWrongPassword') : null}
          rules={[
            { min: 8, message: t('profile.msgPasswordMinLength') },
            { max: 56, message: t('profile.msgPasswordMaxLength') },
            { required: true, message: t('profile.msgRequiredField') },
          ]}
        >
          <Input.Password
            style={styles.textField}
            onFocus={() => {
              if (error.password) setError((prevState) => ({ ...prevState, password: false }));
            }}
          />
        </Form.Item>
        <Form.Item<PasswordFieldsType>
          label={<label style={styles.font}>{t('profile.newPassword')}</label>}
          name="newPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { min: 8, message: t('profile.msgPasswordMinLength') },
            { max: 56, message: t('profile.msgPasswordMaxLength') },
            { required: true, message: t('profile.msgRequiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value !== getFieldValue('password')) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('profile.msgSameNewPassword')));
              },
            }),
          ]}
        >
          <Input.Password
            style={styles.textField}
            onFocus={() => {
              if (error.password) setError((prevState) => ({ ...prevState, password: false }));
            }}
          />
        </Form.Item>
        <Form.Item<PasswordFieldsType>
          label={<label style={styles.font}>{t('profile.newPasswordCheck')}</label>}
          name="newPasswordCheck"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: t('profile.msgRequiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((!value && !getFieldValue('newPassword')) || getFieldValue('newPassword') === value) {
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
              if (error.password) setError((prevState) => ({ ...prevState, password: false }));
            }}
          />
        </Form.Item>
        <Form.Item label={null} style={styles.button}>
          <Button block type="primary" htmlType="submit">
            {t('profile.changePassword')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
