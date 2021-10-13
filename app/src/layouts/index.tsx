import '@/layouts/index.less';
import { FC } from 'react';
import { Layout } from 'antd';

const AppLayout: FC<any> = ({ children }) => {
  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default AppLayout;
