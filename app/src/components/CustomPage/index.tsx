import '@/components/CustomPage/index.less';
import { FC } from 'react';
import { PageHeader, Typography } from 'antd';

const CustomPage: FC<any> = (props: any) => {
  const { title, style, children } = props;

  return (
    <PageHeader
      {...props}
      ghost={false}
      style={style}
      className="custom-page"
      title={<Typography.Title>{title}</Typography.Title>}
    >
      {children}
    </PageHeader>
  );
};

export default CustomPage;
