import { Button, Card, Form, type FormProps, Input, message } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { setProfile } from 'src/store/slices/profile';

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
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const profile = useSelector((state: AppState) => state.profile);
  const dispatch = useDispatch();
  const [profileForm] = Form.useForm();
  const [pwdChangeForm] = Form.useForm();
  const [error, setError] = useState({ password: false });
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<ProfileFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    dispatch(setProfile({ ...profile, ...values }));
    messageApi.success(t('profile.msgProfileUpdateSuccess'));
  };

  const onFinishFailed: FormProps<ProfileFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const onPwdChange: FormProps<PasswordFieldsType>['onFinish'] = (values) => {
    console.log('Submit success:', values);
    if (values.password === profile.password) {
      dispatch(setProfile({ ...profile, password: values.newPassword }));
      messageApi.success(t('profile.msgProfileUpdateSuccess'));
      pwdChangeForm.resetFields();
    } else {
      setError((prevState) => ({ ...prevState, password: true }));
    }
  };

  const onPwdChangeFailed: FormProps<PasswordFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Submit fail:', errorInfo);
  };

  const styles = useMemo(() => {
    return {
      textField: { color: palette.fontColor, backgroundColor: palette.background },
    };
  }, [palette.fontColor, palette.background]);

  return (
    <Card
      title={t('profile.formTitle')}
      style={{
        width: '100%',
        maxWidth: 616,
        marginBottom: 8,
        backgroundColor: palette.background,
      }}
      styles={{ title: { flex: 'none', color: palette.fontColor } }}
    >
      <Form
        form={profileForm}
        layout="vertical"
        style={{ maxWidth: 614, minWidth: 377, color: palette.fontColor }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ProfileFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('profile.nickname')}</label>}
          name="nickname"
          initialValue={profile ? profile.nickname : null}
          rules={[
            { max: 32, message: t('profile.msgNicknameMaxLength') },
            { required: true, message: t('profile.msgRequiredField') },
          ]}
        >
          <Input style={styles.textField} />
        </Form.Item>
        <Form.Item<ProfileFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('profile.about')}</label>}
          name="about"
          initialValue={profile ? profile.about : null}
          rules={[
            { max: 256, message: t('profile.msgAboutMaxLength') },
            { required: true, message: t('profile.msgRequiredField') },
          ]}
        >
          <Input style={styles.textField} />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {t('save')}
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
      <Form
        form={pwdChangeForm}
        layout="vertical"
        style={{ maxWidth: 614, minWidth: 377 }}
        onFinish={onPwdChange}
        onFinishFailed={onPwdChangeFailed}
        autoComplete="off"
      >
        <Form.Item<PasswordFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('profile.password')}</label>}
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
          label={<label style={{ color: palette.fontColor }}>{t('profile.newPassword')}</label>}
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
          <Input.Password style={styles.textField} />
        </Form.Item>
        <Form.Item<PasswordFieldsType>
          label={<label style={{ color: palette.fontColor }}>{t('profile.newPasswordCheck')}</label>}
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
          <Input.Password style={styles.textField} />
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 16 }}>
          <Button block type="primary" htmlType="submit">
            {t('profile.changePassword')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
