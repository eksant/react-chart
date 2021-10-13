import '@/pages/Chart/index.less';
import { FC, useState } from 'react';
import { CustomForm, CustomFormItem } from '@/components';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  DatePicker,
  Typography,
} from 'antd';

const ChartSideLayout: FC<any> = (props: any) => {
  const { loading, onFilter } = props;
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout.Sider
      collapsible
      width={300}
      trigger={null}
      collapsed={collapsed}
      style={{ background: '#fff' }}
    >
      <Row style={{ height: '64px' }} align="middle" justify="end">
        <Col>
          <Button
            type="text"
            onClick={onCollapsed}
            style={{ marginRight: 12 }}
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: '24px' }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: '24px' }} />
              )
            }
          />
        </Col>
      </Row>

      {collapsed ? (
        <Typography.Title className="rotate">Filter</Typography.Title>
      ) : (
        <CustomForm
          form={form}
          name="filter"
          layout="vertical"
          onFinish={onFilter}
          actions={[
            <Button
              key="submit"
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '85%' }}
            >
              Filter
            </Button>,
            <Button
              key="reset"
              size="large"
              type="default"
              onClick={onReset}
              disabled={loading}
              style={{ width: '85%' }}
            >
              Reset
            </Button>,
          ]}
        >
          <CustomFormItem
            name="name"
            label="Name"
            rules={[{ required: false, message: 'Complete_this_field' }]}
          >
            <Input placeholder="Name" />
          </CustomFormItem>
          <CustomFormItem
            name="period"
            label="Period"
            rules={[{ required: false, message: 'Complete_this_field' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </CustomFormItem>
        </CustomForm>
      )}
    </Layout.Sider>
  );
};

export default ChartSideLayout;
