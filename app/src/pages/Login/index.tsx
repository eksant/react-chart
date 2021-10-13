import { FC, useState } from 'react';
import { useAuth } from '@/contexts';
import { Alert, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { CustomForm, CustomFormItem, CustomPage } from '@/components';

const LoginPage: FC<any> = () => {
  const { onLogin } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const onFinish = async (value: any) => {
    setLoading(true);
    setMessage(undefined);

    const response = await onLogin({
      email: value.email,
      password: value.password,
    });

    if (response.error) {
      setMessage(response.error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <CustomPage title="Login">
      <CustomForm
        name="login"
        layout="vertical"
        onFinish={onFinish}
        actions={[
          <Button
            key="submit"
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: '100%' }}
          >
            Login
          </Button>,
        ]}
      >
        <CustomFormItem
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Complete_this_field' }]}
        >
          <Input placeholder="admin@email.com" prefix={<UserOutlined />} />
        </CustomFormItem>
        <CustomFormItem
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Complete_this_field' }]}
        >
          <Input.Password
            type="password"
            placeholder="P@ssw0rd"
            prefix={<LockOutlined />}
          />
        </CustomFormItem>

        {message && <Alert closable message={message} type="error" />}
      </CustomForm>
    </CustomPage>
  );
};

export default LoginPage;
