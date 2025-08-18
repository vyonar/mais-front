// src/pages/User/Login/index.tsx
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {
  FormattedMessage,
  Helmet,
  useIntl,
  useModel,
  history,
} from '@umijs/max';
import { App } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import { login } from '@/services/mais/auth';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { message } = App.useApp();
  const intl = useIntl();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });

      // Token'ı sakla
      localStorage.setItem('token', res.token);

      // (Opsiyonel) Layout için hızlıca currentUser doldur
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: {
            name: `${res.name} ${res.surname}`,
            email: res.email,
            role: res.role,
          },
        }));
      });

      message.success(
        intl.formatMessage({ id: 'pages.login.success', defaultMessage: 'Giriş başarılı!' }),
      );

      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'pages.login.failure', defaultMessage: 'Giriş başarısız, tekrar deneyin!' }),
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Helmet>
        <title>
          {intl.formatMessage({ id: 'menu.login', defaultMessage: 'Giriş' })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <div style={{ flex: 1, padding: '32px 0' }}>
        <LoginForm
          contentStyle={{ minWidth: 280, maxWidth: 400 }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title', defaultMessage: 'Hoş geldiniz' })}
          initialValues={{}}
          onFinish={async (values) => handleSubmit(values as any)}
        >
          <ProFormText
            name="email"
            fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
            placeholder={intl.formatMessage({ id: 'pages.login.username.placeholder', defaultMessage: 'E-posta' })}
            rules={[
              { required: true, message: <FormattedMessage id="pages.login.username.required" defaultMessage="Lütfen e-posta girin!" /> },
              { type: 'email' as const, message: 'Geçerli bir e-posta girin' },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            placeholder={intl.formatMessage({ id: 'pages.login.password.placeholder', defaultMessage: 'Şifre' })}
            rules={[
              { required: true, message: <FormattedMessage id="pages.login.password.required" defaultMessage="Lütfen şifre girin!" /> },
            ]}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
